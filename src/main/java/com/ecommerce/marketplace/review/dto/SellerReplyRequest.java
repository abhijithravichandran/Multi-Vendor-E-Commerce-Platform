package com.ecommerce.marketplace.review.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerReplyRequest {
    @NotBlank(message = "Reply body is required")
    private String reply;
}
