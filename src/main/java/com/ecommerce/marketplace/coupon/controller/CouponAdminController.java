package com.ecommerce.marketplace.coupon.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.coupon.dto.CouponDto;
import com.ecommerce.marketplace.coupon.dto.CouponRequest;
import com.ecommerce.marketplace.coupon.service.CouponService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/coupons")
@RequiredArgsConstructor
@Tag(name = "Admin Coupon Management", description = "Admin endpoints for platform and seller coupon management")
public class CouponAdminController {

    private final CouponService couponService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all coupons", description = "List all platform and seller coupons")
    public ResponseEntity<ApiResponse<List<CouponDto>>> getAllCoupons() {
        List<CouponDto> coupons = couponService.getAllCouponsForAdmin();
        return ResponseEntity.ok(ApiResponse.success(coupons));
    }

    @PostMapping
    @Audited(action = "CREATE_PLATFORM_COUPON", entityType = "Coupon")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create platform coupon", description = "Create platform-wide promotional coupon")
    public ResponseEntity<ApiResponse<CouponDto>> createCoupon(@Valid @RequestBody CouponRequest request) {
        CouponDto coupon = couponService.createCoupon(request, null);
        return ResponseEntity.ok(ApiResponse.success(coupon, "Platform coupon created successfully"));
    }
}
