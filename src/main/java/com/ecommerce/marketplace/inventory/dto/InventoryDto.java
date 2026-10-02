package com.ecommerce.marketplace.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {
    private UUID id;
    private UUID productId;
    private String variantSku;
    private UUID sellerId;
    private int qtyAvailable;
    private int qtyReserved;
    private int lowStockThreshold;
    private String warehouse;
    private Long version;
}
