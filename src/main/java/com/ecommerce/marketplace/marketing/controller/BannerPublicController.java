package com.ecommerce.marketplace.marketing.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.marketing.dto.BannerDto;
import com.ecommerce.marketplace.marketing.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/banners")
@RequiredArgsConstructor
@Tag(name = "Public Banners", description = "Public endpoint for fetching active promotional banners")
public class BannerPublicController {

    private final BannerService bannerService;

    @GetMapping
    @Operation(summary = "Get active banners", description = "Fetch list of active marketing banners sorted by position")
    public ResponseEntity<ApiResponse<List<BannerDto>>> getActiveBanners() {
        List<BannerDto> banners = bannerService.getActiveBanners();
        return ResponseEntity.ok(ApiResponse.success(banners));
    }
}
