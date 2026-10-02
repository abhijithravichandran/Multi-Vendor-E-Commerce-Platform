package com.ecommerce.marketplace.auth;

import com.ecommerce.marketplace.auth.controller.AuthController;
import com.ecommerce.marketplace.auth.dto.*;
import com.ecommerce.marketplace.auth.service.AuthService;
import com.ecommerce.marketplace.config.SecurityConfig;
import com.ecommerce.marketplace.security.JwtAuthFilter;
import com.ecommerce.marketplace.security.JwtService;
import com.ecommerce.marketplace.security.SecurityTestUtils;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import({SecurityConfig.class, JwtAuthFilter.class})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void registerCustomer_ValidRequest_ReturnsSuccess() throws Exception {
        RegisterCustomerRequest request = new RegisterCustomerRequest("John Doe", "john@example.com", null, "Password123");
        AuthResponse response = new AuthResponse("access", "refresh", null, false);

        when(authService.registerCustomer(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/register/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").value("access"));
    }

    @Test
    void registerCustomer_InvalidRequest_Returns400() throws Exception {
        RegisterCustomerRequest request = new RegisterCustomerRequest("", "invalid-email", null, "short");

        mockMvc.perform(post("/api/v1/auth/register/customer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void login_ValidCredentials_ReturnsTokens() throws Exception {
        LoginRequest request = new LoginRequest("john@example.com", "Password123");
        AuthResponse response = new AuthResponse("access", "refresh", null, false);

        when(authService.login(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").value("access"));
    }

    @Test
    void refreshToken_ValidToken_ReturnsNewTokens() throws Exception {
        RefreshTokenRequest request = new RefreshTokenRequest("old-refresh-token");
        AuthResponse response = new AuthResponse("new-access", "new-refresh", null, false);

        when(authService.refreshToken(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/refresh-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").value("new-access"));
    }

    @Test
    void logout_AuthenticatedUser_CallsService() throws Exception {
        UUID userId = UUID.randomUUID();

        mockMvc.perform(post("/api/v1/auth/logout")
                .with(SecurityTestUtils.mockUser(userId, "john@example.com", Role.CUSTOMER)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        verify(authService).logout(userId);
    }
}
