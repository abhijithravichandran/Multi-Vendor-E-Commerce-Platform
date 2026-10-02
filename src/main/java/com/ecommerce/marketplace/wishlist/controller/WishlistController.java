package com.ecommerce.marketplace.wishlist.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.wishlist.dto.WishlistDto;
import com.ecommerce.marketplace.wishlist.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/wishlist")
@RequiredArgsConstructor
@Tag(name = "Customer Wishlist", description = "Customer wishlist management endpoints")
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    @Operation(summary = "Get wishlist", description = "List saved wishlist items for logged in customer")
    public ResponseEntity<ApiResponse<List<WishlistDto>>> getWishlist(@CurrentUser UserPrincipal principal) {
        List<WishlistDto> wishlist = wishlistService.getWishlist(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(wishlist));
    }
    
    @PostMapping("/{productId}/move-to-cart")
    @Operation(summary = "Move to cart", description = "Move a wishlist item to cart")
    public ResponseEntity<ApiResponse<String>> moveToCart(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID productId,
            @RequestParam String variantSku) {
        wishlistService.moveToCart(principal.getId(), productId, variantSku);
        return ResponseEntity.ok(ApiResponse.success("Moved to cart"));
    }

    @PostMapping("/{productId}")
    @Operation(summary = "Add to wishlist", description = "Add a product to customer wishlist")
    public ResponseEntity<ApiResponse<WishlistDto>> addToWishlist(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID productId) {
        WishlistDto item = wishlistService.addToWishlist(principal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success(item, "Added to wishlist"));
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Remove from wishlist", description = "Remove a product from customer wishlist")
    public ResponseEntity<ApiResponse<String>> removeFromWishlist(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID productId) {
        wishlistService.removeFromWishlist(principal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist"));
    }
}
