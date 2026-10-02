package com.ecommerce.marketplace.catalog.service;

import com.ecommerce.marketplace.catalog.dto.BrandDto;
import com.ecommerce.marketplace.catalog.dto.BrandRequest;
import com.ecommerce.marketplace.catalog.dto.CategoryDto;
import com.ecommerce.marketplace.catalog.dto.CategoryRequest;
import com.ecommerce.marketplace.catalog.dto.ProductCreateRequest;
import com.ecommerce.marketplace.catalog.dto.ProductDto;

import com.ecommerce.marketplace.catalog.dto.ProductUpdateRequest;
import com.ecommerce.marketplace.catalog.dto.ProductVariantDto;
import com.ecommerce.marketplace.catalog.dto.ProductVariantRequest;
import com.ecommerce.marketplace.catalog.entity.Brand;
import com.ecommerce.marketplace.catalog.entity.Category;
import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.entity.ProductSubmissionSnapshot;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.catalog.repository.BrandRepository;
import com.ecommerce.marketplace.catalog.repository.CategoryRepository;
import com.ecommerce.marketplace.catalog.repository.ProductRepository;
import com.ecommerce.marketplace.catalog.repository.ProductSnapshotRepository;
import com.ecommerce.marketplace.catalog.repository.ProductVariantRepository;
import com.ecommerce.marketplace.catalog.spec.ProductSpecification;
import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.common.events.ProductApprovedEvent;
import com.ecommerce.marketplace.common.events.ProductRejectedEvent;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CatalogService {

    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductSnapshotRepository productSnapshotRepository;
    private final SellerRepository sellerRepository;
    private final InventoryRepository inventoryRepository;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher eventPublisher;
    private final com.ecommerce.marketplace.seller.service.KycGate kycGate;
    private final AttributeValidator attributeValidator;

    // --- CATEGORY METHODS ---
    @Cacheable("categories")
    @Transactional(readOnly = true)
    public List<CategoryDto> getCategoryTree() {
        List<Category> allCategories = categoryRepository.findByActiveTrue();
        Map<UUID, List<Category>> byParent = allCategories.stream()
                .filter(c -> c.getParentId() != null)
                .collect(Collectors.groupingBy(Category::getParentId));

        return allCategories.stream()
                .filter(c -> c.getParentId() == null)
                .map(parent -> mapCategoryToDto(parent, byParent))
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "categories", allEntries = true)
    @Transactional
    public CategoryDto createCategory(CategoryRequest request) {
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new ApiException(ErrorCode.SLUG_ALREADY_EXISTS, "Category slug already exists");
        }

        String attrSchemaJson = null;
        if (request.getAttributeSchema() != null) {
            try {
                attrSchemaJson = objectMapper.writeValueAsString(request.getAttributeSchema());
            } catch (JsonProcessingException e) {
                log.error("Failed to serialize category attribute schema", e);
            }
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .parentId(request.getParentId())
                .icon(request.getIcon())
                .commissionPct(request.getCommissionPct() != null ? request.getCommissionPct() : BigDecimal.ZERO)
                .attributeSchemaJson(attrSchemaJson)
                .active(request.getActive() != null ? request.getActive() : true)
                .build();

        category = categoryRepository.save(category);
        return mapCategoryToDto(category, Collections.emptyMap());
    }

    @CacheEvict(value = "categories", allEntries = true)
    @Transactional
    public com.ecommerce.marketplace.catalog.dto.CategoryUpdateResponseDto updateCategory(UUID id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "Category not found"));

        long affectedProducts = 0;
        BigDecimal newCommission = request.getCommissionPct() != null ? request.getCommissionPct() : BigDecimal.ZERO;

        if (category.getCommissionPct() != null && category.getCommissionPct().compareTo(newCommission) != 0) {
            affectedProducts = productRepository.countByCategoryId(id);
        }

        category.setName(request.getName());
        category.setSlug(request.getSlug());
        category.setParentId(request.getParentId());
        category.setIcon(request.getIcon());
        category.setCommissionPct(newCommission);
        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        if (request.getAttributeSchema() != null) {
            category.setAttributeSchemaJson(serializeJson(request.getAttributeSchema()));
        }

        category = categoryRepository.save(category);
        return com.ecommerce.marketplace.catalog.dto.CategoryUpdateResponseDto.builder()
                .category(mapCategoryToDto(category, Collections.emptyMap()))
                .affectedProductsCount(affectedProducts)
                .build();
    }

    @CacheEvict(value = "categories", allEntries = true)
    @Transactional
    public void deleteCategory(UUID id) {
        if (productRepository.countByCategoryId(id) > 0) {
            throw new ApiException(ErrorCode.BUSINESS_RULE_VIOLATION, "Cannot delete category with existing products");
        }
        categoryRepository.deleteById(id);
    }

    // --- BRAND METHODS ---
    @Cacheable("brands")
    @Transactional(readOnly = true)
    public List<BrandDto> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(b -> BrandDto.builder().id(b.getId()).name(b.getName()).slug(b.getSlug()).logo(b.getLogo()).build())
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "brands", allEntries = true)
    @Transactional
    public BrandDto createBrand(BrandRequest request) {
        if (brandRepository.existsBySlug(request.getSlug())) {
            throw new ApiException(ErrorCode.SLUG_ALREADY_EXISTS, "Brand slug already exists");
        }

        Brand brand = Brand.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .logo(request.getLogo())
                .build();

        brand = brandRepository.save(brand);
        return BrandDto.builder().id(brand.getId()).name(brand.getName()).slug(brand.getSlug()).logo(brand.getLogo()).build();
    }

    @CacheEvict(value = "brands", allEntries = true)
    @Transactional
    public BrandDto updateBrand(UUID id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "Brand not found"));

        brand.setName(request.getName());
        brand.setSlug(request.getSlug());
        brand.setLogo(request.getLogo());

        brand = brandRepository.save(brand);
        return BrandDto.builder().id(brand.getId()).name(brand.getName()).slug(brand.getSlug()).logo(brand.getLogo()).build();
    }

    @CacheEvict(value = "brands", allEntries = true)
    @Transactional
    public void deleteBrand(UUID id) {
        if (productRepository.countByBrandId(id) > 0) {
            throw new ApiException(ErrorCode.BUSINESS_RULE_VIOLATION, "Cannot delete brand with existing products");
        }
        brandRepository.deleteById(id);
    }

    // --- PRODUCT PUBLIC & CUSTOMER METHODS ---
    @Transactional(readOnly = true)
    public PageResponse<ProductDto> getPublicProducts(
            String q, UUID categoryId, UUID brandId, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {

        Page<Product> page = productRepository.findAll(
                ProductSpecification.filter(q, categoryId, brandId, null, ProductStatus.APPROVED, minPrice, maxPrice, true),
                pageable
        );

        return PageResponse.from(page.map(this::mapProductToDto));
    }

    @Transactional(readOnly = true)
    public ProductDto getPublicProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndDeletedAtIsNull(slug)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        if (product.getStatus() != ProductStatus.APPROVED) {
            throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND, "Product is not available");
        }

        return mapProductToDto(product);
    }

    // --- PRODUCT SELLER METHODS ---
    @Transactional(readOnly = true)
    public PageResponse<ProductDto> getSellerProducts(UUID userId, Pageable pageable) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Page<Product> page = productRepository.findAll(
                ProductSpecification.filter(null, null, null, seller.getId(), null, null, null, false),
                pageable
        );

        return PageResponse.from(page.map(this::mapProductToDto));
    }

    @Transactional
    public ProductDto createProduct(UUID userId, ProductCreateRequest request) {
        kycGate.checkKycApproved(userId);
        
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        if (productRepository.existsBySlug(request.getSlug())) {
            throw new ApiException(ErrorCode.SLUG_ALREADY_EXISTS, "Product slug already exists");
        }

        for (ProductVariantRequest vr : request.getVariants()) {
            if (productVariantRepository.existsBySku(vr.getSku())) {
                throw new ApiException(ErrorCode.SKU_ALREADY_EXISTS, "Variant SKU " + vr.getSku() + " already exists");
            }
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));

        if (request.getAttributes() != null) {
            attributeValidator.validateAttributes(category.getAttributeSchemaJson(), request.getAttributes());
        }

        String imagesJson = serializeJson(request.getImages());
        String attributesJson = serializeJson(request.getAttributes());

        Product product = Product.builder()
                .sellerId(seller.getId())
                .categoryId(request.getCategoryId())
                .brandId(request.getBrandId())
                .title(request.getTitle())
                .slug(request.getSlug())
                .description(request.getDescription())
                .imagesJson(imagesJson)
                .attributesJson(attributesJson)
                .status(ProductStatus.DRAFT)
                .build();

        product = productRepository.save(product);

        for (ProductVariantRequest vr : request.getVariants()) {
            ProductVariant variant = ProductVariant.builder()
                    .productId(product.getId())
                    .sku(vr.getSku())
                    .optionsJson(serializeJson(vr.getOptions()))
                    .mrp(vr.getMrp())
                    .price(vr.getPrice())
                    .imagesJson(serializeJson(vr.getImages()))
                    .active(vr.getActive() != null ? vr.getActive() : true)
                    .build();

            productVariantRepository.save(variant);

            // Create initial Inventory row for variant
            Inventory inventory = Inventory.builder()
                    .productId(product.getId())
                    .variantSku(vr.getSku())
                    .sellerId(seller.getId())
                    .qtyAvailable(0)
                    .qtyReserved(0)
                    .lowStockThreshold(5)
                    .build();
            inventoryRepository.save(inventory);
        }

        return mapProductToDto(product);
    }

    @Transactional
    public ProductDto updateProduct(UUID userId, UUID productId, ProductUpdateRequest request) {
        kycGate.checkKycApproved(userId);

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Product product = productRepository.findByIdAndSellerIdAndDeletedAtIsNull(productId, seller.getId())
                .orElseThrow(() -> new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this product"));

        if (!product.getSlug().equals(request.getSlug()) && productRepository.existsBySlug(request.getSlug())) {
            throw new ApiException(ErrorCode.SLUG_ALREADY_EXISTS, "Product slug already exists");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));

        if (request.getAttributes() != null) {
            attributeValidator.validateAttributes(category.getAttributeSchemaJson(), request.getAttributes());
        }

        product.setCategoryId(request.getCategoryId());
        product.setBrandId(request.getBrandId());
        product.setTitle(request.getTitle());
        product.setSlug(request.getSlug());
        product.setDescription(request.getDescription());
        product.setImagesJson(serializeJson(request.getImages()));
        product.setAttributesJson(serializeJson(request.getAttributes()));

        product = productRepository.save(product);
        return mapProductToDto(product);
    }

    @Transactional
    public ProductDto submitProductForApproval(UUID userId, UUID productId) {
        kycGate.checkKycApproved(userId);

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Product product = productRepository.findByIdAndSellerIdAndDeletedAtIsNull(productId, seller.getId())
                .orElseThrow(() -> new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this product"));

        product.setStatus(ProductStatus.PENDING_APPROVAL);
        product.setRejectionRemarks(null);
        product = productRepository.save(product);

        // Save submission snapshot for admin diff view
        ProductDto dto = mapProductToDto(product);
        ProductSubmissionSnapshot snapshot = ProductSubmissionSnapshot.builder()
                .productId(product.getId())
                .snapshotJson(serializeJson(dto))
                .build();
        productSnapshotRepository.save(snapshot);

        return dto;
    }

    @Transactional
    public void deleteProduct(UUID userId, UUID productId) {
        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Product product = productRepository.findByIdAndSellerIdAndDeletedAtIsNull(productId, seller.getId())
                .orElseThrow(() -> new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this product"));

        product.setDeletedAt(java.time.Instant.now());
        productRepository.save(product);
    }

    @Transactional
    public ProductDto duplicateProduct(UUID userId, UUID productId) {
        kycGate.checkKycApproved(userId);

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));

        Product product = productRepository.findByIdAndSellerIdAndDeletedAtIsNull(productId, seller.getId())
                .orElseThrow(() -> new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this product"));

        Product duplicate = Product.builder()
                .sellerId(seller.getId())
                .categoryId(product.getCategoryId())
                .brandId(product.getBrandId())
                .title("Copy of " + product.getTitle())
                .slug(product.getSlug() + "-copy-" + UUID.randomUUID().toString().substring(0, 8))
                .description(product.getDescription())
                .imagesJson(product.getImagesJson())
                .attributesJson(product.getAttributesJson())
                .status(ProductStatus.DRAFT)
                .build();

        duplicate = productRepository.save(duplicate);

        List<ProductVariant> variants = productVariantRepository.findByProductId(productId);
        for (ProductVariant vr : variants) {
            ProductVariant dupVariant = ProductVariant.builder()
                    .productId(duplicate.getId())
                    .sku(vr.getSku() + "-COPY-" + UUID.randomUUID().toString().substring(0, 4))
                    .optionsJson(vr.getOptionsJson())
                    .mrp(vr.getMrp())
                    .price(vr.getPrice())
                    .imagesJson(vr.getImagesJson())
                    .active(vr.isActive())
                    .build();
            productVariantRepository.save(dupVariant);

            Inventory inventory = Inventory.builder()
                    .productId(duplicate.getId())
                    .variantSku(dupVariant.getSku())
                    .sellerId(seller.getId())
                    .qtyAvailable(0)
                    .qtyReserved(0)
                    .lowStockThreshold(5)
                    .build();
            inventoryRepository.save(inventory);
        }

        return mapProductToDto(duplicate);
    }

    @Transactional
    public List<ProductDto> bulkCreateProducts(UUID userId, List<ProductCreateRequest> requests) {
        kycGate.checkKycApproved(userId);
        List<ProductDto> created = new ArrayList<>();
        for (ProductCreateRequest request : requests) {
            created.add(createProduct(userId, request));
        }
        return created;
    }

    // --- PRODUCT ADMIN MODERATION METHODS ---
    @Transactional(readOnly = true)
    public PageResponse<ProductDto> getAdminProducts(ProductStatus status, Pageable pageable) {
        Page<Product> page = productRepository.findAll(
                ProductSpecification.filter(null, null, null, null, status, null, null, false),
                pageable
        );
        return PageResponse.from(page.map(this::mapProductToDto));
    }


    public PageResponse<ProductDto> getAdminFilteredProducts(UUID sellerId, UUID categoryId, ProductStatus status, Pageable pageable) {
        Page<Product> page = productRepository.findAll(
                ProductSpecification.filter(null, categoryId, null, sellerId, status, null, null, false),
                pageable
        );
        return PageResponse.from(page.map(this::mapProductToDto));
    }

    @Transactional
    public ProductDto approveProduct(UUID productId, com.ecommerce.marketplace.admin.dto.catalog.ProductApproveRequest request) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setStatus(ProductStatus.APPROVED);
        product.setRejectionRemarks(null);
        productRepository.save(product);
        eventPublisher.publishEvent(new com.ecommerce.marketplace.common.events.ProductApprovedEvent(product.getId(), product.getSellerId(), product.getTitle()));

        return mapProductToDto(product);
    }

    @Transactional
    public ProductDto rejectProduct(UUID productId, com.ecommerce.marketplace.admin.dto.catalog.ProductRejectRequest request) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setStatus(ProductStatus.REJECTED);
        product.setRejectionRemarks(request.getRemarks());
        productRepository.save(product);
        eventPublisher.publishEvent(new com.ecommerce.marketplace.common.events.ProductRejectedEvent(product.getId(), product.getSellerId(), product.getTitle(), request.getRemarks()));

        return mapProductToDto(product);
    }

    @Transactional
    public ProductDto requestChangesForProduct(UUID productId, com.ecommerce.marketplace.admin.dto.catalog.ProductRejectRequest request) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setStatus(ProductStatus.DRAFT);
        product.setRejectionRemarks(request.getRemarks());
        productRepository.save(product);

        return mapProductToDto(product);
    }

    @Transactional
    public ProductDto disableProduct(UUID productId) {
        Product product = productRepository.findByIdAndDeletedAtIsNull(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setStatus(ProductStatus.DISABLED);
        productRepository.save(product);

        return mapProductToDto(product);
    }

    @Transactional(readOnly = true)
    public com.ecommerce.marketplace.admin.dto.catalog.ProductDiffDto getProductDiff(UUID productId) {
        List<ProductSubmissionSnapshot> snaps = productSnapshotRepository.findByProductIdOrderByCreatedAtDesc(productId);
        Object current = null;
        Object previous = null;
        try {
            if (snaps.size() > 0) {
                current = objectMapper.readValue(snaps.get(0).getSnapshotJson(), Object.class);
            }
            if (snaps.size() > 1) {
                previous = objectMapper.readValue(snaps.get(1).getSnapshotJson(), Object.class);
            }
        } catch (Exception e) {
            // ignore
        }
        return com.ecommerce.marketplace.admin.dto.catalog.ProductDiffDto.builder()
                .productId(productId)
                .currentSnapshot(current)
                .previousSnapshot(previous)
                .build();
    }


    @org.springframework.cache.annotation.Cacheable(value = "searchSuggestions", key = "#q")
    @Transactional(readOnly = true)
    public List<String> getSearchSuggestions(String q) {
        if (q == null || q.isBlank()) return Collections.emptyList();
        String searchPattern = "%" + q.toLowerCase() + "%";
        // Simple distinct titles for autocomplete
        List<Product> products = productRepository.findAll(
                ProductSpecification.filter(q, null, null, null, ProductStatus.APPROVED, null, null, true),
                org.springframework.data.domain.PageRequest.of(0, 5)
        ).getContent();
        return products.stream().map(Product::getTitle).distinct().collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public com.ecommerce.marketplace.seller.dto.SellerDto getPublicSellerStore(String slug) {
        // Here we ideally find by seller store slug. But Seller doesn't have a slug field yet.
        // I will find by user id string for now if it is a UUID, or handle accordingly.
        // Wait, the prompt says /sellers/{slug}. Let's assume store slug is available or use ID.
        // For now let's just find by ID.
        Seller seller = sellerRepository.findByStoreSlug(slug).orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
            if (seller.isHolidayMode() || seller.getKycStatus() != com.ecommerce.marketplace.seller.entity.KycStatus.APPROVED) {
                throw new ApiException(ErrorCode.SELLER_NOT_FOUND, "Seller unavailable");
            }
            return com.ecommerce.marketplace.seller.dto.SellerDto.builder()
                    .id(seller.getId())
                    .storeName(seller.getStoreName())
                    .description(seller.getDescription())
                    .rating(seller.getRating())
                    
                    .build();

    }

    @Transactional(readOnly = true)
    public PageResponse<ProductDto> getPublicSellerProducts(String slug, Pageable pageable) {
        Seller seller = sellerRepository.findByStoreSlug(slug).orElseThrow(() -> new ApiException(ErrorCode.SELLER_NOT_FOUND));
        Page<Product> page = productRepository.findAll(
                ProductSpecification.filter(null, null, null, seller.getId(), ProductStatus.APPROVED, null, null, true),
                pageable
        );
            return PageResponse.from(page.map(this::mapProductToDto));

    }

    @org.springframework.cache.annotation.Cacheable("homeData")
    @Transactional(readOnly = true)
    public java.util.Map<String, Object> getHomeData() {
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        // trending
        data.put("trending", productRepository.findAll(
                ProductSpecification.filter(null, null, null, null, ProductStatus.APPROVED, null, null, true),
                org.springframework.data.domain.PageRequest.of(0, 10, org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "soldCount"))
        ).map(this::mapProductToDto).getContent());
        // top-rated
        data.put("topRated", productRepository.findAll(
                ProductSpecification.filter(null, null, null, null, ProductStatus.APPROVED, null, null, true),
                org.springframework.data.domain.PageRequest.of(0, 10, org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "ratingAvg"))
        ).map(this::mapProductToDto).getContent());
        
        return data;
    }

    // --- MAPPING HELPERS ---

    private CategoryDto mapCategoryToDto(Category c, Map<UUID, List<Category>> byParent) {
        List<Category> children = byParent.getOrDefault(c.getId(), Collections.emptyList());
        List<CategoryDto> childDtos = children.stream()
                .map(child -> mapCategoryToDto(child, byParent))
                .collect(Collectors.toList());

        Object attrSchema = deserializeJson(c.getAttributeSchemaJson(), Object.class);

        return CategoryDto.builder()
                .id(c.getId())
                .name(c.getName())
                .slug(c.getSlug())
                .parentId(c.getParentId())
                .icon(c.getIcon())
                .commissionPct(c.getCommissionPct())
                .attributeSchema(attrSchema)
                .active(c.isActive())
                .subcategories(childDtos)
                .build();
    }

    public ProductDto mapProductToDto(Product p) {
        String sellerStoreName = sellerRepository.findById(p.getSellerId()).map(Seller::getStoreName).orElse(null);
        String categoryName = categoryRepository.findById(p.getCategoryId()).map(Category::getName).orElse(null);
        String brandName = p.getBrandId() != null ? brandRepository.findById(p.getBrandId()).map(Brand::getName).orElse(null) : null;

        List<ProductVariant> variants = productVariantRepository.findByProductId(p.getId());
        List<ProductVariantDto> variantDtos = variants.stream().map(v -> ProductVariantDto.builder()
                .id(v.getId())
                .productId(v.getProductId())
                .sku(v.getSku())
                .options(deserializeJson(v.getOptionsJson(), Object.class))
                .mrp(v.getMrp())
                .price(v.getPrice())
                .images(deserializeJsonList(v.getImagesJson(), String.class))
                .active(v.isActive())
                .build()).collect(Collectors.toList());

        return ProductDto.builder()
                .id(p.getId())
                .sellerId(p.getSellerId())
                .sellerStoreName(sellerStoreName)
                .categoryId(p.getCategoryId())
                .categoryName(categoryName)
                .brandId(p.getBrandId())
                .brandName(brandName)
                .title(p.getTitle())
                .slug(p.getSlug())
                .description(p.getDescription())
                .images(deserializeJsonList(p.getImagesJson(), String.class))
                .attributes(deserializeJson(p.getAttributesJson(), Object.class))
                .status(p.getStatus())
                .rejectionRemarks(p.getRejectionRemarks())
                .ratingAvg(p.getRatingAvg())
                .ratingCount(p.getRatingCount())
                .soldCount(p.getSoldCount())
                .version(p.getVersion())
                .variants(variantDtos)
                .createdAt(p.getCreatedAt())
                .build();
    }

    private String serializeJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize JSON object", e);
            return null;
        }
    }

    private <T> T deserializeJson(String json, Class<T> clazz) {
        if (json == null) return null;
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            log.error("Failed to deserialize JSON string", e);
            return null;
        }
    }

    private <T> List<T> deserializeJsonList(String json, Class<T> clazz) {
        if (json == null) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (JsonProcessingException e) {
            log.error("Failed to deserialize JSON list", e);
            return Collections.emptyList();
        }
    }
}
