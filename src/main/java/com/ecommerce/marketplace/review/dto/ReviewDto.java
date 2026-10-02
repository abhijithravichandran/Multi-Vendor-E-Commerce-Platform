package com.ecommerce.marketplace.review.dto;

import com.ecommerce.marketplace.review.entity.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private UUID id;
    private UUID productId;
    private UUID customerId;
    private String customerName;
    private UUID orderItemId;
    private boolean verifiedPurchase;
    private int rating;
    private String title;
    private String body;
    private List<String> images;
    private ReviewStatus status;
    private String sellerReply;
    private Instant sellerReplyAt;
    private boolean reportedBySeller;
    private Instant createdAt;
}
