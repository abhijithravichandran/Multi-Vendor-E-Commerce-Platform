package com.ecommerce.marketplace.seller.repository;

import com.ecommerce.marketplace.seller.entity.SellerDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SellerDocumentRepository extends JpaRepository<SellerDocument, UUID> {
    List<SellerDocument> findBySellerId(UUID sellerId);
}
