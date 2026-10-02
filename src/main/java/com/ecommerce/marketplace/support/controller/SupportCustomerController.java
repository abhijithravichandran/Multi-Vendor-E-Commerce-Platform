package com.ecommerce.marketplace.support.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.support.dto.CreateTicketMessageRequest;
import com.ecommerce.marketplace.support.dto.CreateTicketRequest;
import com.ecommerce.marketplace.support.dto.SupportTicketDto;
import com.ecommerce.marketplace.support.dto.TicketMessageDto;
import com.ecommerce.marketplace.support.service.SupportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/support/tickets")
@RequiredArgsConstructor
@Tag(name = "Customer Support", description = "Customer endpoints for creating and tracking support tickets")
public class SupportCustomerController {

    private final SupportService supportService;

    @GetMapping
    @Operation(summary = "Get user tickets", description = "List all support tickets created by current user")
    public ResponseEntity<ApiResponse<PageResponse<SupportTicketDto>>> getUserTickets(
            @CurrentUser UserPrincipal principal,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<SupportTicketDto> tickets = supportService.getUserTickets(principal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(tickets));
    }

    @PostMapping
    @Operation(summary = "Create support ticket", description = "Open a new support ticket")
    public ResponseEntity<ApiResponse<SupportTicketDto>> createTicket(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody CreateTicketRequest request) {
        SupportTicketDto ticket = supportService.createTicket(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(ticket, "Support ticket created successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get ticket details", description = "Fetch ticket details and conversation messages")
    public ResponseEntity<ApiResponse<SupportTicketDto>> getTicketById(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        SupportTicketDto ticket = supportService.getTicketById(principal.getId(), id, false);
        return ResponseEntity.ok(ApiResponse.success(ticket));
    }

    @PostMapping("/{id}/messages")
    @Operation(summary = "Add message to ticket", description = "Reply to an existing support ticket")
    public ResponseEntity<ApiResponse<TicketMessageDto>> addMessage(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody CreateTicketMessageRequest request) {
        TicketMessageDto message = supportService.addMessage(principal.getId(), id, request, false);
        return ResponseEntity.ok(ApiResponse.success(message, "Message added to ticket"));
    }
}
