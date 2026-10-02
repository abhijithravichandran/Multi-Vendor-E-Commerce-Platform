package com.ecommerce.marketplace.auth.dto;

import com.ecommerce.marketplace.user.dto.UserProfileDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private UserProfileDto user;
    private boolean mustChangePassword;
}
