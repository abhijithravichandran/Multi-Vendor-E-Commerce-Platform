package com.ecommerce.marketplace.coupon.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.coupon.dto.CouponDto;
import com.ecommerce.marketplace.coupon.dto.CouponRequest;
import com.ecommerce.marketplace.coupon.service.CouponService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seller/coupons")
@RequiredArgsConstructor
@Tag(name = "Seller Coupons", description = "Seller portal endpoints for managing store coupons")
public class CouponSellerController {

    private final CouponService couponService;

    @GetMapping
    @Operation(summary = "List seller coupons", description = "Fetch store coupons created by logged in seller")
    public ResponseEntity<ApiResponse<List<CouponDto>>> getSellerCoupons(@CurrentUser UserPrincipal principal) {
        List<CouponDto> coupons = couponService.getSellerCoupons(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(coupons));
    }

    @PostMapping
    @Operation(summary = "Create seller coupon", description = "Create a store-scoped coupon funded by seller")
    public ResponseEntity<ApiResponse<CouponDto>> createCoupon(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody CouponRequest request) {
        CouponDto coupon = couponService.createCoupon(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(coupon, "Seller coupon created successfully"));
    }
}
