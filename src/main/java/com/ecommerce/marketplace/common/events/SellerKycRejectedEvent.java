package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record SellerKycRejectedEvent(UUID sellerId, UUID userId, String remarks) {}
