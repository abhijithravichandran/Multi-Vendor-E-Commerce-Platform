package com.ecommerce.marketplace.inventory.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Inventory extends BaseEntity {

    @Column(name = "product_id", nullable = false)
    private UUID productId;

    @Column(name = "variant_sku", nullable = false)
    private String variantSku;

    @Column(name = "seller_id", nullable = false)
    private UUID sellerId;

    @Column(name = "qty_available", nullable = false)
    @Builder.Default
    private int qtyAvailable = 0;

    @Column(name = "qty_reserved", nullable = false)
    @Builder.Default
    private int qtyReserved = 0;

    @Column(name = "low_stock_threshold", nullable = false)
    @Builder.Default
    private int lowStockThreshold = 5;

    @Column(name = "warehouse")
    private String warehouse;

    @Version
    @Column(name = "version", nullable = false)
    private Long version;
}
