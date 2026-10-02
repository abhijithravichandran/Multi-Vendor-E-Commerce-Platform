package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.admin.entity.Permission;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin/me")
@Tag(name = "Admin Me", description = "Endpoints for the currently logged in admin")
public class AdminMeController {

    @GetMapping("/permissions")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get admin permissions", description = "Returns a list of permissions based on the admin's sub-role")
    public ResponseEntity<ApiResponse<Set<Permission>>> getMyPermissions(@CurrentUser UserPrincipal principal) {
        Set<Permission> permissions = Collections.emptySet();
        if (principal.getAdminRole() != null) {
            permissions = principal.getAdminRole().getPermissions();
        }
        return ResponseEntity.ok(ApiResponse.success(permissions, "Permissions retrieved"));
    }
}
