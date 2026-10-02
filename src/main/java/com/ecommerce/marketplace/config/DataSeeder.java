package com.ecommerce.marketplace.config;

import com.ecommerce.marketplace.catalog.entity.Brand;
import com.ecommerce.marketplace.catalog.entity.Category;
import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.BrandRepository;
import com.ecommerce.marketplace.catalog.repository.CategoryRepository;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.coupon.entity.Coupon;
import com.ecommerce.marketplace.coupon.entity.CouponFundedBy;
import com.ecommerce.marketplace.coupon.entity.CouponScope;
import com.ecommerce.marketplace.coupon.entity.CouponType;
import com.ecommerce.marketplace.coupon.repository.CouponRepository;
import com.ecommerce.marketplace.delivery.entity.DeliveryPartner;
import com.ecommerce.marketplace.delivery.entity.DeliveryPartnerStatus;
import com.ecommerce.marketplace.delivery.entity.VehicleType;
import com.ecommerce.marketplace.delivery.repository.DeliveryPartnerRepository;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.marketing.entity.Banner;
import com.ecommerce.marketplace.marketing.repository.BannerRepository;
import com.ecommerce.marketplace.review.entity.Review;
import com.ecommerce.marketplace.review.entity.ReviewStatus;
import com.ecommerce.marketplace.review.repository.ReviewRepository;
import com.ecommerce.marketplace.seller.dto.BankAccountDto;
import com.ecommerce.marketplace.seller.dto.PickupAddressDto;
import com.ecommerce.marketplace.seller.entity.KycStatus;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.ecommerce.marketplace.user.entity.AdminRole;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import com.ecommerce.marketplace.user.entity.UserStatus;
import com.ecommerce.marketplace.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final DeliveryPartnerRepository deliveryPartnerRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final InventoryRepository inventoryRepository;
    private final CouponRepository couponRepository;
    private final ReviewRepository reviewRepository;
    private final BannerRepository bannerRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Value("${app.admin.initial-email:admin@marketplace.com}")
    private String adminEmail;

    @Value("${app.admin.initial-password:Admin@123456}")
    private String adminPassword;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            log.info("DataSeeder: Database already populated. Skipping seeding.");
            return;
        }

        log.info("DataSeeder: Populating demo data for dev profile...");

        // 1. Seed Super Admin
        User admin = User.builder()
                .name("Super Admin")
                .email(adminEmail)
                .phone("+1000000000")
                .passwordHash(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN)
                .adminRole(AdminRole.SUPER_ADMIN)
                .status(UserStatus.ACTIVE)
                .emailVerified(true)
                .phoneVerified(true)
                .build();
        userRepository.save(admin);

        // 2. Seed 20 Customers
        List<User> customers = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            User c = User.builder()
                    .name("Customer " + i)
                    .email("customer" + i + "@example.com")
                    .phone("+190000000" + (i < 10 ? "0" + i : i))
                    .passwordHash(passwordEncoder.encode("Password@123"))
                    .role(Role.CUSTOMER)
                    .status(UserStatus.ACTIVE)
                    .emailVerified(true)
                    .phoneVerified(true)
                    .build();
            customers.add(userRepository.save(c));
        }

        // 3. Seed 6 Sellers with Mixed KYC States
        List<Seller> sellers = new ArrayList<>();
        KycStatus[] kycStates = {KycStatus.APPROVED, KycStatus.APPROVED, KycStatus.PENDING, KycStatus.REJECTED, KycStatus.NOT_SUBMITTED, KycStatus.APPROVED};
        for (int i = 1; i <= 6; i++) {
            User su = User.builder()
                    .name("Seller User " + i)
                    .email("seller" + i + "@example.com")
                    .phone("+180000000" + i)
                    .passwordHash(passwordEncoder.encode("Password@123"))
                    .role(Role.SELLER)
                    .status(UserStatus.ACTIVE)
                    .emailVerified(true)
                    .phoneVerified(true)
                    .build();
            su = userRepository.save(su);

            BankAccountDto bank = BankAccountDto.builder().holder("Seller " + i).number("1234567890" + i).ifsc("SBIN000123" + i).build();
            PickupAddressDto address = PickupAddressDto.builder().name("Warehouse " + i).phone("+180000000" + i).line1("Street " + i).city("City " + i).state("State").pincode("56000" + i).build();

            Seller s = Seller.builder()
                    .userId(su.getId())
                    .storeName("TechStore " + i)
                    .storeSlug("tech-store-" + i)
                    .logo("https://via.placeholder.com/150")
                    .banner("https://via.placeholder.com/800x200")
                    .description("Top rated seller for electronic items and accessories.")
                    .gstin("29ABCDE1234F" + i + "Z5")
                    .pan("ABCDE1234" + i)
                    .bankAccountJson(objectMapper.writeValueAsString(bank))
                    .pickupAddressJson(objectMapper.writeValueAsString(address))
                    .kycStatus(kycStates[i - 1])
                    .rating(BigDecimal.valueOf(4.2 + (i * 0.1)))
                    .followerCount(100 * i)
                    .build();
            sellers.add(sellerRepository.save(s));
        }

        // 4. Seed 4 Delivery Partners
        for (int i = 1; i <= 4; i++) {
            User du = User.builder()
                    .name("Delivery Partner " + i)
                    .email("delivery" + i + "@example.com")
                    .phone("+170000000" + i)
                    .passwordHash(passwordEncoder.encode("Password@123"))
                    .role(Role.DELIVERY)
                    .status(UserStatus.ACTIVE)
                    .build();
            du = userRepository.save(du);

            DeliveryPartner dp = DeliveryPartner.builder()
                    .userId(du.getId())
                    .vehicleType(VehicleType.MOTORCYCLE)
                    .vehicleNumber("KA-01-EQ-" + (1000 + i))
                    .licenseNumber("DL-1420110012" + i)
                    .status(i <= 2 ? DeliveryPartnerStatus.ACTIVE : DeliveryPartnerStatus.PENDING)
                    .isOnline(i == 1)
                    .rating(BigDecimal.valueOf(4.8))
                    .build();
            deliveryPartnerRepository.save(dp);
        }

        // 5. Seed 12 Categories (2-level hierarchy)
        List<Category> rootCategories = new ArrayList<>();
        String[] rootNames = {"Electronics", "Fashion", "Home & Kitchen", "Books & Stationery"};
        for (String rName : rootNames) {
            Category cat = Category.builder()
                    .name(rName)
                    .slug(rName.toLowerCase().replace(" & ", "-").replace(" ", "-"))
                    .icon("folder")
                    .commissionPct(BigDecimal.valueOf(5.0))
                    .active(true)
                    .build();
            rootCategories.add(categoryRepository.save(cat));
        }

        List<Category> allCategories = new ArrayList<>(rootCategories);
        String[][] subCatNames = {
                {"Smartphones", "Laptops"},
                {"Men Clothing", "Women Clothing"},
                {"Cookware", "Decor"},
                {"Fiction", "Non-Fiction"}
        };

        for (int i = 0; i < rootCategories.size(); i++) {
            Category parent = rootCategories.get(i);
            for (String sName : subCatNames[i]) {
                Category subCat = Category.builder()
                        .name(sName)
                        .slug(sName.toLowerCase().replace(" ", "-"))
                        .parentId(parent.getId())
                        .icon("tag")
                        .commissionPct(BigDecimal.valueOf(4.0))
                        .active(true)
                        .build();
                allCategories.add(categoryRepository.save(subCat));
            }
        }

        // 6. Seed 5 Brands
        List<Brand> brands = new ArrayList<>();
        String[] brandNames = {"Apple", "Samsung", "Nike", "Adidas", "Sony"};
        for (String bName : brandNames) {
            Brand b = Brand.builder()
                    .name(bName)
                    .slug(bName.toLowerCase())
                    .logo("https://via.placeholder.com/100")
                    .build();
            brands.add(brandRepository.save(b));
        }

        // 7. Seed 40 Products & Variants
        List<Product> products = new ArrayList<>();
        int productCounter = 1;
        for (int i = 0; i < 40; i++) {
            Seller seller = sellers.get(i % sellers.size());
            Category category = allCategories.get(i % allCategories.size());
            Brand brand = brands.get(i % brands.size());

            Product p = Product.builder()
                    .sellerId(seller.getId())
                    .categoryId(category.getId())
                    .brandId(brand.getId())
                    .title("Premium " + brand.getName() + " Item " + productCounter)
                    .slug("premium-" + brand.getSlug() + "-item-" + productCounter)
                    .description("High quality " + category.getName() + " manufactured by " + brand.getName() + ".")
                    .imagesJson(objectMapper.writeValueAsString(List.of("https://via.placeholder.com/500")))
                    .status(ProductStatus.APPROVED)
                    .ratingAvg(BigDecimal.valueOf(4.5))
                    .ratingCount(15)
                    .soldCount(50)
                    .build();
            p = productRepository.save(p);
            products.add(p);

            String sku = "SKU-" + (10000 + productCounter);
            BigDecimal price = BigDecimal.valueOf(1000 + (productCounter * 50));
            ProductVariant variant = ProductVariant.builder()
                    .productId(p.getId())
                    .sku(sku)
                    .optionsJson(objectMapper.writeValueAsString(java.util.Map.of("color", "Black", "size", "Standard")))
                    .mrp(price.add(BigDecimal.valueOf(200)))
                    .price(price)
                    .active(true)
                    .build();
            productVariantRepository.save(variant);

            Inventory inv = Inventory.builder()
                    .productId(p.getId())
                    .variantSku(sku)
                    .sellerId(seller.getId())
                    .qtyAvailable(100)
                    .qtyReserved(0)
                    .lowStockThreshold(10)
                    .warehouse("Warehouse A")
                    .build();
            inventoryRepository.save(inv);

            productCounter++;
        }

        // 8. Seed 15 Coupons
        for (int i = 1; i <= 15; i++) {
            Coupon coupon = Coupon.builder()
                    .code("WELCOME" + i)
                    .scope(i % 2 == 0 ? CouponScope.PLATFORM : CouponScope.SELLER)
                    .sellerId(i % 2 != 0 ? sellers.getFirst().getId() : null)
                    .type(i % 3 == 0 ? CouponType.FLAT : CouponType.PERCENT)
                    .value(BigDecimal.valueOf(i * 5))
                    .maxDiscount(BigDecimal.valueOf(500))
                    .minOrderValue(BigDecimal.valueOf(499))
                    .validFrom(Instant.now().minusSeconds(86400))
                    .validTo(Instant.now().plusSeconds(86400 * 30))
                    .usageLimit(100)
                    .fundedBy(i % 2 == 0 ? CouponFundedBy.PLATFORM : CouponFundedBy.SELLER)
                    .active(true)
                    .build();
            couponRepository.save(coupon);
        }

        // 9. Seed 60 Reviews
        for (int i = 0; i < 60; i++) {
            Product p = products.get(i % products.size());
            User c = customers.get(i % customers.size());

            Review r = Review.builder()
                    .productId(p.getId())
                    .customerId(c.getId())
                    .verifiedPurchase(true)
                    .rating((i % 5) + 1)
                    .title("Great product " + i)
                    .body("Very satisfied with the purchase quality and speedy delivery!")
                    .status(ReviewStatus.PUBLISHED)
                    .build();
            reviewRepository.save(r);
        }

        // 10. Seed 5 Banners
        for (int i = 1; i <= 5; i++) {
            Banner banner = Banner.builder()
                    .title("Mega Sale Banner " + i)
                    .imageUrl("https://via.placeholder.com/1200x400")
                    .linkUrl("https://marketplace.com/sale")
                    .position("HOME_HERO")
                    .sortOrder(i)
                    .active(true)
                    .startsAt(Instant.now().minusSeconds(86400))
                    .endsAt(Instant.now().plusSeconds(86400 * 60))
                    .build();
            bannerRepository.save(banner);
        }

        log.info("DataSeeder: Demo data seeding finished cleanly!");
    }
}
