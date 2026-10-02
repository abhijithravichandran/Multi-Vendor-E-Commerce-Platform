package com.ecommerce.marketplace.marketing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannerDto {
    private UUID id;
    private String title;
    private String imageUrl;
    private String linkUrl;
    private String position;
    private int sortOrder;
    private boolean active;
    private Instant startsAt;
    private Instant endsAt;
}
