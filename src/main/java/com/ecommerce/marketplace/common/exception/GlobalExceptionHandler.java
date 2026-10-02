package com.ecommerce.marketplace.common.exception;

import com.ecommerce.marketplace.common.dto.ErrorResponse;
import com.ecommerce.marketplace.common.dto.FieldErrorDetail;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.warn("ApiException occurred [{}] - Code: {}, Message: {}", traceId, ex.getErrorCode(), ex.getMessage());
        
        ErrorResponse response = ErrorResponse.of(
                ex.getErrorCode().name(),
                ex.getMessage(),
                null,
                traceId
        );
        return new ResponseEntity<>(response, ex.getErrorCode().getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        List<FieldErrorDetail> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> new FieldErrorDetail(err.getField(), err.getDefaultMessage()))
                .collect(Collectors.toList());

        log.warn("Validation failure [{}]: {} errors", traceId, fieldErrors.size());

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.INVALID_INPUT.name(),
                "Validation failed for request parameters",
                fieldErrors,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.warn("Access denied [{}]: {}", traceId, ex.getMessage());

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.FORBIDDEN.name(),
                ErrorCode.FORBIDDEN.getDefaultMessage(),
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.warn("Bad credentials [{}]", traceId);

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.BAD_CREDENTIALS.name(),
                ErrorCode.BAD_CREDENTIALS.getDefaultMessage(),
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    public ResponseEntity<ErrorResponse> handleOptimisticLocking(ObjectOptimisticLockingFailureException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.warn("Optimistic locking conflict [{}]", traceId);

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.CONCURRENCY_CONFLICT.name(),
                ErrorCode.CONCURRENCY_CONFLICT.getDefaultMessage(),
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSize(MaxUploadSizeExceededException ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.warn("Max upload size exceeded [{}]", traceId);

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.FILE_TOO_LARGE.name(),
                ErrorCode.FILE_TOO_LARGE.getDefaultMessage(),
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        log.error("Unhandled internal server error [{}]", traceId, ex);

        ErrorResponse response = ErrorResponse.of(
                ErrorCode.INTERNAL_SERVER_ERROR.name(),
                "An unexpected internal error occurred",
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
