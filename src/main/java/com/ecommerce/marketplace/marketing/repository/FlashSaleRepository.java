package com.ecommerce.marketplace.marketing.repository;

import com.ecommerce.marketplace.marketing.entity.FlashSale;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface FlashSaleRepository extends JpaRepository<FlashSale, UUID> {
    List<FlashSale> findByActiveFalseAndStartTimeBeforeAndEndTimeAfter(Instant start, Instant end);
    List<FlashSale> findByActiveTrueAndEndTimeBefore(Instant end);
}
