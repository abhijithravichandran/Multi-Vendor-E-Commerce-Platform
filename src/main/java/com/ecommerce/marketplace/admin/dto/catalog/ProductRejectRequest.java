package com.ecommerce.marketplace.admin.dto.catalog;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRejectRequest {
    @NotBlank(message = "Remarks are mandatory when rejecting or requesting changes")
    private String remarks;
}

