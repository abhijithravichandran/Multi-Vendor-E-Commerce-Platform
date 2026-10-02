package com.ecommerce.marketplace.delivery.port;

import org.springframework.stereotype.Component;
import java.util.UUID;

@Component
public class ActiveTaskQueryPortStub implements ActiveTaskQueryPort {
    @Override
    public int countActiveTasks(UUID partnerId) {
        return 0; // Stub for Phase 1
    }
}
