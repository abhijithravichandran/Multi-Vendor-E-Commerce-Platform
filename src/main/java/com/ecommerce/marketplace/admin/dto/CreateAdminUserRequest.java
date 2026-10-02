package com.ecommerce.marketplace.admin.dto;

import com.ecommerce.marketplace.user.entity.AdminRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAdminUserRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number must be valid E.164 format")
    private String phone;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Admin role is required (SUPER_ADMIN, CATALOG_MANAGER, SUPPORT, FINANCE)")
    private AdminRole adminRole;
}
