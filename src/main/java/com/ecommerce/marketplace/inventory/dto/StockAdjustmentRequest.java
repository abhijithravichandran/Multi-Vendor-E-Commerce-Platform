package com.ecommerce.marketplace.inventory.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockAdjustmentRequest {

    @Min(value = 0, message = "Available quantity cannot be negative")
    private int qtyAvailable;

    @NotBlank(message = "Reason for adjustment is required")
    private String reason;

    private String warehouse;

    private Integer lowStockThreshold;
}
