package com.ecommerce.marketplace.inventory.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.inventory.dto.InventoryDto;
import com.ecommerce.marketplace.inventory.dto.StockAdjustmentRequest;
import com.ecommerce.marketplace.inventory.dto.StockMovementDto;
import com.ecommerce.marketplace.inventory.service.InventoryService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/seller/inventory")
@RequiredArgsConstructor
@Tag(name = "Seller Inventory", description = "Seller portal endpoints for managing stock levels and viewing stock movements")
public class InventorySellerController {

    private final InventoryService inventoryService;

    @GetMapping
    @Operation(summary = "Get seller inventory", description = "List inventory rows for currently logged in seller")
    public ResponseEntity<ApiResponse<List<InventoryDto>>> getSellerInventory(@CurrentUser UserPrincipal principal) {
        List<InventoryDto> inventory = inventoryService.getSellerInventory(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(inventory));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Adjust inventory stock", description = "Update stock level and record stock movement")
    public ResponseEntity<ApiResponse<InventoryDto>> adjustStock(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody StockAdjustmentRequest request) {
        InventoryDto inventory = inventoryService.adjustStock(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success(inventory, "Inventory adjusted successfully"));
    }

    @GetMapping("/{id}/movements")
    @Operation(summary = "Get stock movements", description = "Fetch audit trail of stock movements for an inventory item")
    public ResponseEntity<ApiResponse<List<StockMovementDto>>> getStockMovements(@PathVariable UUID id) {
        List<StockMovementDto> movements = inventoryService.getStockMovements(id);
        return ResponseEntity.ok(ApiResponse.success(movements));
    }
}
