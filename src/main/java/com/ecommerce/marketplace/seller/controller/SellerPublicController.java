package com.ecommerce.marketplace.seller.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.seller.dto.SellerDto;
import com.ecommerce.marketplace.seller.service.SellerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.catalog.dto.ProductDto;
import com.ecommerce.marketplace.catalog.service.CatalogService;

@RestController
@RequestMapping("/api/v1/public/sellers")
@RequiredArgsConstructor
@Tag(name = "Public Seller Storefront", description = "Public endpoints for browsing seller stores")
public class SellerPublicController {

    private final SellerService sellerService;
    private final CatalogService catalogService;

    @GetMapping("/{slug}")
    @Operation(summary = "Get seller by store slug", description = "Fetch public store details by store slug")
    public ResponseEntity<ApiResponse<SellerDto>> getSellerBySlug(@PathVariable String slug) {
        SellerDto seller = sellerService.getSellerBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(seller));
    }

    @GetMapping("/{slug}/products")
    @Operation(summary = "Get seller products", description = "Fetch public products of a seller")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getSellerProducts(
            @PathVariable String slug,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        PageResponse<ProductDto> products = catalogService.getPublicSellerProducts(slug, pageable);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
}
