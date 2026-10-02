package com.ecommerce.marketplace.coupon.service;

import com.ecommerce.marketplace.common.events.CouponCreatedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.coupon.dto.CouponDto;
import com.ecommerce.marketplace.coupon.dto.CouponRequest;
import com.ecommerce.marketplace.coupon.dto.CouponResultDto;
import com.ecommerce.marketplace.coupon.entity.Coupon;
import com.ecommerce.marketplace.coupon.entity.CouponScope;
import com.ecommerce.marketplace.coupon.entity.CouponType;
import com.ecommerce.marketplace.coupon.repository.CouponRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final SellerRepository sellerRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public CouponDto createCoupon(CouponRequest request, UUID sellerUserId) {
        if (couponRepository.existsByCode(request.getCode())) {
            throw new ApiException(ErrorCode.INVALID_INPUT, "Coupon code already exists");
        }

        UUID sellerId = request.getSellerId();
        if (request.getScope() == CouponScope.SELLER) {
            if (sellerUserId != null) {
                Seller seller = sellerRepository.findByUserId(sellerUserId)
                        .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
                sellerId = seller.getId();
            }
            if (sellerId == null) {
                throw new ApiException(ErrorCode.INVALID_INPUT, "Seller ID is required for seller-scoped coupons");
            }
        }

        Coupon coupon = Coupon.builder()
                .code(request.getCode().toUpperCase())
                .scope(request.getScope())
                .sellerId(sellerId)
                .type(request.getType())
                .value(request.getValue())
                .maxDiscount(request.getMaxDiscount())
                .minOrderValue(request.getMinOrderValue())
                .validFrom(request.getValidFrom())
                .validTo(request.getValidTo())
                .usageLimit(request.getUsageLimit())
                .perUserLimit(request.getPerUserLimit() != null ? request.getPerUserLimit() : 1)
                .fundedBy(request.getFundedBy())
                .active(request.getActive() != null ? request.getActive() : true)
                .build();

        coupon = couponRepository.save(coupon);

        eventPublisher.publishEvent(new CouponCreatedEvent(coupon.getId(), coupon.getCode(), coupon.getScope().name()));

        return mapToDto(coupon);
    }

    @Transactional(readOnly = true)
    public CouponResultDto validateCoupon(String code, UUID customerId, BigDecimal subtotal) {
        Coupon coupon = couponRepository.findByCode(code.toUpperCase())
                .orElse(null);

        if (coupon == null || !coupon.isActive()) {
            return CouponResultDto.builder()
                    .valid(false)
                    .code(code)
                    .discountAmount(BigDecimal.ZERO)
                    .message("Coupon is invalid or inactive")
                    .build();
        }

        Instant now = Instant.now();
        if (now.isBefore(coupon.getValidFrom()) || now.isAfter(coupon.getValidTo())) {
            return CouponResultDto.builder()
                    .valid(false)
                    .code(code)
                    .discountAmount(BigDecimal.ZERO)
                    .message("Coupon is expired or not yet valid")
                    .build();
        }

        if (coupon.getMinOrderValue() != null && subtotal.compareTo(coupon.getMinOrderValue()) < 0) {
            return CouponResultDto.builder()
                    .valid(false)
                    .code(code)
                    .discountAmount(BigDecimal.ZERO)
                    .message("Minimum order value of " + coupon.getMinOrderValue() + " required for this coupon")
                    .build();
        }

        if (coupon.getUsageLimit() != null && coupon.getUsedCount() >= coupon.getUsageLimit()) {
            return CouponResultDto.builder()
                    .valid(false)
                    .code(code)
                    .discountAmount(BigDecimal.ZERO)
                    .message("Coupon usage limit reached")
                    .build();
        }

        BigDecimal discount = BigDecimal.ZERO;
        if (coupon.getType() == CouponType.FLAT) {
            discount = coupon.getValue().min(subtotal);
        } else if (coupon.getType() == CouponType.PERCENT) {
            discount = subtotal.multiply(coupon.getValue()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            if (coupon.getMaxDiscount() != null && discount.compareTo(coupon.getMaxDiscount()) > 0) {
                discount = coupon.getMaxDiscount();
            }
        } else if (coupon.getType() == CouponType.FREE_SHIPPING) {
            discount = BigDecimal.ZERO; // Handled in shipping computation
        }

        return CouponResultDto.builder()
                .valid(true)
                .code(coupon.getCode())
                .discountAmount(discount)
                .message("Coupon applied successfully")
                .build();
    }

    @Transactional
    public void recordUsage(String code, UUID customerId, String referenceId) {
        couponRepository.findByCode(code.toUpperCase()).ifPresent(coupon -> {
            coupon.setUsedCount(coupon.getUsedCount() + 1);
            couponRepository.save(coupon);
        });
    }

    @Transactional(readOnly = true)
    public List<CouponDto> getAllCouponsForAdmin() {
        return couponRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CouponDto> getSellerCoupons(UUID sellerUserId) {
        Seller seller = sellerRepository.findByUserId(sellerUserId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        return couponRepository.findBySellerId(seller.getId()).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<CouponDto> getAvailableCoupons(UUID customerId) {
        // Simple implementation: return all active coupons that are not expired
        return couponRepository.findAll().stream()
                .filter(c -> c.isActive() && (c.getValidTo() == null || c.getValidTo().isAfter(java.time.Instant.now())))
                .filter(c -> c.getValidFrom() == null || c.getValidFrom().isBefore(java.time.Instant.now()))
                .filter(c -> c.getUsageLimit() == null || c.getUsedCount() < c.getUsageLimit())
                .map(this::mapToDto)
                .collect(java.util.stream.Collectors.toList());
    }

    private CouponDto mapToDto(Coupon c) {
        return CouponDto.builder()
                .id(c.getId())
                .code(c.getCode())
                .scope(c.getScope())
                .sellerId(c.getSellerId())
                .type(c.getType())
                .value(c.getValue())
                .maxDiscount(c.getMaxDiscount())
                .minOrderValue(c.getMinOrderValue())
                .validFrom(c.getValidFrom())
                .validTo(c.getValidTo())
                .usageLimit(c.getUsageLimit())
                .perUserLimit(c.getPerUserLimit())
                .usedCount(c.getUsedCount())
                .fundedBy(c.getFundedBy())
                .active(c.isActive())
                .build();
    }
}
