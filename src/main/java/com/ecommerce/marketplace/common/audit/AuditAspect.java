package com.ecommerce.marketplace.common.audit;

import com.ecommerce.marketplace.admin.entity.AuditLog;
import com.ecommerce.marketplace.admin.repository.AuditLogRepository;
import com.ecommerce.marketplace.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;

    @Around("@annotation(audited)")
    public Object auditMethod(ProceedingJoinPoint joinPoint, Audited audited) throws Throwable {
        Object result = joinPoint.proceed();

        try {
            UUID actorId = null;
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof UserPrincipal principal) {
                actorId = principal.getId();
            }

            String ipAddress = null;
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                ipAddress = request.getHeader("X-Forwarded-For");
                if (ipAddress == null || ipAddress.isBlank()) {
                    ipAddress = request.getRemoteAddr();
                }
            }

            AuditLog auditLog = AuditLog.builder()
                    .id(UUID.randomUUID())
                    .actorId(actorId)
                    .action(audited.action())
                    .entityType(audited.entityType())
                    .ipAddress(ipAddress)
                    .createdAt(Instant.now())
                    .build();

            auditLogRepository.save(auditLog);
            log.info("Audit log recorded: action={}, entityType={}, actorId={}", audited.action(), audited.entityType(), actorId);
        } catch (Exception e) {
            log.error("Failed to record audit log", e);
        }

        return result;
    }
}
