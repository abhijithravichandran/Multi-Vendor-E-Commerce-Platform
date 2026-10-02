package com.ecommerce.marketplace.delivery.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.delivery.dto.DeliveryDocumentDto;
import com.ecommerce.marketplace.delivery.dto.DeliveryPartnerDto;
import com.ecommerce.marketplace.delivery.dto.UpdateDeliveryProfileRequest;
import com.ecommerce.marketplace.delivery.dto.UploadDocumentRequest;
import com.ecommerce.marketplace.delivery.entity.DeliveryDocument;
import com.ecommerce.marketplace.delivery.entity.DeliveryPartner;
import com.ecommerce.marketplace.delivery.port.ActiveTaskQueryPort;
import com.ecommerce.marketplace.delivery.repository.DeliveryDocumentRepository;
import com.ecommerce.marketplace.delivery.repository.DeliveryPartnerRepository;
import com.ecommerce.marketplace.seller.dto.BankAccountDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.repository.UserRepository;
import com.ecommerce.marketplace.delivery.repository.ZoneRepository;
import com.ecommerce.marketplace.delivery.entity.Zone;
import com.ecommerce.marketplace.delivery.dto.CreateDeliveryPartnerRequest;
import com.ecommerce.marketplace.delivery.dto.ZoneDto;
import com.ecommerce.marketplace.delivery.dto.ZoneRequest;
import com.ecommerce.marketplace.delivery.entity.DeliveryPartnerStatus;
import com.ecommerce.marketplace.common.dto.PageResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeliveryService {

    private final DeliveryPartnerRepository partnerRepository;
    private final DeliveryDocumentRepository documentRepository;
    private final ActiveTaskQueryPort activeTaskQueryPort;
    private final ObjectMapper objectMapper;

    private final UserRepository userRepository;
    private final ZoneRepository zoneRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional(readOnly = true)
    public PageResponse<DeliveryPartnerDto> getAllPartnersForAdmin(Pageable pageable) {
        Page<DeliveryPartner> page = partnerRepository.findAll(pageable);
        return new PageResponse<>(
                page.getContent().stream().map(p -> mapToDto(p, false)).collect(Collectors.toList()),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }

    @Transactional
    public DeliveryPartnerDto createDeliveryPartner(CreateDeliveryPartnerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Email already exists");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "Phone already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.DELIVERY)
                .status(UserStatus.PENDING)
                .build();
        user = userRepository.save(user);

        DeliveryPartner partner = DeliveryPartner.builder()
                .userId(user.getId())
                .vehicleType(request.getVehicleType())
                .vehicleNumber(request.getVehicleNumber())
                .licenseNumber(request.getLicenseNumber())
                .servicePincodes(request.getZonePincodes() != null ? new HashSet<>(request.getZonePincodes()) : new HashSet<>())
                .status(DeliveryPartnerStatus.PENDING)
                .isOnline(false)
                .build();
        return mapToDto(partnerRepository.save(partner), false);
    }

    @Transactional
    public DeliveryPartnerDto updatePartnerStatus(UUID id, DeliveryPartnerStatus status) {
        DeliveryPartner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.DELIVERY_PARTNER_NOT_FOUND));
        partner.setStatus(status);
        
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            if (status == DeliveryPartnerStatus.SUSPENDED) {
                user.setStatus(UserStatus.BLOCKED);
            } else if (status == DeliveryPartnerStatus.ACTIVE && user.getStatus() == UserStatus.PENDING) {
                // Keep it pending if they haven't changed password, else active
            } else {
                user.setStatus(UserStatus.ACTIVE);
            }
            userRepository.save(user);
        }
        
        return mapToDto(partnerRepository.save(partner), false);
    }

    @Transactional(readOnly = true)
    public List<ZoneDto> getAllZones() {
        return zoneRepository.findAll().stream().map(z -> {
            ZoneDto dto = new ZoneDto();
            dto.setId(z.getId());
            dto.setName(z.getName());
            if (z.getPincodesJson() != null) {
                try {
                    dto.setPincodes(objectMapper.readValue(z.getPincodesJson(), new com.fasterxml.jackson.core.type.TypeReference<List<String>>(){}));
                } catch (Exception e) {}
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public ZoneDto createZone(ZoneRequest request) {
        Zone zone = new Zone();
        zone.setName(request.getName());
        try {
            zone.setPincodesJson(objectMapper.writeValueAsString(request.getPincodes()));
        } catch (Exception e) {}
        zone = zoneRepository.save(zone);
        
        ZoneDto dto = new ZoneDto();
        dto.setId(zone.getId());
        dto.setName(zone.getName());
        dto.setPincodes(request.getPincodes());
        return dto;
    }

    @Transactional
    public ZoneDto updateZone(UUID id, ZoneRequest request) {
        Zone zone = zoneRepository.findById(id).orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND));
        zone.setName(request.getName());
        try {
            zone.setPincodesJson(objectMapper.writeValueAsString(request.getPincodes()));
        } catch (Exception e) {}
        zone = zoneRepository.save(zone);
        
        ZoneDto dto = new ZoneDto();
        dto.setId(zone.getId());
        dto.setName(zone.getName());
        dto.setPincodes(request.getPincodes());
        return dto;
    }

    @Transactional
    public void deleteZone(UUID id) {
        zoneRepository.deleteById(id);
    }

    @Transactional
    public DeliveryPartner getOrCreatePartner(UUID userId) {
        return partnerRepository.findById(userId).orElseGet(() -> {
            DeliveryPartner partner = DeliveryPartner.builder()
                    .userId(userId)
                    .build();
            return partnerRepository.save(partner);
        });
    }

    @Transactional(readOnly = true)
    public DeliveryPartnerDto getProfile(UUID userId) {
        DeliveryPartner partner = getOrCreatePartner(userId);
        return mapToDto(partner, true);
    }

    @Transactional
    public DeliveryPartnerDto updateProfile(UUID userId, UpdateDeliveryProfileRequest request) {
        DeliveryPartner partner = getOrCreatePartner(userId);
        partner.setVehicleType(request.getVehicleType());
        partner.setVehicleNumber(request.getVehicleNumber());
        partner.setAvailabilitySchedule(request.getAvailabilitySchedule());

        if (request.getBankAccount() != null) {
            try {
                partner.setBankAccountJson(objectMapper.writeValueAsString(request.getBankAccount()));
            } catch (JsonProcessingException e) {
                throw new ApiException(ErrorCode.INTERNAL_SERVER_ERROR, "Failed to process bank details");
            }
        }

        return mapToDto(partnerRepository.save(partner), false);
    }

    @Transactional
    public void setOnlineStatus(UUID userId, boolean isOnline) {
        DeliveryPartner partner = getOrCreatePartner(userId);
        
        if (!isOnline) {
            int activeTasks = activeTaskQueryPort.countActiveTasks(userId);
            if (activeTasks > 0) {
                throw new ApiException(ErrorCode.BUSINESS_RULE_VIOLATION, "Cannot go offline with active tasks");
            }
        }

        partner.setOnline(isOnline);
        partnerRepository.save(partner);
    }

    @Transactional
    public DeliveryDocumentDto uploadDocument(UUID userId, UploadDocumentRequest request) {
        DeliveryPartner partner = getOrCreatePartner(userId);
        
        DeliveryDocument doc = DeliveryDocument.builder()
                .partnerId(partner.getUserId())
                .type(request.getType())
                .fileUrl(request.getFileUrl())
                .expiryDate(request.getExpiryDate())
                .build();
                
        return mapDocToDto(documentRepository.save(doc));
    }

    @Transactional(readOnly = true)
    public List<DeliveryDocumentDto> getDocuments(UUID userId) {
        return documentRepository.findByPartnerId(userId).stream()
                .map(this::mapDocToDto)
                .collect(Collectors.toList());
    }

    
    @Transactional
    public void triggerSos(UUID userId, com.ecommerce.marketplace.delivery.dto.SosRequest request) {
        DeliveryPartner partner = getOrCreatePartner(userId);
        partner.setCurrentLat(request.getLat());
        partner.setCurrentLng(request.getLng());
        partnerRepository.save(partner);
        
        log.warn("SOS triggered by delivery partner {} at {}, {}", userId, request.getLat(), request.getLng());
        // In Phase 2: Send real-time high-priority notification to admins.
    }

    private DeliveryPartnerDto mapToDto(DeliveryPartner partner, boolean maskSensitive) {
        DeliveryPartnerDto dto = new DeliveryPartnerDto();
        dto.setUserId(partner.getUserId());
        dto.setVehicleType(partner.getVehicleType());
        dto.setVehicleNumber(partner.getVehicleNumber());
        dto.setServicePincodes(partner.getServicePincodes());
        dto.setAvailabilitySchedule(partner.getAvailabilitySchedule());
        dto.setOnline(partner.isOnline());
        dto.setLicenseNumber(partner.getLicenseNumber());
        dto.setStatus(partner.getStatus());
        dto.setRating(partner.getRating());


        if (partner.getBankAccountJson() != null) {
            try {
                BankAccountDto bankAccount = objectMapper.readValue(partner.getBankAccountJson(), BankAccountDto.class);
                if (maskSensitive && bankAccount != null) {
                    bankAccount.setNumber(bankAccount.getMaskedNumber());
                }
                dto.setBankAccount(bankAccount);
            } catch (JsonProcessingException e) {
                log.error("Failed to parse bank account JSON", e);
            }
        }

        return dto;
    }

    private DeliveryDocumentDto mapDocToDto(DeliveryDocument doc) {
        DeliveryDocumentDto dto = new DeliveryDocumentDto();
        dto.setId(doc.getId());
        dto.setType(doc.getType());
        dto.setFileUrl(doc.getFileUrl());
        dto.setStatus(doc.getStatus());
        dto.setExpiryDate(doc.getExpiryDate());

        if (doc.getExpiryDate() != null) {
            long daysToExpiry = ChronoUnit.DAYS.between(LocalDate.now(), doc.getExpiryDate());
            dto.setExpiringSoon(daysToExpiry >= 0 && daysToExpiry <= 30);
        } else {
            dto.setExpiringSoon(false);
        }

        return dto;
    }
}
