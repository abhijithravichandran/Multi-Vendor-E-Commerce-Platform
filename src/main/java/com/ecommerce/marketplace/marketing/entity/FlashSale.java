package com.ecommerce.marketplace.marketing.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flash_sales")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashSale extends BaseEntity {

    @Column(name = "variant_id", nullable = false)
    private UUID variantId;

    @Column(name = "flash_price", nullable = false)
    private BigDecimal flashPrice;

    @Column(name = "original_price")
    private BigDecimal originalPrice;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @Column(name = "active")
    @Builder.Default
    private boolean active = false;
}
