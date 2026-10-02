package com.ecommerce.marketplace.seller.controller;

import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.seller.dto.SellerDashboardSummaryDto;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/seller/dashboard")
@RequiredArgsConstructor
@Tag(name = "Seller Dashboard", description = "Seller dashboard metrics")
public class SellerDashboardController {

    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @GetMapping("/summary")
    @Operation(summary = "Get dashboard summary", description = "Get store metrics (orders/sales are mocked for Phase 1)")
    public ResponseEntity<ApiResponse<SellerDashboardSummaryDto>> getSummary(@CurrentUser UserPrincipal principal) {
        Seller seller = sellerRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        List<com.ecommerce.marketplace.catalog.entity.Product> products = 
                productRepository.findBySellerIdAndDeletedAtIsNull(seller.getId(), org.springframework.data.domain.Pageable.unpaged()).getContent();

        long totalProducts = products.size();
        long activeProducts = products.stream().filter(p -> p.getStatus() == ProductStatus.APPROVED).count();
        
        long outOfStock = inventoryRepository.findBySellerId(seller.getId()).stream()
                .filter(inv -> inv.getQtyAvailable() <= 0)
                .count();

        double avgRating = 0.0;
        long totalReviews = 0;
        if (!products.isEmpty()) {
            List<com.ecommerce.marketplace.catalog.entity.Product> reviewedProducts = products.stream()
                    .filter(p -> p.getRatingCount() > 0)
                    .collect(Collectors.toList());
            if (!reviewedProducts.isEmpty()) {
                double sumRating = reviewedProducts.stream()
                        .mapToDouble(p -> p.getRatingAvg().doubleValue() * p.getRatingCount())
                        .sum();
                totalReviews = reviewedProducts.stream().mapToLong(com.ecommerce.marketplace.catalog.entity.Product::getRatingCount).sum();
                if (totalReviews > 0) {
                    avgRating = Math.round((sumRating / totalReviews) * 10.0) / 10.0;
                }
            }
        }

        SellerDashboardSummaryDto summary = SellerDashboardSummaryDto.builder()
                .totalProducts(totalProducts)
                .activeProducts(activeProducts)
                .outOfStockProducts(outOfStock)
                .averageRating(avgRating)
                .totalReviews(totalReviews)
                .build();

        return ResponseEntity.ok(ApiResponse.success(summary));
    }
}
