package com.ecommerce.marketplace.delivery.repository;

import com.ecommerce.marketplace.delivery.entity.DeliveryDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DeliveryDocumentRepository extends JpaRepository<DeliveryDocument, UUID> {
    List<DeliveryDocument> findByPartnerId(UUID partnerId);
}
