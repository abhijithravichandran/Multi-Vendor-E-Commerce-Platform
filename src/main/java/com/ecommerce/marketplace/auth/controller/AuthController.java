package com.ecommerce.marketplace.auth.controller;

import com.ecommerce.marketplace.auth.dto.AuthResponse;
import com.ecommerce.marketplace.auth.dto.LoginRequest;
import com.ecommerce.marketplace.auth.dto.OtpRequest;
import com.ecommerce.marketplace.auth.dto.OtpVerifyRequest;
import com.ecommerce.marketplace.auth.dto.RefreshTokenRequest;
import com.ecommerce.marketplace.auth.dto.RegisterCustomerRequest;
import com.ecommerce.marketplace.auth.dto.RegisterSellerRequest;
import com.ecommerce.marketplace.auth.service.AuthService;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for Customer/Seller registration, login, token refresh, OTP")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/customer")
    @Operation(summary = "Register customer", description = "Public self-registration for new customers")
    public ResponseEntity<ApiResponse<AuthResponse>> registerCustomer(@Valid @RequestBody RegisterCustomerRequest request) {
        AuthResponse response = authService.registerCustomer(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Customer registered successfully"));
    }

    @PostMapping("/register/seller")
    @Operation(summary = "Register seller", description = "Public self-registration for new sellers")
    public ResponseEntity<ApiResponse<AuthResponse>> registerSeller(@Valid @RequestBody RegisterSellerRequest request) {
        AuthResponse response = authService.registerSeller(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Seller registered successfully"));
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate via email and password")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh access token", description = "Rotate refresh token and issue new access token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed successfully"));
    }

    @PostMapping("/otp/send")
    @Operation(summary = "Send OTP", description = "Send 6-digit OTP code to mobile number")
    public ResponseEntity<ApiResponse<String>> sendOtp(@Valid @RequestBody OtpRequest request) {
        authService.sendOtp(request);
        return ResponseEntity.ok(ApiResponse.success("OTP sent successfully"));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verify OTP & Login", description = "Verify OTP and authenticate user")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        AuthResponse response = authService.verifyOtp(request);
        return ResponseEntity.ok(ApiResponse.success(response, "OTP verified successfully"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Revoke active refresh tokens for authenticated user")
    public ResponseEntity<ApiResponse<String>> logout(@CurrentUser UserPrincipal principal) {
        if (principal != null) {
            authService.logout(principal.getId());
        }
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }
}
