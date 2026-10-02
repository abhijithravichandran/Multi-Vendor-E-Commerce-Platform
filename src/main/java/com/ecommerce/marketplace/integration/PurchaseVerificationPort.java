package com.ecommerce.marketplace.integration;

import java.util.UUID;

public interface PurchaseVerificationPort {
    boolean isVerifiedPurchase(UUID customerId, UUID productId, UUID orderItemId);
}
