package com.ecommerce.marketplace.marketing.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BannerRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String linkUrl;

    @NotBlank(message = "Position is required (e.g. HOME_HERO, CATEGORY_BANNER)")
    private String position;

    private Integer sortOrder;

    private Boolean active;

    private Instant startsAt;

    private Instant endsAt;
}
