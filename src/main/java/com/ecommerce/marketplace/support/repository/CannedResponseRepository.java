package com.ecommerce.marketplace.support.repository;

import com.ecommerce.marketplace.support.entity.CannedResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CannedResponseRepository extends JpaRepository<CannedResponse, UUID> {
}
