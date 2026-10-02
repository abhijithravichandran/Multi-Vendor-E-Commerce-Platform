package com.ecommerce.marketplace.seller.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KycGateTest {

    @Mock
    private SellerRepository sellerRepository;

    @InjectMocks
    private KycGate kycGate;

    private UUID userId;
    private Seller seller;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        seller = Seller.builder().userId(userId).build();
        seller.setId(UUID.randomUUID());
    }

    @Test
    void checkKycApproved_Approved_Success() {
        seller.setKycStatus(KycStatus.APPROVED);
        when(sellerRepository.findByUserId(userId)).thenReturn(Optional.of(seller));

        assertDoesNotThrow(() -> kycGate.checkKycApproved(userId));
    }

    @Test
    void checkKycApproved_NotSubmitted_ThrowsException() {
        seller.setKycStatus(KycStatus.NOT_SUBMITTED);
        when(sellerRepository.findByUserId(userId)).thenReturn(Optional.of(seller));

        ApiException ex = assertThrows(ApiException.class, () -> kycGate.checkKycApproved(userId));
        assertEquals(ErrorCode.SELLER_NOT_APPROVED, ex.getErrorCode());
    }

    @Test
    void checkKycApproved_Pending_ThrowsException() {
        seller.setKycStatus(KycStatus.PENDING);
        when(sellerRepository.findByUserId(userId)).thenReturn(Optional.of(seller));

        ApiException ex = assertThrows(ApiException.class, () -> kycGate.checkKycApproved(userId));
        assertEquals(ErrorCode.SELLER_NOT_APPROVED, ex.getErrorCode());
    }

    @Test
    void checkKycApproved_Rejected_ThrowsException() {
        seller.setKycStatus(KycStatus.REJECTED);
        when(sellerRepository.findByUserId(userId)).thenReturn(Optional.of(seller));

        ApiException ex = assertThrows(ApiException.class, () -> kycGate.checkKycApproved(userId));
        assertEquals(ErrorCode.SELLER_NOT_APPROVED, ex.getErrorCode());
    }

    @Test
    void checkKycApproved_SellerNotFound_ThrowsException() {
        when(sellerRepository.findByUserId(userId)).thenReturn(Optional.empty());

        ApiException ex = assertThrows(ApiException.class, () -> kycGate.checkKycApproved(userId));
        assertEquals(ErrorCode.SELLER_NOT_FOUND, ex.getErrorCode());
    }
}
