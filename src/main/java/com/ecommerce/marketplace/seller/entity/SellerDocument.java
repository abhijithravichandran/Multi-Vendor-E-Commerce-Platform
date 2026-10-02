package com.ecommerce.marketplace.seller.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "seller_documents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDocument extends BaseEntity {

    @Column(name = "seller_id", nullable = false)
    private UUID sellerId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "status", nullable = false)
    @Builder.Default
    private String status = "PENDING";
}
