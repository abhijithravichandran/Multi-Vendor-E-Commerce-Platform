package com.ecommerce.marketplace.address.dto;

import com.ecommerce.marketplace.address.entity.AddressLabel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    private UUID id;
    private UUID userId;
    private AddressLabel label;
    private String name;
    private String phone;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String pincode;
    private boolean isDefault;
    private Instant createdAt;
}
