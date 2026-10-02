package com.ecommerce.marketplace.delivery.repository;

import com.ecommerce.marketplace.delivery.entity.DeliveryPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface DeliveryPartnerRepository extends JpaRepository<DeliveryPartner, UUID> {
}
