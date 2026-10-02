package com.ecommerce.marketplace.delivery.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "delivery_documents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDocument extends BaseEntity {

    @Column(name = "partner_id", nullable = false)
    private UUID partnerId;

    @Column(name = "type", nullable = false)
    private String type; // e.g. DRIVING_LICENSE, RC_BOOK, AADHAAR

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private DocumentStatus status = DocumentStatus.UPLOADED;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    public enum DocumentStatus {
        UPLOADED, VERIFIED, REJECTED
    }
}
