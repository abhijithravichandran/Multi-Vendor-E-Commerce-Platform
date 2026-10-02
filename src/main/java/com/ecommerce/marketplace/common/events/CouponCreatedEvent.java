package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record CouponCreatedEvent(UUID couponId, String code, String scope) {}
