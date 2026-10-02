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
public class SellerCartGroupDto {
    private UUID sellerId;
    private String sellerStoreName;
    private List<PricedCartItemDto> items;
    private BigDecimal subtotal;
    private BigDecimal shippingEstimate;
}
