package com.ecommerce.marketplace.catalog.repository;

import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlugAndDeletedAtIsNull(String slug);
    Optional<Product> findByIdAndDeletedAtIsNull(UUID id);
    Optional<Product> findByIdAndSellerIdAndDeletedAtIsNull(UUID id, UUID sellerId);
    boolean existsBySlug(String slug);
    long countByCategoryId(UUID categoryId);
    long countByBrandId(UUID brandId);
    long countByStatus(com.ecommerce.marketplace.catalog.entity.ProductStatus status);
    org.springframework.data.domain.Page<Product> findBySellerIdAndDeletedAtIsNull(UUID sellerId, org.springframework.data.domain.Pageable pageable);
}
