package com.ecommerce.marketplace.marketing.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BroadcastRequest {
    @NotBlank
    private String audience; // ALL_CUSTOMERS, ALL_SELLERS, ALL_DELIVERY
    @NotBlank
    private String title;
    @NotBlank
    private String body;
    private String priority;
    private String deepLink;
}
