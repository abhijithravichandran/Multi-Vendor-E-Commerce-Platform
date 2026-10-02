package com.ecommerce.marketplace.integration;

import java.util.UUID;

public interface OrderQueryPort {
    boolean hasPurchased(UUID customerId, UUID productId);
    int countOpenOrdersForSeller(UUID sellerId);
}
