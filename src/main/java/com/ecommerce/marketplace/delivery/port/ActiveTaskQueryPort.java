package com.ecommerce.marketplace.delivery.port;

import java.util.UUID;

public interface ActiveTaskQueryPort {
    int countActiveTasks(UUID partnerId);
}
