package com.ecommerce.marketplace.inventory.service;

import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.inventory.entity.Inventory;
import com.ecommerce.marketplace.inventory.repository.InventoryRepository;
import com.ecommerce.marketplace.inventory.repository.StockMovementRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.test.context.ActiveProfiles;

import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
class InventoryConcurrencyTest {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

    private String testSku;
    private UUID inventoryId;

    @BeforeEach
    void setUp() {
        testSku = "SKU-TEST-" + UUID.randomUUID().toString().substring(0, 8);
        Inventory inventory = Inventory.builder()
                .productId(UUID.randomUUID())
                .sellerId(UUID.randomUUID())
                .variantSku(testSku)
                .qtyAvailable(10)
                .qtyReserved(0)
                .build();
        inventory = inventoryRepository.save(inventory);
        inventoryId = inventory.getId();
    }

    @AfterEach
    void tearDown() {
        stockMovementRepository.deleteAll();
        inventoryRepository.deleteAll();
    }

    @Test
    void testConcurrentReservations_neverGoNegative() throws InterruptedException {
        int threads = 20;
        ExecutorService executorService = Executors.newFixedThreadPool(threads);
        CountDownLatch latch = new CountDownLatch(threads);
        
        AtomicInteger successfulReservations = new AtomicInteger(0);
        AtomicInteger failedReservations = new AtomicInteger(0);
        AtomicInteger optimisticLockFailures = new AtomicInteger(0);

        for (int i = 0; i < threads; i++) {
            final int index = i;
            executorService.submit(() -> {
                try {
                    // Try to reserve 1 item
                    inventoryService.reserve(testSku, 1, "ORDER-" + index);
                    successfulReservations.incrementAndGet();
                } catch (ApiException e) {
                    if (e.getMessage().contains("Insufficient stock")) {
                        failedReservations.incrementAndGet();
                    } else if (e.getMessage().contains("Resource was updated by another transaction")) {
                        optimisticLockFailures.incrementAndGet();
                    } else {
                        // Some other exception
                        failedReservations.incrementAndGet();
                    }
                } catch (ObjectOptimisticLockingFailureException e) {
                    optimisticLockFailures.incrementAndGet();
                } catch (Exception e) {
                    failedReservations.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executorService.shutdown();

        Inventory finalInventory = inventoryRepository.findById(inventoryId).orElseThrow();
        
        System.out.println("Successful: " + successfulReservations.get());
        System.out.println("Failed (no stock): " + failedReservations.get());
        System.out.println("Optimistic Lock Failures: " + optimisticLockFailures.get());
        
        // Assert qtyAvailable never goes below 0
        assertTrue(finalInventory.getQtyAvailable() >= 0, "qtyAvailable should not be negative");
        
        // Assert qtyReserved matches successful reservations
        assertEquals(successfulReservations.get(), finalInventory.getQtyReserved(), "qtyReserved should match successful reservations");
        
        // Assert qtyAvailable equals initial minus successful reservations
        assertEquals(10 - successfulReservations.get(), finalInventory.getQtyAvailable(), "qtyAvailable should equal initial minus successful reservations");
    }
}
