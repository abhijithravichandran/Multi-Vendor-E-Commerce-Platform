package com.ecommerce.marketplace.seller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SellerBankRequest {
    @NotBlank(message = "Account holder name is required")
    private String holder;

    @NotBlank(message = "Account number is required")
    private String number;

    @NotBlank(message = "IFSC code is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Invalid IFSC format")
    private String ifsc;
}
