package com.ecommerce.marketplace.seller.dto;

import com.ecommerce.marketplace.seller.entity.KycStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerKycReviewRequest {

    @NotNull(message = "KYC status decision is required (APPROVED or REJECTED)")
    private KycStatus status;

    private String remarks;
}
