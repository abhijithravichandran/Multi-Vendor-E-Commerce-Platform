package com.ecommerce.marketplace.support.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.support.dto.CreateTicketMessageRequest;
import com.ecommerce.marketplace.support.dto.SupportTicketDto;
import com.ecommerce.marketplace.support.dto.TicketMessageDto;
import com.ecommerce.marketplace.support.entity.TicketPriority;
import com.ecommerce.marketplace.support.entity.TicketStatus;
import com.ecommerce.marketplace.support.service.SupportService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/support")
@RequiredArgsConstructor
@Tag(name = "Admin Support", description = "Admin endpoints for support tickets")
@PreAuthorize("hasRole('ADMIN')")
public class SupportAdminController {

    private final SupportService supportService;

    @GetMapping("/tickets")
    public ResponseEntity<ApiResponse<PageResponse<SupportTicketDto>>> getAllTickets(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(supportService.getAllTicketsForAdmin(pageable)));
    }
    
    @GetMapping("/tickets/{ticketId}")
    public ResponseEntity<ApiResponse<SupportTicketDto>> getTicket(@CurrentUser UserPrincipal principal, @PathVariable UUID ticketId) {
        return ResponseEntity.ok(ApiResponse.success(supportService.getTicketById(principal.getId(), ticketId, true)));
    }

    @PostMapping("/tickets/{ticketId}/messages")
    public ResponseEntity<ApiResponse<TicketMessageDto>> adminReply(@CurrentUser UserPrincipal principal, @PathVariable UUID ticketId, @Valid @RequestBody CreateTicketMessageRequest request) {
        return ResponseEntity.ok(ApiResponse.success(supportService.addMessage(principal.getId(), ticketId, request, true)));
    }

    @PutMapping("/tickets/{ticketId}/status")
    public ResponseEntity<ApiResponse<SupportTicketDto>> updateTicketStatus(
            @PathVariable UUID ticketId,
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false) TicketPriority priority) {
        return ResponseEntity.ok(ApiResponse.success(supportService.updateTicketStatus(ticketId, status, priority)));
    }

    @PostMapping("/tickets/{ticketId}/assign")
    public ResponseEntity<ApiResponse<SupportTicketDto>> assignTicket(@CurrentUser UserPrincipal principal, @PathVariable UUID ticketId) {
        return ResponseEntity.ok(ApiResponse.success(supportService.assignTicket(ticketId, principal.getId())));
    }
}
