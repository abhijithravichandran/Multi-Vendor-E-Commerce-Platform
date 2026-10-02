package com.ecommerce.marketplace.user.repository;

import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    long countByRole(Role role);
    java.util.List<com.ecommerce.marketplace.user.entity.User> findByRole(com.ecommerce.marketplace.user.entity.Role role);
}
