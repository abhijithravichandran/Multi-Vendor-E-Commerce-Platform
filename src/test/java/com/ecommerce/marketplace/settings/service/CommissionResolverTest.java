package com.ecommerce.marketplace.settings.service;

import com.ecommerce.marketplace.catalog.entity.Category;
import com.ecommerce.marketplace.catalog.repository.CategoryRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CommissionResolverTest {

    @Mock
    private PlatformSettingService settingService;
    @Mock
    private SellerRepository sellerRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CommissionResolver commissionResolver;

    @Test
    void testResolveCommission_SellerOverride() {
        UUID sellerId = UUID.randomUUID();
        UUID categoryId = UUID.randomUUID();

        Seller seller = new Seller();
        seller.setCommissionOverridePct(new BigDecimal("10.5"));

        when(sellerRepository.findById(sellerId)).thenReturn(Optional.of(seller));

        BigDecimal result = commissionResolver.resolveCommission(sellerId, categoryId);

        assertEquals(new BigDecimal("10.5"), result);
    }

    @Test
    void testResolveCommission_CategoryOverride() {
        UUID sellerId = UUID.randomUUID();
        UUID categoryId = UUID.randomUUID();

        when(sellerRepository.findById(sellerId)).thenReturn(Optional.empty());

        Category category = new Category();
        category.setCommissionPct(new BigDecimal("8.0"));
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

        BigDecimal result = commissionResolver.resolveCommission(sellerId, categoryId);

        assertEquals(new BigDecimal("8.0"), result);
    }

    @Test
    void testResolveCommission_GlobalDefault() {
        UUID sellerId = UUID.randomUUID();
        UUID categoryId = UUID.randomUUID();

        when(sellerRepository.findById(sellerId)).thenReturn(Optional.empty());
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        when(settingService.getBigDecimal(eq("GLOBAL_COMMISSION_PCT"), any())).thenReturn(new BigDecimal("5.00"));

        BigDecimal result = commissionResolver.resolveCommission(sellerId, categoryId);

        assertEquals(new BigDecimal("5.00"), result);
    }
}
