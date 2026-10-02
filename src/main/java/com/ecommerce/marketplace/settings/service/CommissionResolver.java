package com.ecommerce.marketplace.settings.service;

import com.ecommerce.marketplace.catalog.entity.Category;
import com.ecommerce.marketplace.catalog.repository.CategoryRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommissionResolver {

    private final PlatformSettingService settingService;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;

    public BigDecimal resolveCommission(UUID sellerId, UUID categoryId) {
        // 1. Check Seller Override (if entity has it, here simulated by fetching seller)
        Seller seller = sellerRepository.findById(sellerId).orElse(null);
        if (seller != null && seller.getCommissionOverridePct() != null) {
            return seller.getCommissionOverridePct();
        }
        // Assuming Seller might have commission override in Phase 2, if yes return it.
        // For Phase 1 we stick to the Prompt: "global -> category -> seller" but Wait:
        // "CommissionResolver hierarchy (global -> category -> seller)".
        // Wait, global is lowest precedence!
        // 1. Seller override
        // Assuming seller doesn't have it yet, we just check category.
        
        // 2. Category commission
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null && category.getCommissionPct() != null) {
                return category.getCommissionPct();
            }
        }
        
        // 3. Global default
        return settingService.getBigDecimal("GLOBAL_COMMISSION_PCT", new BigDecimal("5.00"));
    }
}
