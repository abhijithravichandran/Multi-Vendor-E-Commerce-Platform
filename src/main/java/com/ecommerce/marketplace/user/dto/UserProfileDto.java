package com.ecommerce.marketplace.user.dto;

import com.ecommerce.marketplace.user.entity.AdminRole;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private AdminRole adminRole;
    private String avatar;
    private UserStatus status;
    private boolean mustChangePassword;
    private boolean emailVerified;
    private boolean phoneVerified;
    private Instant lastLoginAt;
    private Instant createdAt;
}
