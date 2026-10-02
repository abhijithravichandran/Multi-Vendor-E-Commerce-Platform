package com.ecommerce.marketplace.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDocumentDto {
    private UUID id;
    private UUID sellerId;
    private String type;
    private String fileUrl;
    private String status;
}
