package com.ecommerce.marketplace.catalog.repository;

import com.ecommerce.marketplace.catalog.entity.ProductSubmissionSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductSnapshotRepository extends JpaRepository<ProductSubmissionSnapshot, UUID> {
    List<ProductSubmissionSnapshot> findByProductIdOrderByCreatedAtDesc(UUID productId);
}
