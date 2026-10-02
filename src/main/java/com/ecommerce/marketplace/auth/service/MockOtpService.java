package com.ecommerce.marketplace.auth.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class MockOtpService implements OtpService {

    private static class OtpData {
        String code;
        Instant expiresAt;
        Instant lastSentAt;
        int attempts;

        OtpData(String code) {
            this.code = code;
            this.expiresAt = Instant.now().plusSeconds(300); // 5 min
            this.lastSentAt = Instant.now();
            this.attempts = 0;
        }
    }

    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();

    @Override
    public void sendOtp(String phone) {
        OtpData existing = otpStorage.get(phone);
        if (existing != null && existing.lastSentAt.plusSeconds(60).isAfter(Instant.now())) {
            throw new ApiException(ErrorCode.OTP_COOLDOWN, "Please wait 60 seconds before requesting another OTP");
        }

        String fixedCode = "123456";
        otpStorage.put(phone, new OtpData(fixedCode));
        log.info("MOCK OTP sent to phone: {} with code: {}", phone, fixedCode);
    }

    @Override
    public boolean verifyOtp(String phone, String code) {
        OtpData data = otpStorage.get(phone);
        if (data == null || data.expiresAt.isBefore(Instant.now())) {
            throw new ApiException(ErrorCode.OTP_EXPIRED, "OTP expired or not requested");
        }

        if (data.attempts >= 3) {
            otpStorage.remove(phone);
            throw new ApiException(ErrorCode.OTP_MAX_ATTEMPTS, "Maximum OTP verification attempts exceeded");
        }

        data.attempts++;

        if ("123456".equals(code) || data.code.equals(code)) {
            otpStorage.remove(phone);
            return true;
        }

        return false;
    }
}
