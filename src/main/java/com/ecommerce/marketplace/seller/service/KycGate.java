package com.ecommerce.marketplace.seller.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KycGate {

    private final SellerRepository sellerRepository;

    public void checkKycApproved(UUID userId) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        if (seller.getKycStatus() != KycStatus.APPROVED) {
            throw new ApiException(ErrorCode.SELLER_NOT_APPROVED, "Seller KYC is not approved");
        }
    }
}
