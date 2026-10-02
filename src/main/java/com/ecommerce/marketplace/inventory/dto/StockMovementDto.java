package com.ecommerce.marketplace.inventory.dto;

import com.ecommerce.marketplace.inventory.entity.StockMovementType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockMovementDto {
    private UUID id;
    private UUID inventoryId;
    private int delta;
    private String reason;
    private StockMovementType type;
    private String referenceType;
    private String referenceId;
    private UUID actorId;
    private Instant createdAt;
}
