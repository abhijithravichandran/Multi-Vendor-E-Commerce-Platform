package com.ecommerce.marketplace.marketing.service;

import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.marketing.entity.FlashSale;
import com.ecommerce.marketplace.marketing.repository.FlashSaleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class FlashSaleScheduler {

    private final FlashSaleRepository flashSaleRepository;
    private final ProductVariantRepository variantRepository;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void updateFlashSales() {
        Instant now = Instant.now();
        
        List<FlashSale> toActivate = flashSaleRepository.findByActiveFalseAndStartTimeBeforeAndEndTimeAfter(now, now);
        for (FlashSale fs : toActivate) {
            ProductVariant variant = variantRepository.findById(fs.getVariantId()).orElse(null);
            if (variant != null) {
                fs.setOriginalPrice(variant.getPrice());
                variant.setPrice(fs.getFlashPrice());
                variantRepository.save(variant);
                fs.setActive(true);
                flashSaleRepository.save(fs);
                log.info("Activated flash sale for variant {}", fs.getVariantId());
            }
        }

        List<FlashSale> toDeactivate = flashSaleRepository.findByActiveTrueAndEndTimeBefore(now);
        for (FlashSale fs : toDeactivate) {
            ProductVariant variant = variantRepository.findById(fs.getVariantId()).orElse(null);
            if (variant != null && fs.getOriginalPrice() != null) {
                variant.setPrice(fs.getOriginalPrice());
                variantRepository.save(variant);
            }
            fs.setActive(false);
            flashSaleRepository.save(fs);
            log.info("Deactivated flash sale for variant {}", fs.getVariantId());
        }
    }
}
