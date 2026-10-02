package com.ecommerce.marketplace.inventory;

import com.ecommerce.marketplace.common.events.LowStockDetectedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.inventory.entity.StockMovement;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.inventory.repository.StockMovementRepository;
import com.ecommerce.marketplace.inventory.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;
    @Mock
    private StockMovementRepository stockMovementRepository;
    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private InventoryService inventoryService;

    private Inventory inventory;

    @BeforeEach
    void setUp() {
        inventory = Inventory.builder()
                .productId(UUID.randomUUID())
                .variantSku("SKU-1001")
                .sellerId(UUID.randomUUID())
                .qtyAvailable(10)
                .qtyReserved(0)
                .lowStockThreshold(3)
                .build();
        inventory.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should successfully reserve stock when sufficient quantity is available")
    void reserve_Success() {
        when(inventoryRepository.findByVariantSku("SKU-1001")).thenReturn(Optional.of(inventory));

        inventoryService.reserve("SKU-1001", 4, "ORDER-101");

        assertEquals(6, inventory.getQtyAvailable());
        assertEquals(4, inventory.getQtyReserved());
        verify(inventoryRepository).save(inventory);
        verify(stockMovementRepository).save(any(StockMovement.class));
    }

    @Test
    @DisplayName("Should throw INSUFFICIENT_STOCK when requested qty exceeds available stock")
    void reserve_InsufficientStock() {
        when(inventoryRepository.findByVariantSku("SKU-1001")).thenReturn(Optional.of(inventory));

        ApiException ex = assertThrows(ApiException.class, () -> inventoryService.reserve("SKU-1001", 15, "ORDER-101"));
        assertEquals(ErrorCode.INSUFFICIENT_STOCK, ex.getErrorCode());
    }

    @Test
    @DisplayName("Should trigger LowStockDetectedEvent when available stock falls below threshold")
    void reserve_TriggersLowStockEvent() {
        when(inventoryRepository.findByVariantSku("SKU-1001")).thenReturn(Optional.of(inventory));

        inventoryService.reserve("SKU-1001", 8, "ORDER-102");

        assertEquals(2, inventory.getQtyAvailable());
        verify(eventPublisher).publishEvent(any(LowStockDetectedEvent.class));
    }

    @Test
    @DisplayName("Should release reserved stock successfully")
    void release_Success() {
        inventory.setQtyAvailable(6);
        inventory.setQtyReserved(4);
        when(inventoryRepository.findByVariantSku("SKU-1001")).thenReturn(Optional.of(inventory));

        inventoryService.release("SKU-1001", 4, "ORDER-101");

        assertEquals(10, inventory.getQtyAvailable());
        assertEquals(0, inventory.getQtyReserved());
        verify(inventoryRepository).save(inventory);
    }
}
