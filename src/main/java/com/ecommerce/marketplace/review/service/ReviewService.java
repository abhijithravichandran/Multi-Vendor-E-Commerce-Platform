package com.ecommerce.marketplace.review.service;

import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.events.ReviewPostedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.integration.PurchaseVerificationPort;
import com.ecommerce.marketplace.review.dto.CreateReviewRequest;
import com.ecommerce.marketplace.review.dto.ReviewDto;
import com.ecommerce.marketplace.review.dto.ReviewModerationRequest;
import com.ecommerce.marketplace.review.dto.SellerReplyRequest;
import com.ecommerce.marketplace.review.entity.Review;
import com.ecommerce.marketplace.review.entity.ReviewStatus;
import com.ecommerce.marketplace.review.repository.ReviewRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final PurchaseVerificationPort purchaseVerificationPort;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public PageResponse<ReviewDto> getPublicProductReviews(UUID productId, Pageable pageable) {
        Page<Review> page = reviewRepository.findByProductIdAndStatus(productId, ReviewStatus.PUBLISHED, pageable);
        return PageResponse.from(page.map(this::mapToDto));
    }

    @Transactional
    public ReviewDto postReview(UUID customerId, CreateReviewRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        if (reviewRepository.existsByProductIdAndCustomerId(request.getProductId(), customerId)) {
            throw new ApiException(ErrorCode.REVIEW_ALREADY_EXISTS, "You have already reviewed this product");
        }

        boolean verified = purchaseVerificationPort.isVerifiedPurchase(customerId, request.getProductId(), request.getOrderItemId());

        String imagesJson = null;
        if (request.getImages() != null) {
            try {
                imagesJson = objectMapper.writeValueAsString(request.getImages());
            } catch (JsonProcessingException e) {
                log.error("Failed to serialize review images", e);
            }
        }

        Review review = Review.builder()
                .productId(request.getProductId())
                .customerId(customerId)
                .orderItemId(request.getOrderItemId())
                .verifiedPurchase(verified)
                .rating(request.getRating())
                .title(request.getTitle())
                .body(request.getBody())
                .imagesJson(imagesJson)
                .status(ReviewStatus.PUBLISHED)
                .build();

        review = reviewRepository.save(review);

        // Update product rating statistics
        updateProductRating(product);

        eventPublisher.publishEvent(new ReviewPostedEvent(review.getId(), product.getId(), customerId, review.getRating()));

        return mapToDto(review);
    }

    @Transactional
    public ReviewDto replyToReview(UUID sellerUserId, UUID reviewId, SellerReplyRequest request) {
        Seller seller = sellerRepository.findByUserId(sellerUserId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ErrorCode.REVIEW_NOT_FOUND));

        Product product = productRepository.findById(review.getProductId())
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getSellerId().equals(seller.getId())) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "Product does not belong to your store");
        }

        if (review.getCreatedAt().plus(java.time.Duration.ofHours(24)).isBefore(Instant.now())) {
            throw new ApiException(ErrorCode.BUSINESS_RULE_VIOLATION, "Cannot reply to a review older than 24 hours");
        }

        review.setSellerReply(request.getReply());
        review.setSellerReplyAt(Instant.now());
        review = reviewRepository.save(review);

        return mapToDto(review);
    }

    @Transactional
    public ReviewDto reportReview(UUID sellerUserId, UUID reviewId) {
        Seller seller = sellerRepository.findByUserId(sellerUserId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ErrorCode.REVIEW_NOT_FOUND));

        Product product = productRepository.findById(review.getProductId())
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getSellerId().equals(seller.getId())) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "Product does not belong to your store");
        }

        review.setReportedBySeller(true);
        review.setStatus(ReviewStatus.FLAGGED);
        review = reviewRepository.save(review);

        return mapToDto(review);
    }

    @Transactional(readOnly = true)
    public PageResponse<ReviewDto> getAllReviewsForAdmin(Pageable pageable) {
        Page<Review> page = reviewRepository.findAll(pageable);
        return PageResponse.from(page.map(this::mapToDto));
    }

    @Transactional
    public ReviewDto moderateReview(UUID reviewId, ReviewModerationRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ApiException(ErrorCode.REVIEW_NOT_FOUND));

        review.setStatus(request.getStatus());
        review = reviewRepository.save(review);

        Product product = productRepository.findById(review.getProductId()).orElse(null);
        if (product != null) {
            updateProductRating(product);
        }

        return mapToDto(review);
    }

    private void updateProductRating(Product product) {
        List<Review> publishedReviews = reviewRepository.findByProductId(product.getId()).stream()
                .filter(r -> r.getStatus() == ReviewStatus.PUBLISHED)
                .collect(Collectors.toList());

        if (publishedReviews.isEmpty()) {
            product.setRatingAvg(BigDecimal.ZERO);
            product.setRatingCount(0);
        } else {
            double avg = publishedReviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
            product.setRatingAvg(BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP));
            product.setRatingCount(publishedReviews.size());
        }
        productRepository.save(product);
    }

    private ReviewDto mapToDto(Review r) {
        String customerName = userRepository.findById(r.getCustomerId()).map(User::getName).orElse("Customer");
        List<String> images = Collections.emptyList();
        if (r.getImagesJson() != null) {
            try {
                images = objectMapper.readValue(r.getImagesJson(), new TypeReference<>() {});
            } catch (JsonProcessingException e) {
                log.error("Failed to parse review images", e);
            }
        }

        return ReviewDto.builder()
                .id(r.getId())
                .productId(r.getProductId())
                .customerId(r.getCustomerId())
                .customerName(customerName)
                .orderItemId(r.getOrderItemId())
                .verifiedPurchase(r.isVerifiedPurchase())
                .rating(r.getRating())
                .title(r.getTitle())
                .body(r.getBody())
                .images(images)
                .status(r.getStatus())
                .sellerReply(r.getSellerReply())
                .sellerReplyAt(r.getSellerReplyAt())
                .reportedBySeller(r.isReportedBySeller())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
