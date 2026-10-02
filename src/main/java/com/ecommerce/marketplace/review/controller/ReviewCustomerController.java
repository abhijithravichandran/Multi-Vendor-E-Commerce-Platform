package com.ecommerce.marketplace.review.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.review.dto.CreateReviewRequest;
import com.ecommerce.marketplace.review.dto.ReviewDto;
import com.ecommerce.marketplace.review.service.ReviewService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customer/reviews")
@RequiredArgsConstructor
@Tag(name = "Customer Reviews", description = "Customer endpoints for posting product reviews")
public class ReviewCustomerController {

    private final ReviewService reviewService;

    @PostMapping
    @Operation(summary = "Post review", description = "Post a rating and review for a product")
    public ResponseEntity<ApiResponse<ReviewDto>> postReview(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody CreateReviewRequest request) {
        ReviewDto review = reviewService.postReview(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(review, "Review posted successfully"));
    }
}
