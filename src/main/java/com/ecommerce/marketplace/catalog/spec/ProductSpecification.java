package com.ecommerce.marketplace.catalog.spec;

import com.ecommerce.marketplace.catalog.entity.Product;
import com.ecommerce.marketplace.catalog.entity.ProductStatus;
import com.ecommerce.marketplace.catalog.entity.ProductVariant;
import com.ecommerce.marketplace.seller.entity.Seller;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ProductSpecification {

    public static Specification<Product> filter(
            String q,
            UUID categoryId,
            UUID brandId,
            UUID sellerId,
            ProductStatus status,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            boolean excludeHolidaySellers) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Exclude soft deleted
            predicates.add(criteriaBuilder.isNull(root.get("deletedAt")));

            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (categoryId != null) {
                predicates.add(criteriaBuilder.equal(root.get("categoryId"), categoryId));
            }

            if (brandId != null) {
                predicates.add(criteriaBuilder.equal(root.get("brandId"), brandId));
            }

            if (sellerId != null) {
                predicates.add(criteriaBuilder.equal(root.get("sellerId"), sellerId));
            }

            if (q != null && !q.isBlank()) {
                String searchPattern = "%" + q.toLowerCase() + "%";
                Predicate titleLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), searchPattern);
                Predicate descLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchPattern);
                predicates.add(criteriaBuilder.or(titleLike, descLike));
            }

            if (excludeHolidaySellers) {
                Subquery<UUID> subquery = query.subquery(UUID.class);
                Root<Seller> sellerRoot = subquery.from(Seller.class);
                subquery.select(sellerRoot.get("id"))
                        .where(criteriaBuilder.equal(sellerRoot.get("holidayMode"), true));
                predicates.add(criteriaBuilder.not(root.get("sellerId").in(subquery)));
            }

            if (minPrice != null || maxPrice != null) {
                query.distinct(true);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
