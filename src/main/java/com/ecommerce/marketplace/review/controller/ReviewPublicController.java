package com.ecommerce.marketplace.review.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.review.dto.ReviewDto;
import com.ecommerce.marketplace.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public/products/{productId}/reviews")
@RequiredArgsConstructor
@Tag(name = "Public Product Reviews", description = "Public endpoints for reading published product reviews")
public class ReviewPublicController {

    private final ReviewService reviewService;

    @GetMapping
    @Operation(summary = "Get product reviews", description = "List published reviews for a product")
    public ResponseEntity<ApiResponse<PageResponse<ReviewDto>>> getProductReviews(
            @PathVariable UUID productId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<ReviewDto> reviews = reviewService.getPublicProductReviews(productId, pageable);
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }
}
