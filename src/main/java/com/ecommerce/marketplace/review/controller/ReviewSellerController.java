package com.ecommerce.marketplace.review.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.review.dto.ReviewDto;
import com.ecommerce.marketplace.review.dto.SellerReplyRequest;
import com.ecommerce.marketplace.review.service.ReviewService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/seller/reviews")
@RequiredArgsConstructor
@Tag(name = "Seller Reviews", description = "Seller portal endpoints for replying to reviews or reporting abuse")
public class ReviewSellerController {

    private final ReviewService reviewService;

    @PostMapping("/{id}/reply")
    @Operation(summary = "Reply to review", description = "Add a seller response to a customer review")
    public ResponseEntity<ApiResponse<ReviewDto>> replyToReview(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody SellerReplyRequest request) {
        ReviewDto review = reviewService.replyToReview(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success(review, "Reply added to review"));
    }

    @PutMapping("/{id}/report")
    @Operation(summary = "Report review", description = "Report an abusive review for admin moderation")
    public ResponseEntity<ApiResponse<ReviewDto>> reportReview(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        ReviewDto review = reviewService.reportReview(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(review, "Review reported for moderation"));
    }
}
