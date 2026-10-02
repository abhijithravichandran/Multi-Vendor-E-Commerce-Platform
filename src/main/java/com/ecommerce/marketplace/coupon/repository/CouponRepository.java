package com.ecommerce.marketplace.coupon.repository;

import com.ecommerce.marketplace.coupon.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, UUID> {
    Optional<Coupon> findByCode(String code);
    List<Coupon> findBySellerId(UUID sellerId);
    boolean existsByCode(String code);
}
