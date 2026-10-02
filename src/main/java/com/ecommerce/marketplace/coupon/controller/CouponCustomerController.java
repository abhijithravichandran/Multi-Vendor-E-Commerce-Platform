package com.ecommerce.marketplace.coupon.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.coupon.dto.CouponResultDto;
import com.ecommerce.marketplace.coupon.service.CouponService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.ecommerce.marketplace.coupon.dto.CouponDto;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/customer/coupons")
@RequiredArgsConstructor
@Tag(name = "Customer Coupons", description = "Customer endpoints for validating coupons")
public class CouponCustomerController {

    private final CouponService couponService;

    @GetMapping("/validate")
    @Operation(summary = "Validate coupon code", description = "Check if coupon code is valid for cart subtotal")
    public ResponseEntity<ApiResponse<CouponResultDto>> validateCoupon(
            @CurrentUser UserPrincipal principal,
            @RequestParam String code,
            @RequestParam BigDecimal subtotal) {
        CouponResultDto result = couponService.validateCoupon(code, principal.getId(), subtotal);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/available")
    @Operation(summary = "Get available coupons", description = "List all active and valid coupons")
    public ResponseEntity<ApiResponse<List<CouponDto>>> getAvailableCoupons(@CurrentUser UserPrincipal principal) {
        List<CouponDto> coupons = couponService.getAvailableCoupons(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(coupons));
    }
}
