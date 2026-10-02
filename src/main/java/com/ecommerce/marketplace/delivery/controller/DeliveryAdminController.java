package com.ecommerce.marketplace.delivery.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.delivery.dto.CreateDeliveryPartnerRequest;
import com.ecommerce.marketplace.delivery.dto.DeliveryPartnerDto;
import com.ecommerce.marketplace.delivery.dto.ZoneDto;
import com.ecommerce.marketplace.delivery.dto.ZoneRequest;
import com.ecommerce.marketplace.delivery.entity.DeliveryPartnerStatus;
import com.ecommerce.marketplace.delivery.service.DeliveryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Delivery Management", description = "Admin endpoints for managing delivery partners and delivery zones")
public class DeliveryAdminController {

    private final DeliveryService deliveryService;

    @GetMapping("/delivery-partners")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List delivery partners", description = "List all delivery partners")
    public ResponseEntity<ApiResponse<PageResponse<DeliveryPartnerDto>>> getAllPartners(@PageableDefault(size = 20) Pageable pageable) {
        PageResponse<DeliveryPartnerDto> partners = deliveryService.getAllPartnersForAdmin(pageable);
        return ResponseEntity.ok(ApiResponse.success(partners));
    }

    @PostMapping("/delivery-partners")
    @Audited(action = "CREATE_DELIVERY_PARTNER", entityType = "DeliveryPartner")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create delivery partner", description = "Admin onboarding of new delivery partner account")
    public ResponseEntity<ApiResponse<DeliveryPartnerDto>> createPartner(@Valid @RequestBody CreateDeliveryPartnerRequest request) {
        DeliveryPartnerDto partner = deliveryService.createDeliveryPartner(request);
        return ResponseEntity.ok(ApiResponse.success(partner, "Delivery partner created successfully"));
    }

    @PutMapping("/delivery-partners/{id}/status")
    @Audited(action = "UPDATE_DELIVERY_PARTNER_STATUS", entityType = "DeliveryPartner")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update delivery partner status", description = "Activate or suspend delivery partner")
    public ResponseEntity<ApiResponse<DeliveryPartnerDto>> updatePartnerStatus(
            @PathVariable UUID id,
            @RequestParam DeliveryPartnerStatus status) {
        DeliveryPartnerDto partner = deliveryService.updatePartnerStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(partner, "Delivery partner status updated"));
    }

    @GetMapping("/zones")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List zones", description = "List all delivery zones")
    public ResponseEntity<ApiResponse<List<ZoneDto>>> getAllZones() {
        List<ZoneDto> zones = deliveryService.getAllZones();
        return ResponseEntity.ok(ApiResponse.success(zones));
    }

    @PostMapping("/zones")
    @Audited(action = "CREATE_ZONE", entityType = "Zone")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create zone", description = "Create a new delivery zone with pincodes")
    public ResponseEntity<ApiResponse<ZoneDto>> createZone(@Valid @RequestBody ZoneRequest request) {
        ZoneDto zone = deliveryService.createZone(request);
        return ResponseEntity.ok(ApiResponse.success(zone, "Zone created successfully"));
    }

    @PutMapping("/zones/{id}")
    @Audited(action = "UPDATE_ZONE", entityType = "Zone")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update zone", description = "Update an existing delivery zone")
    public ResponseEntity<ApiResponse<ZoneDto>> updateZone(
            @PathVariable UUID id,
            @Valid @RequestBody ZoneRequest request) {
        ZoneDto zone = deliveryService.updateZone(id, request);
        return ResponseEntity.ok(ApiResponse.success(zone, "Zone updated successfully"));
    }

    @DeleteMapping("/zones/{id}")
    @Audited(action = "DELETE_ZONE", entityType = "Zone")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete zone", description = "Remove a delivery zone")
    public ResponseEntity<ApiResponse<String>> deleteZone(@PathVariable UUID id) {
        deliveryService.deleteZone(id);
        return ResponseEntity.ok(ApiResponse.success("Zone deleted successfully"));
    }
}
