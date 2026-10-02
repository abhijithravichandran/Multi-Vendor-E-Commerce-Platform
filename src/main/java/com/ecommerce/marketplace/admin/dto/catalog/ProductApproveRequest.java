package com.ecommerce.marketplace.admin.dto.catalog;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductApproveRequest {
    @NotNull(message = "Policy checklist is mandatory")
    private Map<String, Boolean> policyChecklist;
}

