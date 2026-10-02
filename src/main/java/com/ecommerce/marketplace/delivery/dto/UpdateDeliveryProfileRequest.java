package com.ecommerce.marketplace.delivery.dto;

import com.ecommerce.marketplace.seller.dto.BankAccountDto;
import lombok.Data;

@Data
public class UpdateDeliveryProfileRequest {
    private com.ecommerce.marketplace.delivery.entity.VehicleType vehicleType;
    private String vehicleNumber;
    private BankAccountDto bankAccount;
    private String availabilitySchedule;
}
