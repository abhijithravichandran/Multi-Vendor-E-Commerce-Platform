package com.ecommerce.marketplace.user.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.user.dto.ChangePasswordRequest;
import com.ecommerce.marketplace.user.dto.UpdateProfileRequest;
import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customer/profile")
@RequiredArgsConstructor
@Tag(name = "User Profile", description = "Customer profile management endpoints")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get user profile", description = "Fetch currently logged in user's profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> getProfile(@CurrentUser UserPrincipal principal) {
        UserProfileDto profile = userService.getProfile(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PutMapping
    @Operation(summary = "Update profile", description = "Update current user's profile details")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateProfile(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody UpdateProfileRequest request) {
        UserProfileDto profile = userService.updateProfile(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(profile, "Profile updated successfully"));
    }

    @PutMapping("/password")
    @Operation(summary = "Change password", description = "Update current user's password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
    }
}
