package com.ecommerce.marketplace.coupon.dto;

import com.ecommerce.marketplace.coupon.entity.CouponFundedBy;
import com.ecommerce.marketplace.coupon.entity.CouponScope;
import com.ecommerce.marketplace.coupon.entity.CouponType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CouponRequest {

    @NotBlank(message = "Coupon code is required")
    @Pattern(regexp = "^[A-Z0-9_-]{3,30}$", message = "Coupon code must be 3-30 uppercase alphanumeric characters")
    private String code;

    @NotNull(message = "Coupon scope is required (PLATFORM or SELLER)")
    private CouponScope scope;

    private UUID sellerId;

    @NotNull(message = "Coupon type is required (PERCENT, FLAT, FREE_SHIPPING)")
    private CouponType type;

    @NotNull(message = "Value is required")
    @DecimalMin(value = "0.01", message = "Value must be greater than 0")
    private BigDecimal value;

    private BigDecimal maxDiscount;

    private BigDecimal minOrderValue;

    @NotNull(message = "Valid from date is required")
    private Instant validFrom;

    @NotNull(message = "Valid to date is required")
    private Instant validTo;

    private Integer usageLimit;

    private Integer perUserLimit;

    @NotNull(message = "Funded by is required (PLATFORM or SELLER)")
    private CouponFundedBy fundedBy;

    private Boolean active;
}
