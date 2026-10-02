package com.ecommerce.marketplace.inventory.service;

import com.ecommerce.marketplace.common.events.LowStockDetectedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.inventory.dto.InventoryDto;
import com.ecommerce.marketplace.inventory.dto.StockAdjustmentRequest;
import com.ecommerce.marketplace.inventory.dto.StockMovementDto;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.inventory.entity.StockMovement;
import com.ecommerce.marketplace.inventory.entity.StockMovementType;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.inventory.repository.StockMovementRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final StockMovementRepository stockMovementRepository;
    private final SellerRepository sellerRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public List<InventoryDto> getSellerInventory(UUID userId) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        return inventoryRepository.findBySellerId(seller.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public InventoryDto adjustStock(UUID userId, UUID inventoryId, StockAdjustmentRequest request) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ApiException(ErrorCode.INVENTORY_NOT_FOUND));

        if (!inventory.getSellerId().equals(seller.getId())) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this inventory item");
        }

        int delta = request.getQtyAvailable() - inventory.getQtyAvailable();
        inventory.setQtyAvailable(request.getQtyAvailable());
        if (request.getWarehouse() != null) {
            inventory.setWarehouse(request.getWarehouse());
        }
        if (request.getLowStockThreshold() != null) {
            inventory.setLowStockThreshold(request.getLowStockThreshold());
        }

        inventory = inventoryRepository.save(inventory);

        StockMovement movement = StockMovement.builder()
                .inventoryId(inventory.getId())
                .delta(delta)
                .reason(request.getReason())
                .type(StockMovementType.ADJUSTMENT)
                .actorId(userId)
                .build();
        stockMovementRepository.save(movement);

        checkAndPublishLowStockEvent(inventory);

        return mapToDto(inventory);
    }

    // --- REAL INVENTORY API SEAMS FOR PHASE 1 & PHASE 2 ---
    @Transactional
    public void reserve(String variantSku, int qty, String referenceId) {
        Inventory inventory = inventoryRepository.findByVariantSku(variantSku)
                .orElseThrow(() -> new ApiException(ErrorCode.INVENTORY_NOT_FOUND, "Inventory for SKU " + variantSku + " not found"));

        if (inventory.getQtyAvailable() < qty) {
            throw new ApiException(ErrorCode.INSUFFICIENT_STOCK, "Insufficient stock for SKU " + variantSku);
        }

        inventory.setQtyAvailable(inventory.getQtyAvailable() - qty);
        inventory.setQtyReserved(inventory.getQtyReserved() + qty);
        inventoryRepository.save(inventory);

        StockMovement movement = StockMovement.builder()
                .inventoryId(inventory.getId())
                .delta(-qty)
                .reason("Reservation for checkout/order " + referenceId)
                .type(StockMovementType.RESERVE)
                .referenceType("ORDER")
                .referenceId(referenceId)
                .build();
        stockMovementRepository.save(movement);

        checkAndPublishLowStockEvent(inventory);
    }

    @Transactional
    public void release(String variantSku, int qty, String referenceId) {
        Inventory inventory = inventoryRepository.findByVariantSku(variantSku)
                .orElseThrow(() -> new ApiException(ErrorCode.INVENTORY_NOT_FOUND, "Inventory for SKU " + variantSku + " not found"));

        inventory.setQtyAvailable(inventory.getQtyAvailable() + qty);
        inventory.setQtyReserved(Math.max(0, inventory.getQtyReserved() - qty));
        inventoryRepository.save(inventory);

        StockMovement movement = StockMovement.builder()
                .inventoryId(inventory.getId())
                .delta(qty)
                .reason("Reservation release for order " + referenceId)
                .type(StockMovementType.RELEASE)
                .referenceType("ORDER")
                .referenceId(referenceId)
                .build();
        stockMovementRepository.save(movement);
    }

    @Transactional
    public void commit(String variantSku, int qty, String referenceId) {
        Inventory inventory = inventoryRepository.findByVariantSku(variantSku)
                .orElseThrow(() -> new ApiException(ErrorCode.INVENTORY_NOT_FOUND, "Inventory for SKU " + variantSku + " not found"));

        inventory.setQtyReserved(Math.max(0, inventory.getQtyReserved() - qty));
        inventoryRepository.save(inventory);

        StockMovement movement = StockMovement.builder()
                .inventoryId(inventory.getId())
                .delta(0)
                .reason("Order commit for " + referenceId)
                .type(StockMovementType.COMMIT)
                .referenceType("ORDER")
                .referenceId(referenceId)
                .build();
        stockMovementRepository.save(movement);
    }

    @Transactional(readOnly = true)
    public List<StockMovementDto> getStockMovements(UUID inventoryId) {
        return stockMovementRepository.findByInventoryIdOrderByCreatedAtDesc(inventoryId).stream()
                .map(m -> StockMovementDto.builder()
                        .id(m.getId())
                        .inventoryId(m.getInventoryId())
                        .delta(m.getDelta())
                        .reason(m.getReason())
                        .type(m.getType())
                        .referenceType(m.getReferenceType())
                        .referenceId(m.getReferenceId())
                        .actorId(m.getActorId())
                        .createdAt(m.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    private void checkAndPublishLowStockEvent(Inventory inventory) {
        if (inventory.getQtyAvailable() <= inventory.getLowStockThreshold()) {
            eventPublisher.publishEvent(new LowStockDetectedEvent(
                    inventory.getId(),
                    inventory.getSellerId(),
                    inventory.getVariantSku(),
                    inventory.getQtyAvailable()
            ));
        }
    }

    private InventoryDto mapToDto(Inventory inv) {
        return InventoryDto.builder()
                .id(inv.getId())
                .productId(inv.getProductId())
                .variantSku(inv.getVariantSku())
                .sellerId(inv.getSellerId())
                .qtyAvailable(inv.getQtyAvailable())
                .qtyReserved(inv.getQtyReserved())
                .lowStockThreshold(inv.getLowStockThreshold())
                .warehouse(inv.getWarehouse())
                .version(inv.getVersion())
                .build();
    }
}
