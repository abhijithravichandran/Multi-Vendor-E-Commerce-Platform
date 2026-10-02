package com.ecommerce.marketplace.address.controller;

import com.ecommerce.marketplace.address.dto.AddressDto;
import com.ecommerce.marketplace.address.dto.AddressRequest;
import com.ecommerce.marketplace.address.service.AddressService;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.security.CurrentUser;
import com.ecommerce.marketplace.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/addresses")
@RequiredArgsConstructor
@Tag(name = "Customer Addresses", description = "Endpoints for managing customer shipping/billing addresses")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    @Operation(summary = "Get user addresses", description = "List all addresses for logged in customer")
    public ResponseEntity<ApiResponse<List<AddressDto>>> getAddresses(@CurrentUser UserPrincipal principal) {
        List<AddressDto> addresses = addressService.getUserAddresses(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(addresses));
    }

    @PostMapping
    @Operation(summary = "Add address", description = "Create a new address for logged in customer")
    public ResponseEntity<ApiResponse<AddressDto>> createAddress(
            @CurrentUser UserPrincipal principal,
            @Valid @RequestBody AddressRequest request) {
        AddressDto address = addressService.createAddress(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(address, "Address added successfully"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update address", description = "Update an existing address")
    public ResponseEntity<ApiResponse<AddressDto>> updateAddress(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id,
            @Valid @RequestBody AddressRequest request) {
        AddressDto address = addressService.updateAddress(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success(address, "Address updated successfully"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete address", description = "Remove an address")
    public ResponseEntity<ApiResponse<String>> deleteAddress(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        addressService.deleteAddress(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully"));
    }

    @PutMapping("/{id}/default")
    @Operation(summary = "Set default address", description = "Mark address as default for logged in customer")
    public ResponseEntity<ApiResponse<AddressDto>> setDefaultAddress(
            @CurrentUser UserPrincipal principal,
            @PathVariable UUID id) {
        AddressDto address = addressService.setDefaultAddress(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(address, "Default address set successfully"));
    }
}
