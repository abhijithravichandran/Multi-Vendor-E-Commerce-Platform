package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record ProductRejectedEvent(UUID productId, UUID sellerId, String productTitle, String remarks) {}
