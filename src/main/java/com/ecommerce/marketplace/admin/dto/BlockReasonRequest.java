package com.ecommerce.marketplace.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlockReasonRequest {
    @NotBlank(message = "Reason is required")
    private String reason;
}
