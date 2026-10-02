package com.ecommerce.marketplace.integration;

import com.ecommerce.marketplace.common.dto.ErrorResponse;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@Tag(name = "Phase 2 Extension Placeholders", description = "Endpoints reserved for Phase 2 implementation (Orders, Payments, Returns, Payouts, Wallet)")
public class Phase2PlaceholderController {

    @RequestMapping(
            value = {
                    "/api/v1/customer/orders/**",
                    "/api/v1/seller/orders/**",
                    "/api/v1/delivery/tasks/**",
                    "/api/v1/payments/**",
                    "/api/v1/payouts/**",
                    "/api/v1/returns/**",
                    "/api/v1/wallets/**"
            },
            method = {
                    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
                    RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS
            }
    )
    @Operation(summary = "Phase 2 Placeholder Endpoint", description = "Returns HTTP 501 NOT_IMPLEMENTED for Phase 2 routes")
    public ResponseEntity<ErrorResponse> handlePhase2Placeholder(HttpServletRequest request) {
        String traceId = UUID.randomUUID().toString();
        ErrorResponse response = ErrorResponse.of(
                ErrorCode.NOT_IMPLEMENTED.name(),
                "Route " + request.getRequestURI() + " is reserved for Phase 2 implementation",
                null,
                traceId
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_IMPLEMENTED);
    }
}
