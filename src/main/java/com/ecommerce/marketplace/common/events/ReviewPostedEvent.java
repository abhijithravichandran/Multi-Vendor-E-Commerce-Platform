package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record ReviewPostedEvent(UUID reviewId, UUID productId, UUID customerId, int rating) {}
