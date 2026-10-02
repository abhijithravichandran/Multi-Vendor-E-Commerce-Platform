package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record SellerKycApprovedEvent(UUID sellerId, UUID userId) {}
