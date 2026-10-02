package com.ecommerce.marketplace.seller.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerKycRequest {

    @NotBlank(message = "GSTIN is required")
    private String gstin;

    @NotBlank(message = "PAN is required")
    private String pan;

    @NotNull(message = "Bank account details are required")
    @Valid
    private BankAccountDto bankAccount;

    @NotNull(message = "Pickup address details are required")
    @Valid
    private PickupAddressDto pickupAddress;

    private List<DocumentInput> documents;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentInput {
        @NotBlank(message = "Document type is required")
        private String type;

        @NotBlank(message = "Document file URL is required")
        private String fileUrl;
    }
}
