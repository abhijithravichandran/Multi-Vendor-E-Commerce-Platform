package com.ecommerce.marketplace.delivery.dto;

import com.ecommerce.marketplace.seller.dto.BankAccountDto;
import lombok.Data;
import java.util.Set;
import java.util.UUID;
import java.math.BigDecimal;

@Data
public class DeliveryPartnerDto {
    private UUID userId;
    private com.ecommerce.marketplace.delivery.entity.VehicleType vehicleType;
    private com.ecommerce.marketplace.delivery.entity.DeliveryPartnerStatus status;
    private String licenseNumber;
    private String vehicleNumber;
    private BankAccountDto bankAccount;
    private Set<String> servicePincodes;
    private String availabilitySchedule;
    private boolean isOnline;
    private BigDecimal rating;
}
