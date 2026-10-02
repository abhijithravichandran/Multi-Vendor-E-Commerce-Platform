package com.ecommerce.marketplace.delivery.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.delivery.dto.DeliveryDocumentDto;
import com.ecommerce.marketplace.delivery.dto.DeliveryPartnerDto;
import com.ecommerce.marketplace.delivery.dto.SosRequest;
import com.ecommerce.marketplace.delivery.dto.UpdateDeliveryProfileRequest;
import com.ecommerce.marketplace.delivery.dto.UploadDocumentRequest;
import com.ecommerce.marketplace.delivery.service.DeliveryService;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/delivery")
@RequiredArgsConstructor
@Tag(name = "Delivery Partner", description = "Delivery partner profile and tasks endpoints")
@PreAuthorize("hasRole('DELIVERY')")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @GetMapping("/profile")
    @Operation(summary = "Get profile", description = "Fetch delivery partner profile details")
    public ResponseEntity<ApiResponse<DeliveryPartnerDto>> getProfile(@CurrentUser UserPrincipal principal) {
        return ResponseEntity.ok(ApiResponse.success(deliveryService.getProfile(principal.getId())));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update profile", description = "Update delivery partner vehicle and bank details")
    public ResponseEntity<ApiResponse<DeliveryPartnerDto>> updateProfile(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody UpdateDeliveryProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(deliveryService.updateProfile(principal.getId(), request)));
    }

    @GetMapping("/documents")
    @Operation(summary = "Get documents", description = "List all uploaded delivery documents")
    public ResponseEntity<ApiResponse<List<DeliveryDocumentDto>>> getDocuments(@CurrentUser UserPrincipal principal) {
        return ResponseEntity.ok(ApiResponse.success(deliveryService.getDocuments(principal.getId())));
    }

    @PostMapping("/documents")
    @Operation(summary = "Upload document", description = "Upload a new delivery document")
    public ResponseEntity<ApiResponse<DeliveryDocumentDto>> uploadDocument(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody UploadDocumentRequest request) {
        return ResponseEntity.ok(ApiResponse.success(deliveryService.uploadDocument(principal.getId(), request)));
    }

    @PutMapping("/online-status")
    @Operation(summary = "Set online status", description = "Toggle online availability")
    public ResponseEntity<ApiResponse<String>> setOnlineStatus(
            @CurrentUser UserPrincipal principal,
            @RequestParam boolean isOnline) {
        deliveryService.setOnlineStatus(principal.getId(), isOnline);
        return ResponseEntity.ok(ApiResponse.success("Status updated to " + (isOnline ? "online" : "offline")));
    }

    @PostMapping("/sos")
    @Operation(summary = "Trigger SOS", description = "Raise a high-priority SOS alert with current location")
    public ResponseEntity<ApiResponse<String>> triggerSos(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody SosRequest request) {
        deliveryService.triggerSos(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("SOS alert triggered successfully"));
    }
}
