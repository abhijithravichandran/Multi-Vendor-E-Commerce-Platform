package com.ecommerce.marketplace.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddToCartRequest {

    @NotNull(message = "Product ID is required")
    private UUID productId;

    @NotBlank(message = "Variant SKU is required")
    private String variantSku;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int qty = 1;
}
