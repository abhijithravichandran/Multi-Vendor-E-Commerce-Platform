package com.ecommerce.marketplace.review.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.review.dto.ReviewDto;
import com.ecommerce.marketplace.review.dto.ReviewModerationRequest;
import com.ecommerce.marketplace.review.entity.ReviewStatus;
import com.ecommerce.marketplace.review.service.ReviewService;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/reviews")
@RequiredArgsConstructor
@Tag(name = "Admin Reviews", description = "Admin endpoints for review moderation")
@PreAuthorize("hasRole('ADMIN')")
public class ReviewAdminController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "Get all reviews")
    public ResponseEntity<ApiResponse<PageResponse<ReviewDto>>> getAllReviews(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getAllReviewsForAdmin(pageable)));
    }

    @PostMapping("/{id}/moderate")
    @Audited(action = "MODERATE_REVIEW", entityType = "Review")
    public ResponseEntity<ApiResponse<ReviewDto>> moderateReview(@PathVariable UUID id, @RequestBody ReviewModerationRequest request) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.moderateReview(id, request)));
    }

    @PostMapping("/reviewers/{userId}/warn")
    @Audited(action = "WARN_REVIEWER", entityType = "User")
    public ResponseEntity<ApiResponse<String>> warnReviewer(@PathVariable UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setReviewWarningCount(user.getReviewWarningCount() + 1);
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("Reviewer warned. Total warnings: " + user.getReviewWarningCount()));
    }

    @PostMapping("/reviewers/{userId}/ban")
    @Audited(action = "BAN_REVIEWER", entityType = "User")
    public ResponseEntity<ApiResponse<String>> banReviewer(@PathVariable UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setCanReview(false);
        userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success("Reviewer banned from posting reviews"));
    }
}
