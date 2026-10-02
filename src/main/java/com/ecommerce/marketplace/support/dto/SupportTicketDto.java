package com.ecommerce.marketplace.support.dto;

import com.ecommerce.marketplace.support.entity.TicketPriority;
import com.ecommerce.marketplace.support.entity.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicketDto {
    private UUID id;
    private UUID userId;
    private String userName;
    private String subject;
    private String category;
    private TicketStatus status;
    private TicketPriority priority;
    private UUID assignedTo;
    private String assignedToName;
    private Instant slaDueAt;
    private String referenceType;
    private String referenceId;
    private List<TicketMessageDto> messages;
    private Instant createdAt;
}
