package com.ecommerce.marketplace.delivery.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SosRequest {
    @NotNull
    private Double lat;
    @NotNull
    private Double lng;
}
