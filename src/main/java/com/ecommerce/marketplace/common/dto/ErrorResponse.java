package com.ecommerce.marketplace.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private boolean success;
    private ErrorBody error;
    private String traceId;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ErrorBody {
        private String code;
        private String message;
        private List<FieldErrorDetail> fieldErrors;
    }

    public static ErrorResponse of(String code, String message, List<FieldErrorDetail> fieldErrors, String traceId) {
        return ErrorResponse.builder()
                .success(false)
                .error(ErrorBody.builder()
                        .code(code)
                        .message(message)
                        .fieldErrors(fieldErrors)
                        .build())
                .traceId(traceId)
                .build();
    }
}
