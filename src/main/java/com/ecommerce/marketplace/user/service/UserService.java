package com.ecommerce.marketplace.user.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.user.dto.ChangePasswordRequest;
import com.ecommerce.marketplace.user.dto.UpdateProfileRequest;
import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.mapper.UserMapper;
import com.ecommerce.marketplace.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    @Transactional
    public UserProfileDto updateProfile(UUID userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getPhone() != null && !request.getPhone().equals(user.getPhone())) {
            if (userRepository.existsByPhone(request.getPhone())) {
                throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Phone is already registered");
            }
            user.setPhone(request.getPhone());
            user.setPhoneVerified(false);
        }

        user = userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Transactional
    public void changePassword(UUID userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new ApiException(ErrorCode.BAD_CREDENTIALS, "Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        if (user.getRole() == com.ecommerce.marketplace.user.entity.Role.DELIVERY && user.getStatus() == com.ecommerce.marketplace.user.entity.UserStatus.PENDING) {
            user.setStatus(com.ecommerce.marketplace.user.entity.UserStatus.ACTIVE);
        }
        userRepository.save(user);
    }
}
