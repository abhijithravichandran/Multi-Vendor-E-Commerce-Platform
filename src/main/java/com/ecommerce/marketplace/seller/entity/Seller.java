package com.ecommerce.marketplace.seller.entity;

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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sellers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seller extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "store_name", nullable = false)
    private String storeName;

    @Column(name = "store_slug", nullable = false, unique = true)
    private String storeSlug;

    @Column(name = "logo")
    private String logo;

    @Column(name = "banner")
    private String banner;

    @Column(name = "description")
    private String description;

    @Column(name = "gstin")
    private String gstin;

    @Column(name = "pan")
    private String pan;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "bank_account_json")
    private String bankAccountJson;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "pickup_address_json")
    private String pickupAddressJson;

    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status", nullable = false)
    @Builder.Default
    private KycStatus kycStatus = KycStatus.NOT_SUBMITTED;

    @Column(name = "kyc_remarks")
    private String kycRemarks;

    @Column(name = "holiday_mode", nullable = false)
    @Builder.Default
    private boolean holidayMode = false;

    @Column(name = "rating")
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "follower_count", nullable = false)
    @Builder.Default
    private int followerCount = 0;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "policies_json")
    private String policiesJson;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Column(name = "commission_override_pct")
    private BigDecimal commissionOverridePct;
}
