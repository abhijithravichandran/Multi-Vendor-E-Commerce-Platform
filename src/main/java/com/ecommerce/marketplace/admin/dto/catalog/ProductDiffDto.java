package com.ecommerce.marketplace.admin.dto.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDiffDto {
    private UUID productId;
    private Object currentSnapshot;
    private Object previousSnapshot;
}

