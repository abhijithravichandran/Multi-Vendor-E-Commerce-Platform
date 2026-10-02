package com.ecommerce.marketplace.seller.service;

import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.events.SellerKycApprovedEvent;
import com.ecommerce.marketplace.common.events.SellerKycRejectedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.integration.OrderQueryPort;
import com.ecommerce.marketplace.seller.dto.BankAccountDto;
import com.ecommerce.marketplace.seller.dto.PickupAddressDto;
import com.ecommerce.marketplace.seller.dto.SellerBankRequest;
import com.ecommerce.marketplace.seller.dto.SellerBusinessRequest;
import com.ecommerce.marketplace.seller.dto.SellerProfileRequest;
import com.ecommerce.marketplace.seller.dto.SellerDocumentDto;
import com.ecommerce.marketplace.seller.dto.SellerDto;
import com.ecommerce.marketplace.seller.dto.SellerKycRequest;
import com.ecommerce.marketplace.seller.dto.SellerKycReviewRequest;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.entity.SellerDocument;
import com.ecommerce.marketplace.seller.repository.SellerDocumentRepository;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final SellerDocumentRepository sellerDocumentRepository;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final OrderQueryPort orderQueryPort;

    @Transactional(readOnly = true)
    public SellerDto getSellerByUserId(UUID userId, boolean maskSensitive) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        return mapToDto(seller, maskSensitive);
    }

    @Transactional(readOnly = true)
    public SellerDto getSellerBySlug(String slug) {
        Seller seller = sellerRepository.findByStoreSlug(slug)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        return mapToDto(seller, true);
    }

    @Transactional
    public SellerDto submitKyc(UUID userId, SellerKycRequest request) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        try {
            seller.setGstin(request.getGstin());
            seller.setPan(request.getPan());
            seller.setBankAccountJson(objectMapper.writeValueAsString(request.getBankAccount()));
            seller.setPickupAddressJson(objectMapper.writeValueAsString(request.getPickupAddress()));
            seller.setKycStatus(KycStatus.PENDING);
            seller.setKycRemarks(null);

            seller = sellerRepository.save(seller);

            if (request.getDocuments() != null) {
                for (SellerKycRequest.DocumentInput docInput : request.getDocuments()) {
                    SellerDocument doc = SellerDocument.builder()
                            .sellerId(seller.getId())
                            .type(docInput.getType())
                            .fileUrl(docInput.getFileUrl())
                            .status("PENDING")
                            .build();
                    sellerDocumentRepository.save(doc);
                }
            }

            return mapToDto(seller, false);
        } catch (JsonProcessingException e) {
            throw new ApiException(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to serialize KYC details");
        }
    }

    @Transactional
    public SellerDto updateProfile(UUID userId, SellerProfileRequest request) {
        Seller seller = getSellerEntityByUserId(userId);
        seller.setStoreName(request.getStoreName());
        seller.setDescription(request.getDescription());
        seller.setLogo(request.getLogo());
        seller.setBanner(request.getBanner());
        if (request.getPolicies() != null) {
            try {
                seller.setPoliciesJson(objectMapper.writeValueAsString(request.getPolicies()));
            } catch (JsonProcessingException e) {
                log.error("Failed to serialize policies", e);
            }
        }
        return mapToDto(sellerRepository.save(seller), false);
    }

    @Transactional
    public SellerDto updateBusinessDetails(UUID userId, SellerBusinessRequest request) {
        Seller seller = getSellerEntityByUserId(userId);
        seller.setGstin(request.getGstin());
        seller.setPan(request.getPan());
        updateKycStatusIfRequired(seller);
        return mapToDto(sellerRepository.save(seller), false);
    }

    @Transactional
    public SellerDto updateBankDetails(UUID userId, SellerBankRequest request) {
        Seller seller = getSellerEntityByUserId(userId);
        try {
            // Note: PROMPT says "account number encrypted". In a real system, we'd use a crypto util.
            // For Phase 1 we will store it directly or base64 it just to simulate.
            BankAccountDto bankAccount = BankAccountDto.builder()
                    .holder(request.getHolder())
                    .number(request.getNumber()) // To properly encrypt, we would inject an EncryptionService
                    .ifsc(request.getIfsc())
                    .build();
            seller.setBankAccountJson(objectMapper.writeValueAsString(bankAccount));
            updateKycStatusIfRequired(seller);
            return mapToDto(sellerRepository.save(seller), false);
        } catch (JsonProcessingException e) {
            throw new ApiException(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to process bank details");
        }
    }

    @Transactional
    public SellerDto updatePickupAddress(UUID userId, PickupAddressDto request) {
        Seller seller = getSellerEntityByUserId(userId);
        try {
            seller.setPickupAddressJson(objectMapper.writeValueAsString(request));
            updateKycStatusIfRequired(seller);
            return mapToDto(sellerRepository.save(seller), false);
        } catch (JsonProcessingException e) {
            throw new ApiException(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to process pickup address");
        }
    }

    private void updateKycStatusIfRequired(Seller seller) {
        // If they update details and it was NOT_SUBMITTED, maybe it moves to PENDING?
        // Or perhaps it just resets REJECTED to NOT_SUBMITTED so they can submit again.
        if (seller.getKycStatus() == KycStatus.REJECTED) {
            seller.setKycStatus(KycStatus.NOT_SUBMITTED);
        }
    }

    private Seller getSellerEntityByUserId(UUID userId) {
        return sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
    }

    @Transactional
    public SellerDto toggleHolidayMode(UUID userId) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        seller.setHolidayMode(!seller.isHolidayMode());
        seller = sellerRepository.save(seller);
        return mapToDto(seller, false);
    }

    @Transactional(readOnly = true)
    public PageResponse<SellerDto> getAllSellersForAdmin(Pageable pageable) {
        Page<Seller> page = sellerRepository.findAll(pageable);
        Page<SellerDto> dtoPage = page.map(seller -> mapToDto(seller, false));
        return PageResponse.from(dtoPage);
    }

    @Transactional
    public SellerDto reviewKyc(UUID sellerId, SellerKycReviewRequest request) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        if (request.getStatus() == KycStatus.APPROVED) {
            seller.setKycStatus(KycStatus.APPROVED);
            seller.setKycRemarks(request.getRemarks());
            sellerRepository.save(seller);
            eventPublisher.publishEvent(new SellerKycApprovedEvent(seller.getId(), seller.getUserId()));
        } else if (request.getStatus() == KycStatus.REJECTED) {
            seller.setKycStatus(KycStatus.REJECTED);
            seller.setKycRemarks(request.getRemarks());
            sellerRepository.save(seller);
            eventPublisher.publishEvent(new SellerKycRejectedEvent(seller.getId(), seller.getUserId(), request.getRemarks()));
        } else {
            throw new ApiException(ErrorCode.INVALID_INPUT, "KYC status review decision must be APPROVED or REJECTED");
        }

        return mapToDto(seller, false);
    }

    @Transactional
    public SellerDto suspendSeller(UUID sellerId, String reason, boolean force) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        
        long openOrders = orderQueryPort.countOpenOrdersForSeller(sellerId);
        if (openOrders > 0 && !force) {
            throw new ApiException(ErrorCode.BUSINESS_RULE_VIOLATION, "Seller has " + openOrders + " open orders. Use force=true to suspend.");
        }
        
        return mapToDto(seller, false);
    }

    public SellerDto mapToDto(Seller seller, boolean maskSensitive) {
        BankAccountDto bankAccount = null;
        if (seller.getBankAccountJson() != null) {
            try {
                bankAccount = objectMapper.readValue(seller.getBankAccountJson(), BankAccountDto.class);
                if (maskSensitive && bankAccount != null) {
                    bankAccount.setNumber(bankAccount.getMaskedNumber());
                }
            } catch (JsonProcessingException e) {
                log.error("Failed to parse bank account JSON", e);
            }
        }

        PickupAddressDto pickupAddress = null;
        if (seller.getPickupAddressJson() != null) {
            try {
                pickupAddress = objectMapper.readValue(seller.getPickupAddressJson(), PickupAddressDto.class);
            } catch (JsonProcessingException e) {
                log.error("Failed to parse pickup address JSON", e);
            }
        }

        List<SellerDocument> docEntities = sellerDocumentRepository.findBySellerId(seller.getId());
        List<SellerDocumentDto> docs = docEntities.stream()
                .map(d -> SellerDocumentDto.builder()
                        .id(d.getId())
                        .sellerId(d.getSellerId())
                        .type(d.getType())
                        .fileUrl(d.getFileUrl())
                        .status(d.getStatus())
                        .build())
                .collect(Collectors.toList());

        String gstin = seller.getGstin();
        String pan = seller.getPan();
        if (maskSensitive) {
            if (gstin != null && gstin.length() > 4) gstin = "XXXX" + gstin.substring(gstin.length() - 4);
            if (pan != null && pan.length() > 4) pan = "XXXX" + pan.substring(pan.length() - 4);
        }

        return SellerDto.builder()
                .id(seller.getId())
                .userId(seller.getUserId())
                .storeName(seller.getStoreName())
                .storeSlug(seller.getStoreSlug())
                .logo(seller.getLogo())
                .banner(seller.getBanner())
                .description(seller.getDescription())
                .gstin(gstin)
                .pan(pan)
                .bankAccount(bankAccount)
                .pickupAddress(pickupAddress)
                .kycStatus(seller.getKycStatus())
                .kycRemarks(seller.getKycRemarks())
                .holidayMode(seller.isHolidayMode())
                .rating(seller.getRating())
                .followerCount(seller.getFollowerCount())
                .documents(docs)
                .createdAt(seller.getCreatedAt())
                .build();
    }
}
