package com.ecommerce.marketplace.admin.dto;

import com.ecommerce.marketplace.user.entity.UserStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class AdminCustomerListDto {
    private UUID id;
    private String name;
    private String email;
    private UserStatus status;
    private Instant joinedAt;
    @Builder.Default
    private int orderCount = 0; // Phase 2 placeholder
    @Builder.Default
    private BigDecimal ltv = BigDecimal.ZERO; // Phase 2 placeholder
}
