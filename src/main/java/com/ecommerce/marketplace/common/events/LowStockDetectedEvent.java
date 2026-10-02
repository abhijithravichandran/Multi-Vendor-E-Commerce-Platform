package com.ecommerce.marketplace.common.events;

import java.util.UUID;

public record LowStockDetectedEvent(UUID inventoryId, UUID sellerId, String variantSku, int qtyAvailable) {}
