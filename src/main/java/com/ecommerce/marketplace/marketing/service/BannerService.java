package com.ecommerce.marketplace.marketing.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.marketing.dto.BannerDto;
import com.ecommerce.marketplace.marketing.dto.BannerRequest;
import com.ecommerce.marketplace.marketing.entity.Banner;
import com.ecommerce.marketplace.marketing.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    @Cacheable("activeBanners")
    @Transactional(readOnly = true)
    public List<BannerDto> getActiveBanners() {
        return bannerRepository.findByActiveTrueOrderBySortOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BannerDto> getAllBannersForAdmin() {
        return bannerRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "activeBanners", allEntries = true)
    @Transactional
    public BannerDto createBanner(BannerRequest request) {
        Banner banner = Banner.builder()
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .linkUrl(request.getLinkUrl())
                .position(request.getPosition())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .active(request.getActive() != null ? request.getActive() : true)
                .startsAt(request.getStartsAt())
                .endsAt(request.getEndsAt())
                .build();

        banner = bannerRepository.save(banner);
        return mapToDto(banner);
    }

    @CacheEvict(value = "activeBanners", allEntries = true)
    @Transactional
    public BannerDto updateBanner(UUID id, BannerRequest request) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.BANNER_NOT_FOUND));

        banner.setTitle(request.getTitle());
        banner.setImageUrl(request.getImageUrl());
        banner.setLinkUrl(request.getLinkUrl());
        banner.setPosition(request.getPosition());
        if (request.getSortOrder() != null) banner.setSortOrder(request.getSortOrder());
        if (request.getActive() != null) banner.setActive(request.getActive());
        banner.setStartsAt(request.getStartsAt());
        banner.setEndsAt(request.getEndsAt());

        banner = bannerRepository.save(banner);
        return mapToDto(banner);
    }

    @CacheEvict(value = "activeBanners", allEntries = true)
    @Transactional
    public void deleteBanner(UUID id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.BANNER_NOT_FOUND));
        bannerRepository.delete(banner);
    }

    private BannerDto mapToDto(Banner b) {
        return BannerDto.builder()
                .id(b.getId())
                .title(b.getTitle())
                .imageUrl(b.getImageUrl())
                .linkUrl(b.getLinkUrl())
                .position(b.getPosition())
                .sortOrder(b.getSortOrder())
                .active(b.isActive())
                .startsAt(b.getStartsAt())
                .endsAt(b.getEndsAt())
                .build();
    }
}
