package com.ecommerce.marketplace.settings.repository;

import com.ecommerce.marketplace.settings.entity.PlatformSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformSettingRepository extends JpaRepository<PlatformSetting, String> {
}
