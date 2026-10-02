package com.ecommerce.marketplace.catalog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryUpdateResponseDto {
    private CategoryDto category;
    private long affectedProductsCount;
}
