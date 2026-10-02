package com.ecommerce.marketplace.seller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerDashboardSummaryDto {
    private long totalProducts;
    private long activeProducts;
    private long outOfStockProducts;
    private double averageRating;
    private long totalReviews;
    
    // Phase 2 placeholders
    @Builder.Default
    private boolean phase2 = true;
    @Builder.Default
    private long totalOrders = 0;
    @Builder.Default
    private long pendingOrders = 0;
    @Builder.Default
    private double totalSales = 0.0;
}
