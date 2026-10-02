package com.ecommerce.marketplace.notification.service;

import com.ecommerce.marketplace.common.events.CouponCreatedEvent;
import com.ecommerce.marketplace.common.events.DeliveryPartnerActivatedEvent;
import com.ecommerce.marketplace.common.events.LowStockDetectedEvent;
import com.ecommerce.marketplace.common.events.ProductApprovedEvent;
import com.ecommerce.marketplace.common.events.ProductRejectedEvent;
import com.ecommerce.marketplace.common.events.SellerKycApprovedEvent;
import com.ecommerce.marketplace.common.events.SellerKycRejectedEvent;
import com.ecommerce.marketplace.common.events.ReviewPostedEvent;
import com.ecommerce.marketplace.notification.entity.NotificationPriority;
import com.ecommerce.marketplace.seller.entity.Seller;
import com.ecommerce.marketplace.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationService notificationService;
    private final SellerRepository sellerRepository;

    @EventListener
    public void handleSellerKycApproved(SellerKycApprovedEvent event) {
        log.info("Handling SellerKycApprovedEvent for seller {}", event.sellerId());
        notificationService.notify(
                event.userId(),
                "KYC_APPROVED",
                "Store KYC Approved!",
                "Congratulations! Your seller KYC documentation has been approved. You can now start listing products.",
                "check-circle",
                "/seller/dashboard",
                NotificationPriority.HIGH
        );
    }

    @EventListener
    public void handleSellerKycRejected(SellerKycRejectedEvent event) {
        log.info("Handling SellerKycRejectedEvent for seller {}", event.sellerId());
        notificationService.notify(
                event.userId(),
                "KYC_REJECTED",
                "Store KYC Update Needed",
                "Your seller KYC submission was rejected. Reason: " + event.remarks(),
                "alert-triangle",
                "/seller/kyc",
                NotificationPriority.HIGH
        );
    }

    @EventListener
    public void handleProductApproved(ProductApprovedEvent event) {
        sellerRepository.findById(event.sellerId()).ifPresent(seller -> {
            notificationService.notify(
                    seller.getUserId(),
                    "PRODUCT_APPROVED",
                    "Product Approved",
                    "Your product '" + event.productTitle() + "' has been approved and is now live on the marketplace.",
                    "package",
                    "/seller/products",
                    NotificationPriority.NORMAL
            );
        });
    }

    @EventListener
    public void handleProductRejected(ProductRejectedEvent event) {
        sellerRepository.findById(event.sellerId()).ifPresent(seller -> {
            notificationService.notify(
                    seller.getUserId(),
                    "PRODUCT_REJECTED",
                    "Product Moderation Update",
                    "Your product '" + event.productTitle() + "' was rejected. Reason: " + event.remarks(),
                    "x-circle",
                    "/seller/products",
                    NotificationPriority.NORMAL
            );
        });
    }

    @EventListener
    public void handleLowStockDetected(LowStockDetectedEvent event) {
        sellerRepository.findById(event.sellerId()).ifPresent(seller -> {
            notificationService.notify(
                    seller.getUserId(),
                    "LOW_STOCK",
                    "Low Stock Alert",
                    "Variant SKU " + event.variantSku() + " is running low on stock (" + event.qtyAvailable() + " left).",
                    "alert-circle",
                    "/seller/inventory",
                    NotificationPriority.HIGH
            );
        });
    }

    @EventListener
    public void handleReviewPosted(ReviewPostedEvent event) {
        // Notify product seller about new review
        log.info("Handling ReviewPostedEvent for product {}", event.productId());
    }

    @EventListener
    public void handleCouponCreated(CouponCreatedEvent event) {
        log.info("Handling CouponCreatedEvent for code {}", event.code());
    }

    @EventListener
    public void handleDeliveryPartnerActivated(DeliveryPartnerActivatedEvent event) {
        notificationService.notify(
                event.userId(),
                "ACCOUNT_ACTIVATED",
                "Delivery Partner Account Activated",
                "Your delivery partner account is now active. You can toggle your online status to receive tasks.",
                "truck",
                "/delivery/dashboard",
                NotificationPriority.HIGH
        );
    }
}
