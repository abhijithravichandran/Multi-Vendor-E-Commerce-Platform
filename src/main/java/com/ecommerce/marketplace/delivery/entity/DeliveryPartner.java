package com.ecommerce.marketplace.delivery.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;
import java.math.BigDecimal;

@Entity
@Table(name = "delivery_partners")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryPartner extends BaseEntity {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "vehicle_type")
    @jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
    private VehicleType vehicleType;

    @jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
    @Builder.Default
    @Column(name = "status")
    private DeliveryPartnerStatus status = DeliveryPartnerStatus.PENDING;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "bank_account_json")
    private String bankAccountJson;

    @ElementCollection
    @CollectionTable(name = "delivery_partner_pincodes", joinColumns = @JoinColumn(name = "partner_id"))
    @Column(name = "pincode")
    private Set<String> servicePincodes;

    @Column(name = "availability_schedule")
    private String availabilitySchedule;

    @Column(name = "is_online", nullable = false)
    @Builder.Default
    private boolean isOnline = false;

    @Column(name = "current_lat")
    private Double currentLat;

    @Column(name = "current_lng")
    private Double currentLng;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Column(name = "rating")
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;
}
