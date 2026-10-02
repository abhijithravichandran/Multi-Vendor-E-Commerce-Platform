package com.ecommerce.marketplace.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PricedCartDto {
    private List<SellerCartGroupDto> sellerGroups;
    private List<PricedCartItemDto> savedForLaterItems;
    private BigDecimal cartSubtotal;
    private String couponCode;
    private BigDecimal couponDiscount;
    private BigDecimal tax;
    private BigDecimal shippingEstimate;
    private BigDecimal grandTotal;
}
