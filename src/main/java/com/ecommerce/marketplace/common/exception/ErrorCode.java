package com.ecommerce.marketplace.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Auth & User Errors
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Authentication credentials were not provided or are invalid"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "Access denied"),
    BAD_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid email or password"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "User already exists with this email or phone"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid or expired token"),
    OTP_EXPIRED(HttpStatus.BAD_REQUEST, "OTP has expired or is invalid"),
    OTP_MAX_ATTEMPTS(HttpStatus.TOO_MANY_REQUESTS, "Maximum OTP verification attempts exceeded"),
    OTP_COOLDOWN(HttpStatus.TOO_MANY_REQUESTS, "Please wait before requesting another OTP"),
    RATE_LIMIT_EXCEEDED(HttpStatus.TOO_MANY_REQUESTS, "Rate limit exceeded"),

    // Seller Errors
    SELLER_NOT_FOUND(HttpStatus.NOT_FOUND, "Seller profile not found"),
    SELLER_SLUG_EXISTS(HttpStatus.CONFLICT, "Store slug is already taken"),
    SELLER_NOT_APPROVED(HttpStatus.FORBIDDEN, "Seller account is not approved"),

    // Delivery Partner Errors
    DELIVERY_PARTNER_NOT_FOUND(HttpStatus.NOT_FOUND, "Delivery partner not found"),

    // Catalog Errors
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Category not found"),
    BRAND_NOT_FOUND(HttpStatus.NOT_FOUND, "Brand not found"),
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product not found"),
    VARIANT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product variant not found"),
    SKU_ALREADY_EXISTS(HttpStatus.CONFLICT, "Product variant SKU already exists"),
    SLUG_ALREADY_EXISTS(HttpStatus.CONFLICT, "Slug already exists"),

    // Inventory Errors
    INVENTORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Inventory item not found"),
    INSUFFICIENT_STOCK(HttpStatus.BAD_REQUEST, "Insufficient stock available"),

    // Cart & Wishlist Errors
    CART_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart not found"),
    CART_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart item not found"),

    // Coupon Errors
    COUPON_NOT_FOUND(HttpStatus.NOT_FOUND, "Coupon not found"),
    COUPON_INVALID(HttpStatus.BAD_REQUEST, "Coupon is invalid or expired"),
    COUPON_USAGE_LIMIT(HttpStatus.BAD_REQUEST, "Coupon usage limit reached"),

    // Review Errors
    REVIEW_NOT_FOUND(HttpStatus.NOT_FOUND, "Review not found"),
    REVIEW_ALREADY_EXISTS(HttpStatus.CONFLICT, "You have already reviewed this product"),

    // Notification & Marketing Errors
    NOTIFICATION_NOT_FOUND(HttpStatus.NOT_FOUND, "Notification not found"),
    BANNER_NOT_FOUND(HttpStatus.NOT_FOUND, "Banner not found"),
    TICKET_NOT_FOUND(HttpStatus.NOT_FOUND, "Support ticket not found"),

    // Common & Generic Errors
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "Invalid input data"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Requested resource not found"),
    OWNERSHIP_VIOLATION(HttpStatus.FORBIDDEN, "You do not own this resource"),
    CONCURRENCY_CONFLICT(HttpStatus.CONFLICT, "Resource was updated by another transaction. Please retry"),
    BUSINESS_RULE_VIOLATION(HttpStatus.BAD_REQUEST, "Business rule violation"),
    FILE_UPLOAD_ERROR(HttpStatus.BAD_REQUEST, "Failed to upload file"),
    FILE_TOO_LARGE(HttpStatus.PAYLOAD_TOO_LARGE, "File size exceeds maximum allowed limit"),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "Invalid file type"),
    NOT_IMPLEMENTED(HttpStatus.NOT_IMPLEMENTED, "Feature is not implemented in Phase 1"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");

    private final HttpStatus httpStatus;
    private final String defaultMessage;

    ErrorCode(HttpStatus httpStatus, String defaultMessage) {
        this.httpStatus = httpStatus;
        this.defaultMessage = defaultMessage;
    }
}
