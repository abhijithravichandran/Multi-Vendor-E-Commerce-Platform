package com.ecommerce.marketplace.auth.service;

import com.ecommerce.marketplace.auth.dto.AuthResponse;
import com.ecommerce.marketplace.auth.dto.LoginRequest;
import com.ecommerce.marketplace.auth.dto.OtpRequest;
import com.ecommerce.marketplace.auth.dto.OtpVerifyRequest;
import com.ecommerce.marketplace.auth.dto.RefreshTokenRequest;
import com.ecommerce.marketplace.auth.dto.RegisterCustomerRequest;
import com.ecommerce.marketplace.auth.dto.RegisterSellerRequest;
import com.ecommerce.marketplace.auth.entity.RefreshToken;
import com.ecommerce.marketplace.auth.repository.RefreshTokenRepository;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.security.JwtService;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.mapper.UserMapper;
import com.ecommerce.marketplace.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final OtpService otpService;

    @Transactional
    public AuthResponse registerCustomer(RegisterCustomerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Email is already registered");
        }
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Phone is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .status(UserStatus.ACTIVE)
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        user = userRepository.save(user);
        return createAuthResponse(user, "Registration device");
    }

    @Transactional
    public AuthResponse registerSeller(RegisterSellerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Email is already registered");
        }
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Phone is already registered");
        }
        if (sellerRepository.existsByStoreSlug(request.getStoreSlug())) {
            throw new ApiException(ErrorCode.SELLER_SLUG_EXISTS, "Store slug is already taken");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.SELLER)
                .status(UserStatus.ACTIVE)
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        user = userRepository.save(user);

        Seller seller = Seller.builder()
                .userId(user.getId())
                .storeName(request.getStoreName())
                .storeSlug(request.getStoreSlug())
                .kycStatus(KycStatus.NOT_SUBMITTED)
                .build();

        sellerRepository.save(seller);

        return createAuthResponse(user, "Seller registration device");
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_CREDENTIALS));

        if (user.getDeletedAt() != null || user.getStatus() == UserStatus.BLOCKED) {
            throw new ApiException(ErrorCode.FORBIDDEN, "Account is blocked or deactivated");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ApiException(ErrorCode.BAD_CREDENTIALS);
        }

        user.setLastLoginAt(Instant.now());
        userRepository.save(user);

        return createAuthResponse(user, "Login device");
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String tokenHash = jwtService.hashToken(request.getRefreshToken());
        RefreshToken token = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_TOKEN, "Invalid refresh token"));

        if (token.getRevokedAt() != null) {
            // Revoke all tokens for this user due to potential token theft
            refreshTokenRepository.findByUserIdAndRevokedAtIsNull(token.getUserId())
                    .forEach(t -> t.setRevokedAt(Instant.now()));
            throw new ApiException(ErrorCode.INVALID_TOKEN, "Refresh token was revoked due to reuse detection");
        }

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new ApiException(ErrorCode.INVALID_TOKEN, "Refresh token expired");
        }

        // Revoke the old token (rotation)
        token.setRevokedAt(Instant.now());
        refreshTokenRepository.save(token);

        User user = userRepository.findById(token.getUserId())
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        return createAuthResponse(user, token.getDeviceInfo());
    }

    public void sendOtp(OtpRequest request) {
        otpService.sendOtp(request.getPhone());
    }

    @Transactional
    public AuthResponse verifyOtp(OtpVerifyRequest request) {
        boolean verified = otpService.verifyOtp(request.getPhone(), request.getCode());
        if (!verified) {
            throw new ApiException(ErrorCode.INVALID_INPUT, "Invalid OTP code");
        }

        Optional<User> optionalUser = userRepository.findByPhone(request.getPhone());
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            // Auto register customer with OTP if phone not found
            user = User.builder()
                    .name("User-" + request.getPhone().substring(Math.max(0, request.getPhone().length() - 4)))
                    .email(request.getPhone() + "@placeholder.com")
                    .phone(request.getPhone())
                    .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(Role.CUSTOMER)
                    .status(UserStatus.ACTIVE)
                    .phoneVerified(true)
                    .build();
            user = userRepository.save(user);
        }

        user.setPhoneVerified(true);
        user.setLastLoginAt(Instant.now());
        userRepository.save(user);

        return createAuthResponse(user, "OTP login device");
    }

    @Transactional
    public void logout(UUID userId) {
        refreshTokenRepository.findByUserIdAndRevokedAtIsNull(userId)
                .forEach(t -> t.setRevokedAt(Instant.now()));
    }

    private AuthResponse createAuthResponse(User user, String deviceInfo) {
        String adminRoleStr = user.getAdminRole() != null ? user.getAdminRole().name() : null;
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name(), adminRoleStr);

        String rawRefreshToken = jwtService.generateRawRefreshToken();
        String hashedRefreshToken = jwtService.hashToken(rawRefreshToken);

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .userId(user.getId())
                .tokenHash(hashedRefreshToken)
                .expiresAt(Instant.now().plusMillis(jwtService.getRefreshTokenExpirationMs()))
                .deviceInfo(deviceInfo)
                .build();

        refreshTokenRepository.save(refreshTokenEntity);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(rawRefreshToken)
                .user(userMapper.toDto(user))
                .mustChangePassword(user.getRole() == com.ecommerce.marketplace.user.entity.Role.DELIVERY && user.getStatus() == com.ecommerce.marketplace.user.entity.UserStatus.PENDING)
                .build();
    }
}
