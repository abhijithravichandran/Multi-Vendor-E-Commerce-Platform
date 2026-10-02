package com.ecommerce.marketplace.cart.service;

import com.ecommerce.marketplace.cart.dto.AddToCartRequest;
import com.ecommerce.marketplace.cart.dto.PricedCartDto;
import com.ecommerce.marketplace.cart.dto.PricedCartItemDto;
import com.ecommerce.marketplace.cart.dto.SellerCartGroupDto;
import com.ecommerce.marketplace.cart.dto.UpdateCartItemRequest;
import com.ecommerce.marketplace.cart.entity.Cart;
import com.ecommerce.marketplace.cart.entity.CartItem;
import com.ecommerce.marketplace.cart.repository.CartItemRepository;
import com.ecommerce.marketplace.cart.repository.CartRepository;
import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.coupon.dto.CouponResultDto;
import com.ecommerce.marketplace.coupon.service.CouponService;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final SellerRepository sellerRepository;
    private final CouponService couponService;
    private final ObjectMapper objectMapper;
    private final InventoryRepository inventoryRepository;

    @Transactional
    public Cart getOrCreateCart(UUID userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder().userId(userId).build()));
    }

    @Transactional(readOnly = true)
    public PricedCartDto getPricedCart(UUID userId) {
        Cart cart = getOrCreateCart(userId);
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());

        List<PricedCartItemDto> pricedItems = new ArrayList<>();
        List<PricedCartItemDto> savedForLaterItems = new ArrayList<>();

        for (CartItem item : items) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            ProductVariant variant = productVariantRepository.findBySku(item.getVariantSku()).orElse(null);
            Seller seller = sellerRepository.findById(item.getSellerId()).orElse(null);
            Inventory inventory = inventoryRepository.findByVariantSku(item.getVariantSku()).orElse(null);

            List<String> validationMessages = new ArrayList<>();
            boolean isAvailable = true;

            if (product == null || product.getStatus() != ProductStatus.APPROVED || product.getDeletedAt() != null) {
                validationMessages.add("Product is no longer available");
                isAvailable = false;
            }
            if (seller == null || seller.isHolidayMode() || seller.getDeletedAt() != null || seller.getKycStatus() != com.ecommerce.marketplace.seller.entity.KycStatus.APPROVED) {
                validationMessages.add("Seller is no longer available");
                isAvailable = false;
            }
            if (variant == null || !variant.isActive()) {
                validationMessages.add("Variant is no longer available");
                isAvailable = false;
            }

            int qtyAvailable = inventory != null ? inventory.getQtyAvailable() : 0;
            if (qtyAvailable <= 0) {
                validationMessages.add("Out of stock");
            } else if (item.getQty() > qtyAvailable) {
                validationMessages.add("Quantity exceeds available stock (" + qtyAvailable + " available)");
            }

            BigDecimal currentPrice = variant != null ? variant.getPrice() : item.getPriceSnapshot();
            boolean priceChanged = item.getPriceSnapshot().compareTo(currentPrice) != 0;
            if (priceChanged) {
                validationMessages.add("Price changed since added");
            }

            BigDecimal itemTotal = currentPrice.multiply(BigDecimal.valueOf(item.getQty()));

            Object options = null;
            if (variant != null && variant.getOptionsJson() != null) {
                try {
                    options = objectMapper.readValue(variant.getOptionsJson(), Object.class);
                } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
                    log.error("Failed to parse variant options", e);
                }
            }

            PricedCartItemDto itemDto = PricedCartItemDto.builder()
                    .id(item.getId())
                    .productId(item.getProductId())
                    .productTitle(product != null ? product.getTitle() : "Unknown Product")
                    .productSlug(product != null ? product.getSlug() : null)
                    .variantSku(item.getVariantSku())
                    .variantOptions(options)
                    .sellerId(item.getSellerId())
                    .sellerStoreName(seller != null ? seller.getStoreName() : "Seller")
                    .qty(item.getQty())
                    .priceSnapshot(item.getPriceSnapshot())
                    .currentPrice(currentPrice)
                    .priceChanged(priceChanged)
                    .itemTotal(itemTotal)
                    .savedForLater(item.isSavedForLater())
                    .validationMessages(validationMessages)
                    .build();

            if (item.isSavedForLater()) {
                savedForLaterItems.add(itemDto);
            } else {
                pricedItems.add(itemDto);
            }
        }
        // Group by seller
        Map<UUID, List<PricedCartItemDto>> bySeller = pricedItems.stream()
                .collect(Collectors.groupingBy(PricedCartItemDto::getSellerId));

        List<SellerCartGroupDto> sellerGroups = new ArrayList<>();
        BigDecimal cartSubtotal = BigDecimal.ZERO;

        for (Map.Entry<UUID, List<PricedCartItemDto>> entry : bySeller.entrySet()) {
            UUID sellerId = entry.getKey();
            List<PricedCartItemDto> groupItems = entry.getValue();
            String storeName = groupItems.getFirst().getSellerStoreName();

            BigDecimal groupSubtotal = groupItems.stream()
                    .map(PricedCartItemDto::getItemTotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            cartSubtotal = cartSubtotal.add(groupSubtotal);

            BigDecimal shipping = groupSubtotal.compareTo(BigDecimal.valueOf(500)) >= 0 ? BigDecimal.ZERO : BigDecimal.valueOf(50);

            sellerGroups.add(SellerCartGroupDto.builder()
                    .sellerId(sellerId)
                    .sellerStoreName(storeName)
                    .items(groupItems)
                    .subtotal(groupSubtotal)
                    .shippingEstimate(shipping)
                    .build());
        }

        BigDecimal couponDiscount = BigDecimal.ZERO;
        if (cart.getCouponCode() != null && !cart.getCouponCode().isBlank()) {
            CouponResultDto result = couponService.validateCoupon(cart.getCouponCode(), userId, cartSubtotal);
            if (result.isValid()) {
                couponDiscount = result.getDiscountAmount();
            }
        }

        BigDecimal tax = cartSubtotal.multiply(BigDecimal.valueOf(0.18)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalShipping = sellerGroups.stream()
                .map(SellerCartGroupDto::getShippingEstimate)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal grandTotal = cartSubtotal.subtract(couponDiscount).add(tax).add(totalShipping);
        if (grandTotal.compareTo(BigDecimal.ZERO) < 0) grandTotal = BigDecimal.ZERO;

        return PricedCartDto.builder()
                .sellerGroups(sellerGroups)
                .savedForLaterItems(savedForLaterItems)
                .cartSubtotal(cartSubtotal)
                .couponCode(cart.getCouponCode())
                .couponDiscount(couponDiscount)
                .tax(tax)
                .shippingEstimate(totalShipping)
                .grandTotal(grandTotal)
                .build();
    }

    @Transactional
    public PricedCartDto addItem(UUID userId, AddToCartRequest request) {
        Cart cart = getOrCreateCart(userId);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductVariant variant = productVariantRepository.findBySku(request.getVariantSku())
                .orElseThrow(() -> new ApiException(ErrorCode.VARIANT_NOT_FOUND));

        CartItem item = cartItemRepository.findByCartIdAndVariantSku(cart.getId(), request.getVariantSku())
                .orElseGet(() -> CartItem.builder()
                        .cartId(cart.getId())
                        .productId(product.getId())
                        .variantSku(variant.getSku())
                        .sellerId(product.getSellerId())
                        .priceSnapshot(variant.getPrice())
                        .qty(0)
                        .savedForLater(false)
                        .build());

        item.setQty(item.getQty() + request.getQty());
        item.setPriceSnapshot(variant.getPrice());
        item.setSavedForLater(false);
        cartItemRepository.save(item);

        return getPricedCart(userId);
    }

    @Transactional
    public PricedCartDto updateItem(UUID userId, UUID itemId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ApiException(ErrorCode.CART_ITEM_NOT_FOUND));

        if (!item.getCartId().equals(cart.getId())) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "Item does not belong to your cart");
        }

        if (request.getQty() != null) {
            item.setQty(request.getQty());
        }
        if (request.getSavedForLater() != null) {
            item.setSavedForLater(request.getSavedForLater());
        }

        cartItemRepository.save(item);
        return getPricedCart(userId);
    }

    @Transactional
    public PricedCartDto removeItem(UUID userId, UUID itemId) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ApiException(ErrorCode.CART_ITEM_NOT_FOUND));

        if (!item.getCartId().equals(cart.getId())) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "Item does not belong to your cart");
        }

        cartItemRepository.delete(item);
        return getPricedCart(userId);
    }

    @Transactional
    public PricedCartDto applyCoupon(UUID userId, String code) {
        Cart cart = getOrCreateCart(userId);
        PricedCartDto pricedCart = getPricedCart(userId);

        CouponResultDto result = couponService.validateCoupon(code, userId, pricedCart.getCartSubtotal());
        if (!result.isValid()) {
            throw new ApiException(ErrorCode.COUPON_INVALID, result.getMessage());
        }

        cart.setCouponCode(code.toUpperCase());
        cartRepository.save(cart);

        return getPricedCart(userId);
    }

    @Transactional
    public PricedCartDto removeCoupon(UUID userId) {
        Cart cart = getOrCreateCart(userId);
        cart.setCouponCode(null);
        cartRepository.save(cart);
        return getPricedCart(userId);
    }

    @Transactional
    public void clear(UUID userId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cartItemRepository.deleteByCartId(cart.getId());
            cart.setCouponCode(null);
            cartRepository.save(cart);
        });
    }
}
