package com.ecommerce.marketplace.auth.service;

public interface OtpService {
    void sendOtp(String phone);
    boolean verifyOtp(String phone, String code);
}
