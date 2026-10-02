package com.ecommerce.marketplace.settings.service;

import com.ecommerce.marketplace.settings.entity.PlatformSetting;
import com.ecommerce.marketplace.settings.repository.PlatformSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlatformSettingService {
    
    private final PlatformSettingRepository repository;

    @Transactional(readOnly = true)
    public List<PlatformSetting> getAllSettings() {
        return repository.findAll();
    }

    @Transactional
    public PlatformSetting updateSetting(String key, String value) {
        PlatformSetting setting = repository.findById(key).orElse(new PlatformSetting(key, null, ""));
        setting.setValue(value);
        return repository.save(setting);
    }

    @Transactional(readOnly = true)
    public String getString(String key, String defaultValue) {
        return repository.findById(key).map(PlatformSetting::getValue).orElse(defaultValue);
    }

    @Transactional(readOnly = true)
    public BigDecimal getBigDecimal(String key, BigDecimal defaultValue) {
        Optional<PlatformSetting> setting = repository.findById(key);
        if (setting.isPresent() && setting.get().getValue() != null) {
            try {
                return new BigDecimal(setting.get().getValue());
            } catch (Exception e) {}
        }
        return defaultValue;
    }
}
