package com.ecommerce.marketplace.support.entity;

import com.ecommerce.marketplace.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "canned_responses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CannedResponse extends BaseEntity {
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "body", nullable = false)
    private String body;
}
