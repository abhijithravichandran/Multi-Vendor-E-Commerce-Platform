package com.ecommerce.marketplace.catalog.dto;

import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private UUID id;
    private UUID sellerId;
    private String sellerStoreName;
    private UUID categoryId;
    private String categoryName;
    private UUID brandId;
    private String brandName;
    private String title;
    private String slug;
    private String description;
    private List<String> images;
    private Object attributes;
    private ProductStatus status;
    private String rejectionRemarks;
    private BigDecimal ratingAvg;
    private int ratingCount;
    private int soldCount;
    private Long version;
    private List<ProductVariantDto> variants;
    private Instant createdAt;
}
