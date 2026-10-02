package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record DeliveryPartnerActivatedEvent(UUID deliveryPartnerId, UUID userId) {}
