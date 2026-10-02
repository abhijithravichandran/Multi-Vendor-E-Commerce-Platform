package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.seller.dto.SellerDto;
import com.ecommerce.marketplace.seller.dto.SellerKycReviewRequest;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.seller.service.SellerService;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.criteria.Predicate;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/sellers")
@RequiredArgsConstructor
@Tag(name = "Admin Sellers", description = "Admin endpoints for managing sellers")
public class AdminSellerController {

    private final SellerService sellerService;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('VIEW_SELLERS')")
    @Operation(summary = "List sellers", description = "List and filter sellers")
    public ResponseEntity<ApiResponse<PageResponse<SellerDto>>> listSellers(
            @RequestParam(required = false) KycStatus kycStatus,
            @RequestParam(required = false) String q,
            @PageableDefault(size = 20) Pageable pageable) {

        Specification<Seller> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (kycStatus != null) {
                predicates.add(cb.equal(root.get("kycStatus"), kycStatus));
            }
            if (StringUtils.hasText(q)) {
                String search = "%" + q.toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("storeName")), search);
                predicates.add(nameMatch);
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Seller> page = sellerRepository.findAll(spec, pageable);
        Page<SellerDto> dtoPage = page.map(s -> sellerService.mapToDto(s, false));

        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(dtoPage)));
    }

    @GetMapping("/kyc-queue")
    @PreAuthorize("hasAuthority('VIEW_SELLERS')")
    @Operation(summary = "Get KYC queue", description = "List sellers with pending KYC")
    public ResponseEntity<ApiResponse<PageResponse<SellerDto>>> getKycQueue(@PageableDefault(size = 20) Pageable pageable) {
        return listSellers(KycStatus.PENDING, null, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('VIEW_SELLERS')")
    @Operation(summary = "Get seller details", description = "Get full seller profile including documents")
    public ResponseEntity<ApiResponse<SellerDto>> getSellerDetails(@PathVariable UUID id) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND, "Seller not found"));
        return ResponseEntity.ok(ApiResponse.success(sellerService.mapToDto(seller, false)));
    }

    @PostMapping("/{id}/kyc/approve")
    @PreAuthorize("hasAuthority('MANAGE_SELLERS')")
    @Audited(action = "APPROVE_SELLER_KYC", entityType = "Seller")
    public ResponseEntity<ApiResponse<SellerDto>> approveKyc(@PathVariable UUID id, @RequestBody(required = false) SellerKycReviewRequest request) {
        if (request == null) {
            request = new SellerKycReviewRequest(KycStatus.APPROVED, null);
        } else {
            request.setStatus(KycStatus.APPROVED);
        }
        SellerDto dto = sellerService.reviewKyc(id, request);
        return ResponseEntity.ok(ApiResponse.success(dto, "Seller KYC approved"));
    }

    @PostMapping("/{id}/kyc/reject")
    @PreAuthorize("hasAuthority('MANAGE_SELLERS')")
    @Audited(action = "REJECT_SELLER_KYC", entityType = "Seller")
    public ResponseEntity<ApiResponse<SellerDto>> rejectKyc(@PathVariable UUID id, @Valid @RequestBody SellerKycReviewRequest request) {
        if (!StringUtils.hasText(request.getRemarks())) {
            throw new ApiException(ErrorCode.INVALID_INPUT, "Remarks are mandatory when rejecting KYC");
        }
        request.setStatus(KycStatus.REJECTED);
        SellerDto dto = sellerService.reviewKyc(id, request);
        return ResponseEntity.ok(ApiResponse.success(dto, "Seller KYC rejected"));
    }

    @PostMapping("/{id}/suspend")
    @PreAuthorize("hasAuthority('MANAGE_SELLERS')")
    @Audited(action = "SUSPEND_SELLER", entityType = "Seller")
    public ResponseEntity<ApiResponse<SellerDto>> suspendSeller(
            @PathVariable UUID id,
            @RequestParam String reason,
            @RequestParam(defaultValue = "false") boolean force) {

        if (!StringUtils.hasText(reason)) {
            throw new ApiException(ErrorCode.INVALID_INPUT, "Suspension reason is mandatory");
        }

        SellerDto dto = sellerService.suspendSeller(id, reason, force);
        updateSellerUserStatus(dto.getUserId(), UserStatus.BLOCKED);

        return ResponseEntity.ok(ApiResponse.success(dto, "Seller suspended successfully"));
    }

    @PostMapping("/{id}/reinstate")
    @PreAuthorize("hasAuthority('MANAGE_SELLERS')")
    @Audited(action = "REINSTATE_SELLER", entityType = "Seller")
    public ResponseEntity<ApiResponse<SellerDto>> reinstateSeller(@PathVariable UUID id) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND, "Seller not found"));
        updateSellerUserStatus(seller.getUserId(), UserStatus.ACTIVE);
        return ResponseEntity.ok(ApiResponse.success(sellerService.mapToDto(seller, false), "Seller reinstated successfully"));
    }

    private void updateSellerUserStatus(UUID userId, UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND, "Associated user not found"));
        user.setStatus(status);
        userRepository.save(user);
    }
}
