package com.ecommerce.marketplace.integration;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DefaultPurchaseVerificationPort implements PurchaseVerificationPort {

    @Override
    public boolean isVerifiedPurchase(UUID customerId, UUID productId, UUID orderItemId) {
        // Default Phase 1 implementation always returns false until Phase 2 link
        return false;
    }
}
