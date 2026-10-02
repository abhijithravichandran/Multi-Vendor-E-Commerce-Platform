package com.ecommerce.marketplace.support.dto;

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
public class TicketMessageDto {
    private UUID id;
    private UUID ticketId;
    private UUID authorId;
    private String authorName;
    private String body;
    private boolean internalNote;
    private Instant createdAt;
}
