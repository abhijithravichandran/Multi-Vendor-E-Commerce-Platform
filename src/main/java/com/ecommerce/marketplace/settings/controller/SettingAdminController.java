package com.ecommerce.marketplace.settings.controller;

import com.ecommerce.marketplace.common.dto.ApiResponse;
import com.ecommerce.marketplace.settings.entity.PlatformSetting;
import com.ecommerce.marketplace.settings.service.PlatformSettingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
@Tag(name = "Admin Settings", description = "Global platform settings")
@PreAuthorize("hasRole('ADMIN')")
public class SettingAdminController {

    private final PlatformSettingService settingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlatformSetting>>> getAllSettings() {
        return ResponseEntity.ok(ApiResponse.success(settingService.getAllSettings()));
    }

    @PutMapping("/{key}")
    public ResponseEntity<ApiResponse<PlatformSetting>> updateSetting(@PathVariable String key, @RequestBody String value) {
        return ResponseEntity.ok(ApiResponse.success(settingService.updateSetting(key, value)));
    }
}
