package com.ecommerce.marketplace.cart.controller;

import com.ecommerce.marketplace.cart.dto.AddToCartRequest;
import com.ecommerce.marketplace.cart.dto.ApplyCouponRequest;
import com.ecommerce.marketplace.cart.dto.PricedCartDto;
import com.ecommerce.marketplace.cart.dto.UpdateCartItemRequest;
import com.ecommerce.marketplace.cart.service.CartService;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/cart")
@RequiredArgsConstructor
@Tag(name = "Customer Cart", description = "Customer shopping cart endpoints with live pricing and coupon calculations")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @Operation(summary = "Get priced cart", description = "Fetch fully computed cart snapshot grouped by seller with tax and shipping estimates")
    public ResponseEntity<ApiResponse<PricedCartDto>> getCart(@CurrentUser UserPrincipal principal) {
        PricedCartDto cart = cartService.getPricedCart(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    @Operation(summary = "Add item to cart", description = "Add a product variant to customer cart")
    public ResponseEntity<ApiResponse<PricedCartDto>> addItem(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody AddToCartRequest request) {
        PricedCartDto cart = cartService.addItem(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(cart, "Item added to cart"));
    }

    @PutMapping("/items/{itemId}")
    @Operation(summary = "Update cart item", description = "Update item quantity or toggle saved for later")
    public ResponseEntity<ApiResponse<PricedCartDto>> updateItem(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID itemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        PricedCartDto cart = cartService.updateItem(principal.getId(), itemId, request);
        return ResponseEntity.ok(ApiResponse.success(cart, "Cart item updated"));
    }

    @DeleteMapping("/items/{itemId}")
    @Operation(summary = "Remove cart item", description = "Remove an item from customer cart")
    public ResponseEntity<ApiResponse<PricedCartDto>> removeItem(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID itemId) {
        PricedCartDto cart = cartService.removeItem(principal.getId(), itemId);
        return ResponseEntity.ok(ApiResponse.success(cart, "Item removed from cart"));
    }


    @PostMapping("/items/{itemId}/save-for-later")
    @Operation(summary = "Save item for later", description = "Move a cart item to saved for later list")
    public ResponseEntity<ApiResponse<PricedCartDto>> saveForLater(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID itemId) {
        UpdateCartItemRequest req = new UpdateCartItemRequest();
        req.setSavedForLater(true);
        PricedCartDto cart = cartService.updateItem(principal.getId(), itemId, req);
        return ResponseEntity.ok(ApiResponse.success(cart, "Item saved for later"));
    }
    @PostMapping("/coupon")
    @Operation(summary = "Apply coupon code", description = "Validate and apply coupon code to customer cart")
    public ResponseEntity<ApiResponse<PricedCartDto>> applyCoupon(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody ApplyCouponRequest request) {
        PricedCartDto cart = cartService.applyCoupon(principal.getId(), request.getCouponCode());
        return ResponseEntity.ok(ApiResponse.success(cart, "Coupon applied successfully"));
    }

    @DeleteMapping("/coupon")
    @Operation(summary = "Remove coupon code", description = "Remove applied coupon code from customer cart")
    public ResponseEntity<ApiResponse<PricedCartDto>> removeCoupon(@CurrentUser UserPrincipal principal) {
        PricedCartDto cart = cartService.removeCoupon(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(cart, "Coupon removed"));
    }

    @DeleteMapping
    @Operation(summary = "Clear cart", description = "Remove all items from customer cart")
    public ResponseEntity<ApiResponse<String>> clearCart(@CurrentUser UserPrincipal principal) {
        cartService.clear(principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully"));
    }
}
