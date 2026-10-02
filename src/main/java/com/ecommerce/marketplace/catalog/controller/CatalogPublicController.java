package com.ecommerce.marketplace.catalog.controller;

import com.ecommerce.marketplace.catalog.dto.BrandDto;
import com.ecommerce.marketplace.catalog.dto.CategoryDto;
import com.ecommerce.marketplace.catalog.dto.ProductDto;
import com.ecommerce.marketplace.catalog.service.CatalogService;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
@Tag(name = "Public Catalog", description = "Endpoints for browsing categories, brands, and approved products")
public class CatalogPublicController {

    private final CatalogService catalogService;

    @GetMapping("/categories")
    @Operation(summary = "Get category tree", description = "Fetch 2-level category tree hierarchy")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getCategoryTree() {
        List<CategoryDto> categories = catalogService.getCategoryTree();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/brands")
    @Operation(summary = "Get all brands", description = "Fetch list of active brands")
    public ResponseEntity<ApiResponse<List<BrandDto>>> getBrands() {
        List<BrandDto> brands = catalogService.getAllBrands();
        return ResponseEntity.ok(ApiResponse.success(brands));
    }

    @GetMapping("/products")
    @Operation(summary = "Search & list products", description = "Filter approved products by q, categoryId, brandId, minPrice, maxPrice")
    public ResponseEntity<ApiResponse<PageResponse<ProductDto>>> getPublicProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID brandId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {

        PageResponse<ProductDto> products = catalogService.getPublicProducts(q, categoryId, brandId, minPrice, maxPrice, pageable);
        return ResponseEntity.ok(ApiResponse.success(products));
    }


    @GetMapping("/products/{slug}")
    @Operation(summary = "Get product by slug", description = "Fetch product details by unique slug")
    public ResponseEntity<ApiResponse<ProductDto>> getProductBySlug(@PathVariable String slug) {
        ProductDto product = catalogService.getPublicProductBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @GetMapping("/search/suggestions")
    @Operation(summary = "Get search suggestions", description = "Autocomplete suggestions for products/brands/categories")
    public ResponseEntity<ApiResponse<List<String>>> getSearchSuggestions(@RequestParam String q) {
        List<String> suggestions = catalogService.getSearchSuggestions(q);
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

@GetMapping("/home")
    @Operation(summary = "Get home page data", description = "Fetch banners, trending, and top-rated products")
    public ResponseEntity<ApiResponse<java.util.Map<String, Object>>> getHomeData() {
        java.util.Map<String, Object> data = catalogService.getHomeData();
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
