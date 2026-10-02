package com.ecommerce.marketplace.review.repository;

import com.ecommerce.marketplace.review.entity.Review;
import com.ecommerce.marketplace.review.entity.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    Page<Review> findByProductIdAndStatus(UUID productId, ReviewStatus status, Pageable pageable);
    Optional<Review> findByProductIdAndCustomerId(UUID productId, UUID customerId);
    boolean existsByProductIdAndCustomerId(UUID productId, UUID customerId);
    List<Review> findByProductId(UUID productId);
    long countByCustomerId(UUID customerId);
    java.util.List<Review> findByStatusOrReportedBySellerTrue(com.ecommerce.marketplace.review.entity.ReviewStatus status);
}
