package com.ecommerce.marketplace.support.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTicketMessageRequest {

    @NotBlank(message = "Message body is required")
    private String body;

    private Boolean internalNote;
}
