package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.admin.dto.AdminDashboardSummaryDto;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin Dashboard", description = "Admin dashboard summary with Phase 2 placeholders")
public class AdminDashboardController {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;

    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get dashboard summary", description = "Get platform metrics (orders/gmv are mocked for Phase 1)")
    public ResponseEntity<ApiResponse<AdminDashboardSummaryDto>> getSummary() {
        long totalCustomers = userRepository.countByRole(Role.CUSTOMER);
        long totalSellers = sellerRepository.count();
        long totalProducts = productRepository.count();
        long pendingKyc = sellerRepository.countByKycStatus(KycStatus.PENDING);
        long pendingProducts = productRepository.countByStatus(ProductStatus.PENDING_APPROVAL);

        AdminDashboardSummaryDto summary = AdminDashboardSummaryDto.builder()
                .totalCustomers(totalCustomers)
                .totalSellers(totalSellers)
                .totalProducts(totalProducts)
                .pendingKycSellers(pendingKyc)
                .pendingModerationProducts(pendingProducts)
                .build();

        return ResponseEntity.ok(ApiResponse.success(summary));
    }
}
