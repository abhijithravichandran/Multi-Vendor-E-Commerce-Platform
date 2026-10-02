package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.admin.dto.CreateAdminUserRequest;
import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.mapper.UserMapper;
import com.ecommerce.marketplace.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
@Tag(name = "Admin User Management", description = "Admin endpoints for user administration and account status control")
public class AdminUserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "List all platform users", description = "List registered users across all roles")
    public ResponseEntity<ApiResponse<PageResponse<UserProfileDto>>> getAllUsers(@PageableDefault(size = 20) Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(page.map(userMapper::toDto))));
    }

    @PostMapping
    @Audited(action = "CREATE_ADMIN_USER", entityType = "User")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Create admin user", description = "Create a new admin account with specific sub-role")
    public ResponseEntity<ApiResponse<UserProfileDto>> createAdminUser(@Valid @RequestBody CreateAdminUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .adminRole(request.getAdminRole())
                .status(UserStatus.ACTIVE)
                .emailVerified(true)
                .phoneVerified(true)
                .build();

        user = userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success(userMapper.toDto(user), "Admin user created successfully"));
    }

    @PutMapping("/{id}/status")
    @Audited(action = "UPDATE_USER_STATUS", entityType = "User")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update user status", description = "Block or activate a user account")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateUserStatus(
            @PathVariable UUID id,
            @RequestParam UserStatus status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        user.setStatus(status);
        user = userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.success(userMapper.toDto(user), "User status updated"));
    }
}
