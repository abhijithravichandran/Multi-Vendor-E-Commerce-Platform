package com.ecommerce.marketplace.wishlist.dto;

import com.ecommerce.marketplace.catalog.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDto {
    private UUID id;
    private UUID userId;
    private ProductDto product;
    private BigDecimal priceAtAdd;
    private Instant createdAt;
    private boolean priceDropped;
}
