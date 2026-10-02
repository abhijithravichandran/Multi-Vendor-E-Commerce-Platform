package com.ecommerce.marketplace.support.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data public class CreateTicketRequest {
    @NotBlank private String subject;
    @NotBlank private String body;
    private String referenceType;
    private String referenceId;
}
