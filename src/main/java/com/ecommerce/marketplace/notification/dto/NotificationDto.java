package com.ecommerce.marketplace.notification.dto;
import com.ecommerce.marketplace.notification.entity.NotificationPriority;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class NotificationDto {
    private UUID id;
    private String type;
    private String title;
    private String body;
    private String icon;
    private String deepLink;
    private boolean read;
    private NotificationPriority priority;
    private Instant createdAt;
}
