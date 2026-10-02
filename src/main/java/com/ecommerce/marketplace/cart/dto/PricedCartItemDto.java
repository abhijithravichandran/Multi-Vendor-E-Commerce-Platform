package com.ecommerce.marketplace.cart.dto;

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
public class PricedCartItemDto {
    private UUID id;
    private UUID productId;
    private String productTitle;
    private String productSlug;
    private String variantSku;
    private Object variantOptions;
    private UUID sellerId;
    private String sellerStoreName;
    private int qty;
    private BigDecimal priceSnapshot;
    private BigDecimal currentPrice;
    private BigDecimal itemTotal;
    private boolean savedForLater;
    private boolean priceChanged;
    private List<String> validationMessages;
}

