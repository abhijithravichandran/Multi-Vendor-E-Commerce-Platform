package com.ecommerce.marketplace.cart;

import com.ecommerce.marketplace.cart.dto.AddToCartRequest;
import com.ecommerce.marketplace.cart.dto.PricedCartDto;
import com.ecommerce.marketplace.cart.entity.Cart;
import com.ecommerce.marketplace.cart.entity.CartItem;
import com.ecommerce.marketplace.cart.repository.CartItemRepository;
import com.ecommerce.marketplace.cart.repository.CartRepository;
import com.ecommerce.marketplace.cart.service.CartService;
import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.coupon.service.CouponService;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.inventory.entity.Inventory;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private CartItemRepository cartItemRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private ProductVariantRepository productVariantRepository;
    @Mock
    private SellerRepository sellerRepository;
    @Mock
    private CouponService couponService;
    @Mock
    private InventoryRepository inventoryRepository;
    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private CartService cartService;

    private UUID userId;
    private Cart cart;
    private Product product;
    private ProductVariant variant;
    private Seller seller;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        cart = Cart.builder().userId(userId).build();
        cart.setId(UUID.randomUUID());

        UUID sellerId = UUID.randomUUID();
        seller = Seller.builder().storeName("Tech Store").build();
        seller.setId(sellerId);

        product = Product.builder().title("Smartphone").slug("smartphone").sellerId(sellerId).build();
        product.setId(UUID.randomUUID());

        variant = ProductVariant.builder().productId(product.getId()).sku("SKU-SMART").price(BigDecimal.valueOf(1000)).active(true).build();
        variant.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should return fully priced cart grouped by seller")
    void getPricedCart_Success() {
        CartItem item = CartItem.builder()
                .cartId(cart.getId())
                .productId(product.getId())
                .variantSku("SKU-SMART")
                .sellerId(seller.getId())
                .qty(2)
                .priceSnapshot(BigDecimal.valueOf(1000))
                .savedForLater(false)
                .build();

        when(cartRepository.findByUserId(userId)).thenReturn(Optional.of(cart));
        when(cartItemRepository.findByCartId(cart.getId())).thenReturn(List.of(item));
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(productVariantRepository.findBySku("SKU-SMART")).thenReturn(Optional.of(variant));
        when(sellerRepository.findById(seller.getId())).thenReturn(Optional.of(seller));
        Inventory inv = Inventory.builder().qtyAvailable(10).build();
        when(inventoryRepository.findByVariantSku("SKU-SMART")).thenReturn(Optional.of(inv));

        PricedCartDto pricedCart = cartService.getPricedCart(userId);

        assertNotNull(pricedCart);
        assertEquals(BigDecimal.valueOf(2000), pricedCart.getCartSubtotal());
        assertEquals(1, pricedCart.getSellerGroups().size());
        assertEquals("Tech Store", pricedCart.getSellerGroups().getFirst().getSellerStoreName());
    }

    @Test
    @DisplayName("Should add item to cart successfully")
    void addItem_Success() {
        AddToCartRequest req = new AddToCartRequest(product.getId(), "SKU-SMART", 1);

        when(cartRepository.findByUserId(userId)).thenReturn(Optional.of(cart));
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(productVariantRepository.findBySku("SKU-SMART")).thenReturn(Optional.of(variant));
        when(cartItemRepository.findByCartIdAndVariantSku(cart.getId(), "SKU-SMART")).thenReturn(Optional.empty());

        cartService.addItem(userId, req);

        verify(cartItemRepository).save(any(CartItem.class));
    }
}
