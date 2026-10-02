package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.admin.entity.AuditLog;
import com.ecommerce.marketplace.admin.repository.AuditLogRepository;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/audit-logs")
@RequiredArgsConstructor
@Tag(name = "Admin Audit Logs", description = "Admin endpoints for viewing system audit trail")
public class AdminAuditController {

    private final AuditLogRepository auditLogRepository;

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "List audit logs", description = "List system audit logs recorded by @Audited aspects")
    public ResponseEntity<ApiResponse<PageResponse<AuditLog>>> getAuditLogs(@PageableDefault(size = 20) Pageable pageable) {
        Page<AuditLog> page = auditLogRepository.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(page)));
    }
}
