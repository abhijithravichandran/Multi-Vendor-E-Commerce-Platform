package com.ecommerce.marketplace.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardSummaryDto {
    private long totalCustomers;
    private long totalSellers;
    private long totalProducts;
    private long pendingKycSellers;
    private long pendingModerationProducts;
    
    // Phase 2 placeholders
    @Builder.Default
    private boolean phase2 = true;
    @Builder.Default
    private long totalOrders = 0;
    @Builder.Default
    private double gmv = 0.0;
    @Builder.Default
    private double totalCommission = 0.0;
}
