package com.ecommerce.marketplace.seller.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import com.ecommerce.marketplace.seller.dto.SellerDto;
import com.ecommerce.marketplace.seller.dto.SellerKycRequest;
import com.ecommerce.marketplace.seller.service.SellerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/seller")
@RequiredArgsConstructor
@Tag(name = "Seller Portal", description = "Endpoints for seller store management and KYC submission")
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/profile")
    @Operation(summary = "Get seller profile", description = "Get seller profile details for currently logged in seller")
    public ResponseEntity<ApiResponse<SellerDto>> getProfile(@CurrentUser UserPrincipal principal) {
        SellerDto seller = sellerService.getSellerByUserId(principal.getId(), false);
        return ResponseEntity.ok(ApiResponse.success(seller));
    }

    @PostMapping("/kyc")
    @Operation(summary = "Submit seller KYC", description = "Submit GSTIN, PAN, bank account, and KYC documents")
    public ResponseEntity<ApiResponse<SellerDto>> submitKyc(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody SellerKycRequest request) {
        SellerDto seller = sellerService.submitKyc(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(seller, "KYC details submitted for review"));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update seller profile")
    public ResponseEntity<ApiResponse<SellerDto>> updateProfile(
            @CurrentUser UserPrincipal principal, @Valid @RequestBody com.ecommerce.marketplace.seller.dto.SellerProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(sellerService.updateProfile(principal.getId(), request)));
    }

    @PutMapping("/business")
    @Operation(summary = "Update business details")
    public ResponseEntity<ApiResponse<SellerDto>> updateBusiness(
            @CurrentUser UserPrincipal principal, @Valid @RequestBody com.ecommerce.marketplace.seller.dto.SellerBusinessRequest request) {
        return ResponseEntity.ok(ApiResponse.success(sellerService.updateBusinessDetails(principal.getId(), request)));
    }

    @PutMapping("/bank")
    @Operation(summary = "Update bank details")
    public ResponseEntity<ApiResponse<SellerDto>> updateBank(
            @CurrentUser UserPrincipal principal, @Valid @RequestBody com.ecommerce.marketplace.seller.dto.SellerBankRequest request) {
        return ResponseEntity.ok(ApiResponse.success(sellerService.updateBankDetails(principal.getId(), request)));
    }

    @PutMapping("/pickup-address")
    @Operation(summary = "Update pickup address")
    public ResponseEntity<ApiResponse<SellerDto>> updatePickupAddress(
            @CurrentUser UserPrincipal principal, @Valid @RequestBody com.ecommerce.marketplace.seller.dto.PickupAddressDto request) {
        return ResponseEntity.ok(ApiResponse.success(sellerService.updatePickupAddress(principal.getId(), request)));
    }

    @PutMapping("/holiday-mode")
    @Operation(summary = "Toggle holiday mode", description = "Enable or disable seller store holiday mode")
    public ResponseEntity<ApiResponse<SellerDto>> toggleHolidayMode(@CurrentUser UserPrincipal principal) {
        SellerDto seller = sellerService.toggleHolidayMode(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(seller, "Holiday mode status updated"));
    }
}
