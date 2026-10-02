package com.ecommerce.marketplace.integration;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DefaultOrderQueryPort implements OrderQueryPort {

    @Override
    public boolean hasPurchased(UUID customerId, UUID productId) {
        // Phase 1 fallback: returns false until Phase 2 Orders module is linked
        return false;
    }

    @Override
    public int countOpenOrdersForSeller(UUID sellerId) {
        // Phase 1 fallback: returns 0 until Phase 2 Orders module is linked
        return 0;
    }
}
