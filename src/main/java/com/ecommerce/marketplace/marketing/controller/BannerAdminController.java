package com.ecommerce.marketplace.marketing.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.marketing.dto.BannerDto;
import com.ecommerce.marketplace.marketing.dto.BannerRequest;
import com.ecommerce.marketplace.marketing.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/banners")
@RequiredArgsConstructor
@Tag(name = "Admin Banner Management", description = "Admin endpoints for creating and managing promotional banners")
public class BannerAdminController {

    private final BannerService bannerService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all banners", description = "List all banners including inactive ones")
    public ResponseEntity<ApiResponse<List<BannerDto>>> getAllBanners() {
        List<BannerDto> banners = bannerService.getAllBannersForAdmin();
        return ResponseEntity.ok(ApiResponse.success(banners));
    }

    @PostMapping
    @Audited(action = "CREATE_BANNER", entityType = "Banner")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create banner", description = "Create a new promotional banner")
    public ResponseEntity<ApiResponse<BannerDto>> createBanner(@Valid @RequestBody BannerRequest request) {
        BannerDto banner = bannerService.createBanner(request);
        return ResponseEntity.ok(ApiResponse.success(banner, "Banner created successfully"));
    }

    @PutMapping("/{id}")
    @Audited(action = "UPDATE_BANNER", entityType = "Banner")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update banner", description = "Update an existing promotional banner")
    public ResponseEntity<ApiResponse<BannerDto>> updateBanner(
            @PathVariable UUID id,
            @Valid @RequestBody BannerRequest request) {
        BannerDto banner = bannerService.updateBanner(id, request);
        return ResponseEntity.ok(ApiResponse.success(banner, "Banner updated successfully"));
    }

    @DeleteMapping("/{id}")
    @Audited(action = "DELETE_BANNER", entityType = "Banner")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete banner", description = "Delete a promotional banner")
    public ResponseEntity<ApiResponse<String>> deleteBanner(@PathVariable UUID id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.ok(ApiResponse.success("Banner deleted successfully"));
    }
}
