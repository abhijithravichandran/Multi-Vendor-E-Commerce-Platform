package com.ecommerce.marketplace.catalog.controller;

import com.ecommerce.marketplace.catalog.dto.ProductCreateRequest;
import com.ecommerce.marketplace.catalog.dto.ProductDto;
import com.ecommerce.marketplace.catalog.service.CatalogService;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/seller/products")
@RequiredArgsConstructor
@Tag(name = "Seller Products", description = "Seller portal endpoints for managing products and variants")
public class ProductSellerController {

    private final CatalogService catalogService;

    @GetMapping
    @Operation(summary = "List seller products", description = "List all products owned by current seller")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getSellerProducts(
            @CurrentUser UserPrincipal principal,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<ProductDto> products = catalogService.getSellerProducts(principal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @PostMapping
    @Operation(summary = "Create product", description = "Create a new draft product with variants")
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody ProductCreateRequest request) {
        ProductDto product = catalogService.createProduct(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(product, "Product created in DRAFT status"));
    }

    @PutMapping("/{id}/submit")
    @Operation(summary = "Submit product for approval", description = "Submit draft or updated product for catalog manager review")
    public ResponseEntity<ApiResponse<ProductDto>> submitForApproval(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        ProductDto product = catalogService.submitProductForApproval(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(product, "Product submitted for review"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update product", description = "Update a product")
    public ResponseEntity<ApiResponse<ProductDto>> updateProduct(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody com.ecommerce.marketplace.catalog.dto.ProductUpdateRequest request) {
        ProductDto product = catalogService.updateProduct(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success(product, "Product updated"));
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    @Operation(summary = "Delete product", description = "Soft delete a product")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        catalogService.deleteProduct(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(null, "Product deleted"));
    }

    @PostMapping("/{id}/duplicate")
    @Operation(summary = "Duplicate product", description = "Duplicate an existing product")
    public ResponseEntity<ApiResponse<ProductDto>> duplicateProduct(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        ProductDto product = catalogService.duplicateProduct(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(product, "Product duplicated"));
    }

    @PostMapping("/bulk")
    @Operation(summary = "Bulk create products", description = "Create multiple products")
    public ResponseEntity<ApiResponse<java.util.List<ProductDto>>> bulkCreateProducts(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody java.util.List<ProductCreateRequest> requests) {
        java.util.List<ProductDto> products = catalogService.bulkCreateProducts(principal.getId(), requests);
        return ResponseEntity.ok(ApiResponse.success(products, "Products created"));
    }
}
