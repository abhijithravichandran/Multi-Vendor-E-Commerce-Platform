package com.ecommerce.marketplace.admin.controller;

import com.ecommerce.marketplace.address.mapper.AddressMapper;
import com.ecommerce.marketplace.address.repository.AddressRepository;
import com.ecommerce.marketplace.admin.dto.AdminCustomerDetailDto;
import com.ecommerce.marketplace.admin.dto.AdminCustomerListDto;
import com.ecommerce.marketplace.admin.dto.BlockReasonRequest;
import com.ecommerce.marketplace.common.audit.Audited;
import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.review.repository.ReviewRepository;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.mapper.UserMapper;
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

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/customers")
@RequiredArgsConstructor
@Tag(name = "Admin Customers", description = "Admin endpoints for managing customers")
public class AdminCustomerController {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ReviewRepository reviewRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;

    @GetMapping
    @PreAuthorize("hasAuthority('VIEW_CUSTOMERS')")
    @Operation(summary = "List customers", description = "Filterable list of customers")
    public ResponseEntity<ApiResponse<PageResponse<AdminCustomerListDto>>> listCustomers(
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Instant joinedAfter,
            @RequestParam(required = false) Instant joinedBefore,
            @PageableDefault(size = 20) Pageable pageable) {

        Specification<User> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("role"), Role.CUSTOMER));

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (StringUtils.hasText(q)) {
                String search = "%" + q.toLowerCase() + "%";
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), search);
                Predicate emailMatch = cb.like(cb.lower(root.get("email")), search);
                predicates.add(cb.or(nameMatch, emailMatch));
            }
            if (joinedAfter != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), joinedAfter));
            }
            if (joinedBefore != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), joinedBefore));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<User> users = userRepository.findAll(spec, pageable);

        Page<AdminCustomerListDto> dtoPage = users.map(user -> AdminCustomerListDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .status(user.getStatus())
                .joinedAt(user.getCreatedAt())
                .build());

        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(dtoPage)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('VIEW_CUSTOMERS')")
    @Operation(summary = "Customer details", description = "Full details of a specific customer")
    public ResponseEntity<ApiResponse<AdminCustomerDetailDto>> getCustomerDetails(@PathVariable UUID id) {
        User user = userRepository.findById(id)
                .filter(u -> u.getRole() == Role.CUSTOMER)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND, "Customer not found"));

        var addresses = addressRepository.findByUserId(id).stream()
                .map(addressMapper::toDto)
                .collect(Collectors.toList());

        long reviewCount = reviewRepository.countByCustomerId(id);

        AdminCustomerDetailDto detail = AdminCustomerDetailDto.builder()
                .profile(userMapper.toDto(user))
                .addresses(addresses)
                .reviewCount((int) reviewCount)
                .build();

        return ResponseEntity.ok(ApiResponse.success(detail));
    }

    @PostMapping("/{id}/block")
    @PreAuthorize("hasAuthority('MANAGE_CUSTOMERS')")
    @Audited(action = "BLOCK_CUSTOMER", entityType = "User")
    public ResponseEntity<ApiResponse<String>> blockCustomer(
            @PathVariable UUID id,
            @Valid @RequestBody BlockReasonRequest request) {

        User user = userRepository.findById(id)
                .filter(u -> u.getRole() == Role.CUSTOMER)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND, "Customer not found"));

        user.setStatus(UserStatus.BLOCKED);
        // Note: Reason can be stored in audit logs which is handled by @Audited and AOP.
        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse.success("Customer blocked successfully"));
    }

    @PostMapping("/{id}/unblock")
    @PreAuthorize("hasAuthority('MANAGE_CUSTOMERS')")
    @Audited(action = "UNBLOCK_CUSTOMER", entityType = "User")
    public ResponseEntity<ApiResponse<String>> unblockCustomer(@PathVariable UUID id) {

        User user = userRepository.findById(id)
                .filter(u -> u.getRole() == Role.CUSTOMER)
                .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND, "Customer not found"));

        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse.success("Customer unblocked successfully"));
    }
}
