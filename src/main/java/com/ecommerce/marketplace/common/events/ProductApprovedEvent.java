package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record ProductApprovedEvent(UUID productId, UUID sellerId, String productTitle) {}
