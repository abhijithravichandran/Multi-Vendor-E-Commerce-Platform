package com.ecommerce.marketplace.support.service;

import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.support.dto.CreateTicketMessageRequest;
import com.ecommerce.marketplace.support.dto.CreateTicketRequest;
import com.ecommerce.marketplace.support.dto.SupportTicketDto;
import com.ecommerce.marketplace.support.dto.TicketMessageDto;
import com.ecommerce.marketplace.support.entity.TicketMessage;
import com.ecommerce.marketplace.support.entity.SupportTicket;
import com.ecommerce.marketplace.support.entity.TicketPriority;
import com.ecommerce.marketplace.support.entity.TicketStatus;
import com.ecommerce.marketplace.support.repository.TicketMessageRepository;
import com.ecommerce.marketplace.support.repository.SupportTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportService {

    private final SupportTicketRepository ticketRepository;
    private final TicketMessageRepository messageRepository;

    @Transactional
    public SupportTicketDto createTicket(UUID userId, CreateTicketRequest request) {
        SupportTicket ticket = SupportTicket.builder()
                .userId(userId)
                .subject(request.getSubject())
                .referenceType(request.getReferenceType())
                .referenceId(request.getReferenceId())
                .status(TicketStatus.OPEN)
                .priority(TicketPriority.NORMAL)
                .slaDueAt(Instant.now().plus(48, ChronoUnit.HOURS))
                .build();
        ticket = ticketRepository.save(ticket);

        TicketMessage initialMsg = TicketMessage.builder()
                .ticketId(ticket.getId())
                .authorId(userId)
                .body(request.getBody())
                .internalNote(false)
                .build();
        messageRepository.save(initialMsg);

        return mapToDto(ticket, List.of(initialMsg));
    }

    @Transactional(readOnly = true)
    public PageResponse<SupportTicketDto> getUserTickets(UUID userId, Pageable pageable) {
        Page<SupportTicket> page = ticketRepository.findByUserId(userId, pageable);
        return new PageResponse<>(
                page.getContent().stream().map(t -> mapToDto(t, null)).collect(Collectors.toList()),
                page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public PageResponse<SupportTicketDto> getAllTicketsForAdmin(Pageable pageable) {
        Page<SupportTicket> page = ticketRepository.findAll(pageable);
        return new PageResponse<>(
                page.getContent().stream().map(t -> mapToDto(t, null)).collect(Collectors.toList()),
                page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public SupportTicketDto getTicketById(UUID userId, UUID ticketId, boolean isAdmin) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ApiException(ErrorCode.TICKET_NOT_FOUND));
        if (!isAdmin && !ticket.getUserId().equals(userId)) {
            throw new ApiException(ErrorCode.FORBIDDEN);
        }
        
        List<TicketMessage> messages = isAdmin 
            ? messageRepository.findByTicketIdOrderByCreatedAtAsc(ticketId)
            : messageRepository.findByTicketIdAndInternalNoteFalseOrderByCreatedAtAsc(ticketId);
            
        return mapToDto(ticket, messages);
    }

    @Transactional
    public TicketMessageDto addMessage(UUID userId, UUID ticketId, CreateTicketMessageRequest request, boolean isAdmin) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ApiException(ErrorCode.TICKET_NOT_FOUND));
        if (!isAdmin && !ticket.getUserId().equals(userId)) {
            throw new ApiException(ErrorCode.FORBIDDEN);
        }
        
        TicketMessage msg = TicketMessage.builder()
                .ticketId(ticketId)
                .authorId(userId)
                .body(request.getBody())
                .internalNote(isAdmin && Boolean.TRUE.equals(request.getInternalNote()))
                .build();
                
        ticket.setStatus(isAdmin ? TicketStatus.IN_PROGRESS : TicketStatus.OPEN);
        ticketRepository.save(ticket);
        
        msg = messageRepository.save(msg);
        
        TicketMessageDto dto = new TicketMessageDto();
        dto.setId(msg.getId());
        dto.setBody(msg.getBody());
        dto.setInternalNote(msg.isInternalNote());
        dto.setCreatedAt(msg.getCreatedAt());
        dto.setAuthorId(msg.getAuthorId());
        return dto;
    }
    
    @Transactional
    public SupportTicketDto updateTicketStatus(UUID ticketId, TicketStatus status, TicketPriority priority) {
        SupportTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if (status != null) ticket.setStatus(status);
        if (priority != null) {
            ticket.setPriority(priority);
            int hours = switch (priority) {
                case URGENT -> 4;
                case HIGH -> 12;
                case NORMAL -> 48;
                case LOW -> 168;
            };
            ticket.setSlaDueAt(ticket.getCreatedAt().plus(hours, ChronoUnit.HOURS));
        }
        return mapToDto(ticketRepository.save(ticket), null);
    }
    
    @Transactional
    public SupportTicketDto assignTicket(UUID ticketId, UUID adminId) {
        SupportTicket ticket = ticketRepository.findById(ticketId).orElseThrow();
        ticket.setAssignedTo(adminId);
        ticket.setStatus(TicketStatus.IN_PROGRESS);
        return mapToDto(ticketRepository.save(ticket), null);
    }

    private SupportTicketDto mapToDto(SupportTicket t, List<TicketMessage> messages) {
        SupportTicketDto dto = new SupportTicketDto();
        dto.setId(t.getId());
        dto.setUserId(t.getUserId());
        dto.setSubject(t.getSubject());
        dto.setCategory(t.getCategory());
        dto.setStatus(t.getStatus());
        dto.setPriority(t.getPriority());
        dto.setAssignedTo(t.getAssignedTo());
        dto.setSlaDueAt(t.getSlaDueAt());
        dto.setReferenceType(t.getReferenceType());
        dto.setReferenceId(t.getReferenceId());
        dto.setCreatedAt(t.getCreatedAt());
        
        if (messages != null) {
            dto.setMessages(messages.stream().map(m -> {
                TicketMessageDto mdto = new TicketMessageDto();
                mdto.setId(m.getId());
                mdto.setBody(m.getBody());
                mdto.setInternalNote(m.isInternalNote());
                mdto.setCreatedAt(m.getCreatedAt());
                mdto.setAuthorId(m.getAuthorId());
                return mdto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
