package com.ecommerce.marketplace.coupon.dto;

import com.ecommerce.marketplace.coupon.entity.CouponFundedBy;
import com.ecommerce.marketplace.coupon.entity.CouponScope;
import com.ecommerce.marketplace.coupon.entity.CouponType;
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
public class CouponDto {
    private UUID id;
    private String code;
    private CouponScope scope;
    private UUID sellerId;
    private CouponType type;
    private BigDecimal value;
    private BigDecimal maxDiscount;
    private BigDecimal minOrderValue;
    private Instant validFrom;
    private Instant validTo;
    private Integer usageLimit;
    private Integer perUserLimit;
    private int usedCount;
    private CouponFundedBy fundedBy;
    private boolean active;
}
