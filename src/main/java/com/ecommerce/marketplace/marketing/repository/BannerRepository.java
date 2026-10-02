package com.ecommerce.marketplace.marketing.repository;

import com.ecommerce.marketplace.marketing.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface BannerRepository extends JpaRepository<Banner, UUID> {
    List<Banner> findByActiveTrueOrderBySortOrderAsc();
}
