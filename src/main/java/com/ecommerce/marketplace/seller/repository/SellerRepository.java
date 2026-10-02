package com.ecommerce.marketplace.seller.repository;

import com.ecommerce.marketplace.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SellerRepository extends JpaRepository<Seller, UUID>, JpaSpecificationExecutor<Seller> {
    Optional<Seller> findByUserId(UUID userId);
    Optional<Seller> findByStoreSlug(String storeSlug);
    boolean existsByStoreSlug(String storeSlug);
    long countByKycStatus(com.ecommerce.marketplace.seller.entity.KycStatus status);
}
