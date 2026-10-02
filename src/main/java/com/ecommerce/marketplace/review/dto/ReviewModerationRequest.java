package com.ecommerce.marketplace.review.dto;

import com.ecommerce.marketplace.review.entity.ReviewStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewModerationRequest {
    @NotNull(message = "Review status decision is required (PUBLISHED, FLAGGED, REMOVED)")
    private ReviewStatus status;
}
