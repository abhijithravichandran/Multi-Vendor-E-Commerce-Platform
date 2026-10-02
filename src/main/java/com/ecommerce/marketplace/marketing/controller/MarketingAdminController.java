package com.ecommerce.marketplace.marketing.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.coupon.entity.Coupon;
import com.ecommerce.marketplace.coupon.entity.CouponFundedBy;
import com.ecommerce.marketplace.coupon.repository.CouponRepository;
import com.ecommerce.marketplace.marketing.dto.BroadcastRequest;
import com.ecommerce.marketplace.marketing.entity.Banner;
import com.ecommerce.marketplace.marketing.entity.FlashSale;
import com.ecommerce.marketplace.marketing.repository.BannerRepository;
import com.ecommerce.marketplace.marketing.repository.FlashSaleRepository;
import com.ecommerce.marketplace.notification.service.NotificationService;
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
@RequestMapping("/api/v1/admin/marketing")
@RequiredArgsConstructor
@Tag(name = "Admin Marketing", description = "Admin endpoints for marketing and promotions")
@PreAuthorize("hasRole('ADMIN')")
public class MarketingAdminController {

    private final BannerRepository bannerRepository;
    private final FlashSaleRepository flashSaleRepository;
    private final CouponRepository couponRepository;
    private final NotificationService notificationService;

    @GetMapping("/banners")
    public ResponseEntity<ApiResponse<List<Banner>>> getBanners() {
        return ResponseEntity.ok(ApiResponse.success(bannerRepository.findAll()));
    }

    @PostMapping("/banners")
    @Audited(action = "CREATE_BANNER", entityType = "Banner")
    public ResponseEntity<ApiResponse<Banner>> createBanner(@RequestBody Banner banner) {
        return ResponseEntity.ok(ApiResponse.success(bannerRepository.save(banner)));
    }

    @GetMapping("/flash-sales")
    public ResponseEntity<ApiResponse<List<FlashSale>>> getFlashSales() {
        return ResponseEntity.ok(ApiResponse.success(flashSaleRepository.findAll()));
    }

    @PostMapping("/flash-sales")
    @Audited(action = "CREATE_FLASH_SALE", entityType = "FlashSale")
    public ResponseEntity<ApiResponse<FlashSale>> createFlashSale(@RequestBody FlashSale flashSale) {
        return ResponseEntity.ok(ApiResponse.success(flashSaleRepository.save(flashSale)));
    }

    @GetMapping("/coupons")
    public ResponseEntity<ApiResponse<List<Coupon>>> getCoupons() {
        return ResponseEntity.ok(ApiResponse.success(couponRepository.findAll()));
    }

    @PostMapping("/coupons")
    @Audited(action = "CREATE_PLATFORM_COUPON", entityType = "Coupon")
    public ResponseEntity<ApiResponse<Coupon>> createPlatformCoupon(@RequestBody Coupon coupon) {
        coupon.setFundedBy(CouponFundedBy.PLATFORM);
        return ResponseEntity.ok(ApiResponse.success(couponRepository.save(coupon)));
    }

    @PostMapping("/broadcast")
    @Audited(action = "SEND_BROADCAST", entityType = "Notification")
    @Operation(summary = "Send broadcast", description = "Fan out a notification to a segment")
    public ResponseEntity<ApiResponse<String>> sendBroadcast(@Valid @RequestBody BroadcastRequest request) {
        notificationService.sendBroadcast(request);
        return ResponseEntity.ok(ApiResponse.success("Broadcast dispatched successfully"));
    }
}
