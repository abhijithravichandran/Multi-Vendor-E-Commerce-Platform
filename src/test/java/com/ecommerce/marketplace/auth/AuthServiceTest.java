package com.ecommerce.marketplace.auth;

import com.ecommerce.marketplace.auth.dto.AuthResponse;
import com.ecommerce.marketplace.auth.dto.LoginRequest;
import com.ecommerce.marketplace.auth.dto.RefreshTokenRequest;
import com.ecommerce.marketplace.auth.dto.RegisterCustomerRequest;
import com.ecommerce.marketplace.auth.entity.RefreshToken;
import com.ecommerce.marketplace.auth.repository.RefreshTokenRepository;
import com.ecommerce.marketplace.auth.service.AuthService;
import com.ecommerce.marketplace.auth.service.OtpService;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.security.JwtService;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.mapper.UserMapper;
import com.ecommerce.marketplace.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private SellerRepository sellerRepository;
    @Mock
    private RefreshTokenRepository refreshTokenRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private UserMapper userMapper;
    @Mock
    private OtpService otpService;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .name("John Customer")
                .email("john@example.com")
                .passwordHash("hashedPass")
                .role(Role.CUSTOMER)
                .status(UserStatus.ACTIVE)
                .build();
        sampleUser.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should successfully register customer")
    void registerCustomer_Success() {
        RegisterCustomerRequest req = new RegisterCustomerRequest("John Customer", "john@example.com", "+1900000001", "Password@123");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(false);
        when(userRepository.existsByPhone(req.getPhone())).thenReturn(false);
        when(passwordEncoder.encode(req.getPassword())).thenReturn("hashedPass");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(jwtService.generateAccessToken(any(), any(), any(), any())).thenReturn("access.token");
        when(jwtService.generateRawRefreshToken()).thenReturn("raw.refresh.token");
        when(jwtService.hashToken("raw.refresh.token")).thenReturn("hashed.refresh.token");
        when(jwtService.getRefreshTokenExpirationMs()).thenReturn(604800000L);
        when(userMapper.toDto(sampleUser)).thenReturn(new UserProfileDto());

        AuthResponse resp = authService.registerCustomer(req);

        assertNotNull(resp);
        assertEquals("access.token", resp.getAccessToken());
        assertEquals("raw.refresh.token", resp.getRefreshToken());
        verify(userRepository).save(any(User.class));
        verify(refreshTokenRepository).save(any(RefreshToken.class));
    }

    @Test
    @DisplayName("Should throw USER_ALREADY_EXISTS when email is duplicate during registration")
    void registerCustomer_DuplicateEmail() {
        RegisterCustomerRequest req = new RegisterCustomerRequest("John Customer", "john@example.com", "+1900000001", "Password@123");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(true);

        ApiException ex = assertThrows(ApiException.class, () -> authService.registerCustomer(req));
        assertEquals(ErrorCode.USER_ALREADY_EXISTS, ex.getErrorCode());
    }

    @Test
    @DisplayName("Should successfully authenticate user with valid credentials")
    void login_Success() {
        LoginRequest req = new LoginRequest("john@example.com", "Password@123");

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches(req.getPassword(), sampleUser.getPasswordHash())).thenReturn(true);
        when(jwtService.generateAccessToken(any(), any(), any(), any())).thenReturn("access.token");
        when(jwtService.generateRawRefreshToken()).thenReturn("raw.refresh.token");
        when(jwtService.hashToken("raw.refresh.token")).thenReturn("hashed.refresh.token");
        when(jwtService.getRefreshTokenExpirationMs()).thenReturn(604800000L);

        AuthResponse resp = authService.login(req);

        assertNotNull(resp);
        assertEquals("access.token", resp.getAccessToken());
        verify(userRepository).save(sampleUser);
    }

    @Test
    @DisplayName("Should throw BAD_CREDENTIALS for wrong password")
    void login_WrongPassword() {
        LoginRequest req = new LoginRequest("john@example.com", "WrongPass");

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches(req.getPassword(), sampleUser.getPasswordHash())).thenReturn(false);

        ApiException ex = assertThrows(ApiException.class, () -> authService.login(req));
        assertEquals(ErrorCode.BAD_CREDENTIALS, ex.getErrorCode());
    }

    @Test
    @DisplayName("Should rotate refresh token on valid token refresh request")
    void refreshToken_Success() {
        RefreshTokenRequest req = new RefreshTokenRequest("valid.raw.token");
        String hash = "hashed.token";

        RefreshToken token = RefreshToken.builder()
                .userId(sampleUser.getId())
                .tokenHash(hash)
                .expiresAt(Instant.now().plusSeconds(3600))
                .build();

        when(jwtService.hashToken("valid.raw.token")).thenReturn(hash);
        when(refreshTokenRepository.findByTokenHash(hash)).thenReturn(Optional.of(token));
        when(userRepository.findById(sampleUser.getId())).thenReturn(Optional.of(sampleUser));
        when(jwtService.generateAccessToken(any(), any(), any(), any())).thenReturn("new.access.token");
        when(jwtService.generateRawRefreshToken()).thenReturn("new.raw.refresh.token");
        when(jwtService.hashToken("new.raw.refresh.token")).thenReturn("new.hashed.refresh.token");

        AuthResponse resp = authService.refreshToken(req);

        assertNotNull(resp);
        assertNotNull(token.getRevokedAt()); // verified old token revoked
        verify(refreshTokenRepository, times(2)).save(any(RefreshToken.class));
    }
}
