package com.ecommerce.marketplace.notification.service;

import com.ecommerce.marketplace.common.dto.PageResponse;
import com.ecommerce.marketplace.notification.dto.NotificationDto;
import com.ecommerce.marketplace.notification.entity.Notification;
import com.ecommerce.marketplace.notification.entity.NotificationPriority;
import com.ecommerce.marketplace.notification.repository.NotificationRepository;
import com.ecommerce.marketplace.marketing.dto.BroadcastRequest;
import com.ecommerce.marketplace.user.repository.UserRepository;
import com.ecommerce.marketplace.user.entity.Role;
import org.springframework.scheduling.annotation.Async;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository repository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final Map<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();

    @Transactional
    public void notify(UUID userId, String type, String title, String body, String icon, String deepLink, NotificationPriority priority) {
        Notification notification = Notification.builder()
                .userId(userId)
                .type(type)
                .title(title)
                .body(body)
                .icon(icon)
                .deepLink(deepLink)
                .priority(priority != null ? priority : NotificationPriority.NORMAL)
                .build();
        
        notification = repository.save(notification);
        sendToClient(userId, mapToDto(notification));
    }

    private void sendToClient(UUID userId, NotificationDto dto) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("notification").data(objectMapper.writeValueAsString(dto)));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        }
    }

    public SseEmitter subscribe(UUID userId) {
        SseEmitter emitter = new SseEmitter(3600000L); // 1 hour
        emitters.put(userId, emitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        emitter.onError((e) -> emitters.remove(userId));

        // Send an initial heartbeat
        try {
            emitter.send(SseEmitter.event().name("heartbeat").data("connected"));
        } catch (IOException e) {
            emitters.remove(userId);
        }
        
        return emitter;
    }

    @Async
    @Transactional
    public void sendBroadcast(BroadcastRequest request) {
        Role targetRole = null;
        if ("ALL_CUSTOMERS".equals(request.getAudience())) targetRole = Role.CUSTOMER;
        else if ("ALL_SELLERS".equals(request.getAudience())) targetRole = Role.SELLER;
        else if ("ALL_DELIVERY".equals(request.getAudience())) targetRole = Role.DELIVERY;

        if (targetRole != null) {
            NotificationPriority priority = NotificationPriority.NORMAL;
            if (request.getPriority() != null) {
                try { priority = NotificationPriority.valueOf(request.getPriority()); } catch (Exception e) {}
            }
            final NotificationPriority finalPriority = priority;
            
            userRepository.findByRole(targetRole).forEach(u -> {
                notify(u.getId(), "BROADCAST", request.getTitle(), request.getBody(), "broadcast", request.getDeepLink(), finalPriority);
            });
        }
    }

    @Transactional(readOnly = true)
    public PageResponse<NotificationDto> getNotifications(UUID userId, Pageable pageable) {
        Page<Notification> page = repository.findByUserId(userId, pageable);
        return new PageResponse<>(
                page.getContent().stream().map(this::mapToDto).collect(Collectors.toList()),
                page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages()
        );
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(UUID userId) {
        return repository.countByUserIdAndReadFalse(userId);
    }

    @Transactional
    public void markAsRead(UUID id, UUID userId) {
        Notification n = repository.findById(id).orElse(null);
        if (n != null && n.getUserId().equals(userId)) {
            n.setRead(true);
            repository.save(n);
        }
    }

    @Transactional
    public void markAllAsRead(UUID userId) {
        repository.markAllAsRead(userId);
    }

    private NotificationDto mapToDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .type(n.getType())
                .title(n.getTitle())
                .body(n.getBody())
                .icon(n.getIcon())
                .deepLink(n.getDeepLink())
                .read(n.isRead())
                .priority(n.getPriority())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
