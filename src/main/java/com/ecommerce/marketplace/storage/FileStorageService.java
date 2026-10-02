package com.ecommerce.marketplace.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String storeFile(MultipartFile file, String category);
    Resource loadFileAsResource(String filename);
}
