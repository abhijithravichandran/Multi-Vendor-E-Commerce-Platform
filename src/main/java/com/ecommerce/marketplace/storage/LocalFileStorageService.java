package com.ecommerce.marketplace.storage;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Slf4j
@Service
public class LocalFileStorageService implements FileStorageService {

    private final Path fileStorageLocation;

    public LocalFileStorageService(@Value("${app.storage.upload-dir:uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public String storeFile(MultipartFile file, String category) {
        if (file.isEmpty()) {
            throw new ApiException(ErrorCode.FILE_UPLOAD_ERROR, "Failed to store empty file");
        }

        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i >= 0) {
            extension = originalFilename.substring(i);
        }

        String contentType = file.getContentType();
        boolean isImage = contentType != null && contentType.startsWith("image/");
        
        long maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB images, 10MB docs
        if (file.getSize() > maxSize) {
            throw new ApiException(ErrorCode.FILE_TOO_LARGE, "File size exceeds allowed limit (" + (maxSize / (1024 * 1024)) + "MB)");
        }

        String newFileName = java.util.UUID.randomUUID().toString() + extension;

        try {
            if (newFileName.contains("..")) {
                throw new ApiException(ErrorCode.FILE_UPLOAD_ERROR, "Filename contains invalid path sequence " + newFileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(newFileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            return "/api/v1/public/files/" + newFileName;
        } catch (IOException ex) {
            throw new ApiException(ErrorCode.FILE_UPLOAD_ERROR, "Could not store file " + newFileName + ". Please try again!");
        }
    }

    @Override
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "File not found " + filename);
            }
        } catch (MalformedURLException ex) {
            throw new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "File not found " + filename);
        }
    }
}
