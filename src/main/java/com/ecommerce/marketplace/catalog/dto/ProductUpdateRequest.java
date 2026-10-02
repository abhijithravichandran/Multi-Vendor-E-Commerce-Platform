package com.ecommerce.marketplace.catalog.dto;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateRequest {

    private UUID categoryId;

    private UUID brandId;

    private String title;

    private String slug;

    private String description;

    private List<String> images;

    private Object attributes;

    @Valid
    private List<ProductVariantRequest> variants;
}
