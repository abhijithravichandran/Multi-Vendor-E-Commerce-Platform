package com.ecommerce.marketplace.catalog.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttributeValidator {

    private final ObjectMapper objectMapper;

    @Data
    public static class AttributeSchemaField {
        private String key;
        private String label;
        private String type; // e.g., TEXT, NUMBER, BOOLEAN, SELECT
        private boolean required;
        private List<String> options;
    }

    public void validateAttributes(String schemaJson, Object attributesObj) {
        if (schemaJson == null || schemaJson.trim().isEmpty()) {
            return; // No schema, anything goes
        }

        List<AttributeSchemaField> schema;
        try {
            schema = objectMapper.readValue(schemaJson, new TypeReference<List<AttributeSchemaField>>() {});
        } catch (JsonProcessingException e) {
            // Invalid schema in DB, ignore or throw internal error
            throw new ApiException(ErrorCode.INTERNAL_SERVER_ERROR, "Invalid category attribute schema");
        }

        Map<String, Object> attributes;
        if (attributesObj instanceof Map) {
            attributes = (Map<String, Object>) attributesObj;
        } else {
            try {
                String attrsJson = objectMapper.writeValueAsString(attributesObj);
                attributes = objectMapper.readValue(attrsJson, new TypeReference<Map<String, Object>>() {});
            } catch (JsonProcessingException e) {
                throw new ApiException(ErrorCode.INVALID_INPUT, "Attributes must be a valid JSON object");
            }
        }

        List<String> errors = new ArrayList<>();

        for (AttributeSchemaField field : schema) {
            Object value = attributes.get(field.getKey());
            
            if (field.isRequired() && (value == null || value.toString().trim().isEmpty())) {
                errors.add("Field '" + field.getKey() + "' is required");
                continue;
            }

            if (value != null && field.getType() != null) {
                String valStr = value.toString();
                if (field.getType().equalsIgnoreCase("NUMBER")) {
                    try {
                        Double.parseDouble(valStr);
                    } catch (NumberFormatException e) {
                        errors.add("Field '" + field.getKey() + "' must be a number");
                    }
                } else if (field.getType().equalsIgnoreCase("SELECT") && field.getOptions() != null) {
                    if (!field.getOptions().contains(valStr)) {
                        errors.add("Field '" + field.getKey() + "' must be one of: " + field.getOptions());
                    }
                }
            }
        }

        if (!errors.isEmpty()) {
            throw new ApiException(ErrorCode.INVALID_INPUT, "Attribute validation failed: " + String.join(", ", errors));
        }
    }
}
