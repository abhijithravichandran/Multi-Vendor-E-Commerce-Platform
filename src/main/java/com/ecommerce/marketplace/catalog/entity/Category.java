package com.ecommerce.marketplace.catalog.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "parent_id")
    private UUID parentId;

    @Column(name = "icon")
    private String icon;

    @Column(name = "commission_pct")
    @Builder.Default
    private BigDecimal commissionPct = BigDecimal.ZERO;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "attribute_schema_json")
    private String attributeSchemaJson;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private boolean active = true;
}
