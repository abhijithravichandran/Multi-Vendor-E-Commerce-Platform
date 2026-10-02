package com.ecommerce.marketplace.admin.dto;

import com.ecommerce.marketplace.address.dto.AddressDto;
import com.ecommerce.marketplace.user.dto.UserProfileDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdminCustomerDetailDto {
    private UserProfileDto profile;
    private List<AddressDto> addresses;
    @Builder.Default
    private int wishlistCount = 0; // Phase 1/2
    @Builder.Default
    private int reviewCount = 0; // Phase 1
    @Builder.Default
    private int orderCount = 0; // Phase 2
}
