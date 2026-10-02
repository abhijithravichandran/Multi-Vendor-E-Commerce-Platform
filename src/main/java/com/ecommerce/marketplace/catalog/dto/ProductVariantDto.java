package com.ecommerce.marketplace.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDto {
    private UUID id;
    private UUID productId;
    private String sku;
    private Object options;
    private BigDecimal mrp;
    private BigDecimal price;
    private List<String> images;
    private boolean active;
}
