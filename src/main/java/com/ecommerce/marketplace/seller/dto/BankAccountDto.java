package com.ecommerce.marketplace.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccountDto {
    private String holder;
    private String number;
    private String ifsc;
    private String maskedNumber;

    public String getMaskedNumber() {
        if (maskedNumber != null) return maskedNumber;
        if (number != null && number.length() > 4) {
            return "XXXX-XXXX-" + number.substring(number.length() - 4);
        }
        return "XXXX-XXXX";
    }
}
