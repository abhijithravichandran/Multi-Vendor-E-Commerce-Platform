package com.ecommerce.marketplace.catalog.controller;

import com.ecommerce.marketplace.catalog.dto.BrandDto;
import com.ecommerce.marketplace.catalog.dto.BrandRequest;
import com.ecommerce.marketplace.catalog.dto.CategoryDto;
import com.ecommerce.marketplace.catalog.dto.CategoryRequest;
import com.ecommerce.marketplace.catalog.dto.ProductDto;
import com.ecommerce.marketplace.admin.dto.catalog.ProductApproveRequest;
import com.ecommerce.marketplace.admin.dto.catalog.ProductDiffDto;
import com.ecommerce.marketplace.admin.dto.catalog.ProductRejectRequest;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.service.CatalogService;
import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Catalog Management", description = "Admin endpoints for category/brand management and product moderation")
public class ProductAdminController {

    private final CatalogService catalogService;

    @PostMapping("/categories")
    @Audited(action = "CREATE_CATEGORY", entityType = "Category")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Create category", description = "Create a new category in the catalog tree")
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@Valid @RequestBody CategoryRequest request) {
        CategoryDto category = catalogService.createCategory(request);
        return ResponseEntity.ok(ApiResponse.success(category, "Category created successfully"));
    }

    @PutMapping("/categories/{id}")
    @Audited(action = "UPDATE_CATEGORY", entityType = "Category")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Update category", description = "Update an existing category and return affected products if commission changed")
    public ResponseEntity<ApiResponse<com.ecommerce.marketplace.catalog.dto.CategoryUpdateResponseDto>> updateCategory(
            @PathVariable UUID id, @Valid @RequestBody CategoryRequest request) {
        var response = catalogService.updateCategory(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Category updated successfully"));
    }

    @DeleteMapping("/categories/{id}")
    @Audited(action = "DELETE_CATEGORY", entityType = "Category")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Delete category", description = "Delete a category if it has no products")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable UUID id) {
        catalogService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Category deleted successfully"));
    }

    @PostMapping("/brands")
    @Audited(action = "CREATE_BRAND", entityType = "Brand")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Create brand", description = "Create a new brand")
    public ResponseEntity<ApiResponse<BrandDto>> createBrand(@Valid @RequestBody BrandRequest request) {
        BrandDto brand = catalogService.createBrand(request);
        return ResponseEntity.ok(ApiResponse.success(brand, "Brand created successfully"));
    }

    @PutMapping("/brands/{id}")
    @Audited(action = "UPDATE_BRAND", entityType = "Brand")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Update brand", description = "Update an existing brand")
    public ResponseEntity<ApiResponse<BrandDto>> updateBrand(
            @PathVariable UUID id, @Valid @RequestBody BrandRequest request) {
        BrandDto brand = catalogService.updateBrand(id, request);
        return ResponseEntity.ok(ApiResponse.success(brand, "Brand updated successfully"));
    }

    @DeleteMapping("/brands/{id}")
    @Audited(action = "DELETE_BRAND", entityType = "Brand")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Delete brand", description = "Delete a brand if it has no products")
    public ResponseEntity<ApiResponse<Void>> deleteBrand(@PathVariable UUID id) {
        catalogService.deleteBrand(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Brand deleted successfully"));
    }


    @GetMapping("/products")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER', 'SUPPORT', 'FINANCE')")
    @Operation(summary = "List all products for admin", description = "List products filtered by status, category, or seller")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getAdminProducts(
            @RequestParam(required = false) UUID sellerId,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) ProductStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<ProductDto> products = catalogService.getAdminFilteredProducts(sellerId, categoryId, status, pageable);
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @GetMapping("/products/moderation")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Get moderation queue", description = "List products pending approval")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getModerationQueue(@PageableDefault(size = 20) Pageable pageable) {
        PageResponse<ProductDto> products = catalogService.getAdminFilteredProducts(null, null, ProductStatus.PENDING_APPROVAL, pageable);
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @GetMapping("/products/{id}/diff")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Get product diff", description = "Compare current product snapshot with previous")
    public ResponseEntity<ApiResponse<ProductDiffDto>> getProductDiff(@PathVariable UUID id) {
        ProductDiffDto diff = catalogService.getProductDiff(id);
        return ResponseEntity.ok(ApiResponse.success(diff));
    }

    @PostMapping("/products/{id}/approve")
    @Audited(action = "APPROVE_PRODUCT", entityType = "Product")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Approve product", description = "Approve a pending product")
    public ResponseEntity<ApiResponse<ProductDto>> approveProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductApproveRequest request) {
        ProductDto product = catalogService.approveProduct(id, request);
        return ResponseEntity.ok(ApiResponse.success(product, "Product approved"));
    }

    @PostMapping("/products/{id}/reject")
    @Audited(action = "REJECT_PRODUCT", entityType = "Product")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Reject product", description = "Reject a pending product")
    public ResponseEntity<ApiResponse<ProductDto>> rejectProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductRejectRequest request) {
        ProductDto product = catalogService.rejectProduct(id, request);
        return ResponseEntity.ok(ApiResponse.success(product, "Product rejected"));
    }

    @PostMapping("/products/{id}/request-changes")
    @Audited(action = "REQUEST_CHANGES_PRODUCT", entityType = "Product")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Request changes", description = "Request changes for a pending product")
    public ResponseEntity<ApiResponse<ProductDto>> requestChanges(
            @PathVariable UUID id,
            @Valid @RequestBody ProductRejectRequest request) {
        ProductDto product = catalogService.requestChangesForProduct(id, request);
        return ResponseEntity.ok(ApiResponse.success(product, "Changes requested"));
    }

    @PutMapping("/products/{id}/disable")
    @Audited(action = "DISABLE_PRODUCT", entityType = "Product")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'CATALOG_MANAGER')")
    @Operation(summary = "Disable product", description = "Disable an active product")
    public ResponseEntity<ApiResponse<ProductDto>> disableProduct(@PathVariable UUID id) {
        ProductDto product = catalogService.disableProduct(id);
        return ResponseEntity.ok(ApiResponse.success(product, "Product disabled"));
    }
}
