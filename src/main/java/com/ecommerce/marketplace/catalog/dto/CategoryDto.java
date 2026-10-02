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
public class CategoryDto {
    private UUID id;
    private String name;
    private String slug;
    private UUID parentId;
    private String icon;
    private BigDecimal commissionPct;
    private Object attributeSchema;
    private boolean active;
    private List<CategoryDto> subcategories;
}
