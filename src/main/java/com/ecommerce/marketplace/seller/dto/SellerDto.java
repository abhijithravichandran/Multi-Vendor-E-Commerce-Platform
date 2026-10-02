package com.ecommerce.marketplace.seller.dto;

import com.ecommerce.marketplace.seller.entity.KycStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDto {
    private UUID id;
    private UUID userId;
    private String storeName;
    private String storeSlug;
    private String logo;
    private String banner;
    private String description;
    private String gstin;
    private String pan;
    private BankAccountDto bankAccount;
    private PickupAddressDto pickupAddress;
    private KycStatus kycStatus;
    private String kycRemarks;
    private boolean holidayMode;
    private BigDecimal rating;
    private int followerCount;
    private List<SellerDocumentDto> documents;
    private Instant createdAt;
}
