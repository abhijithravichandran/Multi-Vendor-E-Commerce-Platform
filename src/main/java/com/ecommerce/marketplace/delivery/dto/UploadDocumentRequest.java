package com.ecommerce.marketplace.delivery.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UploadDocumentRequest {
    @NotBlank
    private String type;
    @NotBlank
    private String fileUrl;
    private LocalDate expiryDate;
}
