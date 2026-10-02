package com.ecommerce.marketplace.seller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SellerProfileRequest {
    @NotBlank(message = "Store name is required")
    private String storeName;
    private String description;
    private String logo;
    private String banner;
    private Object policies;
}
