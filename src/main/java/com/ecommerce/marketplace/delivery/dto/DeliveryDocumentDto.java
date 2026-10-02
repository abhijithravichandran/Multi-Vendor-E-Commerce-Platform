package com.ecommerce.marketplace.delivery.dto;

import com.ecommerce.marketplace.delivery.entity.DeliveryDocument;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class DeliveryDocumentDto {
    private UUID id;
    private String type;
    private String fileUrl;
    private DeliveryDocument.DocumentStatus status;
    private LocalDate expiryDate;
    private boolean expiringSoon;
}
