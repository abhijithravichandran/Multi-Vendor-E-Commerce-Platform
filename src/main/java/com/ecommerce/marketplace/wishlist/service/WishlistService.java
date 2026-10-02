package com.ecommerce.marketplace.wishlist.service;

import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.catalog.service.CatalogService;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.wishlist.dto.WishlistDto;
import com.ecommerce.marketplace.wishlist.entity.WishlistItem;
import com.ecommerce.marketplace.wishlist.repository.WishlistRepository;
import com.ecommerce.marketplace.cart.service.CartService;
import com.ecommerce.marketplace.cart.dto.AddToCartRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CatalogService catalogService;
    private final CartService cartService;

    @Transactional(readOnly = true)
    
    private WishlistDto mapToDto(WishlistItem item, Product product) {
        BigDecimal minPrice = BigDecimal.ZERO;
        if (product != null) {
            minPrice = productVariantRepository.findByProductId(product.getId()).stream()
                .map(ProductVariant::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
        }
        boolean priceDropped = product != null && item.getPriceAtAdd().compareTo(minPrice) > 0;
        
        return mapToDto(item, product);
    }

    @Transactional(readOnly = true)
    public List<WishlistDto> getWishlist(UUID userId) {
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId()).orElse(null);
                    return mapToDto(item, product);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public WishlistDto addToWishlist(UUID userId, UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            WishlistItem item = wishlistRepository.findByUserIdAndProductId(userId, productId).orElseThrow();
            return mapToDto(item, product);
        }

        List<ProductVariant> variants = productVariantRepository.findByProductId(productId);
        BigDecimal minPrice = variants.stream()
                .map(ProductVariant::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        WishlistItem item = WishlistItem.builder()
                .userId(userId)
                .productId(productId)
                .priceAtAdd(minPrice)
                .build();

        item = wishlistRepository.save(item);

        return mapToDto(item, product);
    }

    @Transactional
    public void removeFromWishlist(UUID userId, UUID productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void moveToCart(UUID userId, UUID productId, String variantSku) {
        removeFromWishlist(userId, productId);
        AddToCartRequest req = new AddToCartRequest();
        req.setProductId(productId);
        req.setVariantSku(variantSku);
        req.setQty(1);
        cartService.addItem(userId, req);
    }
}