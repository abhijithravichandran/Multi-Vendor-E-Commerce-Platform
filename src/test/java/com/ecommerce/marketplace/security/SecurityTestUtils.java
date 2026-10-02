package com.ecommerce.marketplace.security;

import com.ecommerce.marketplace.user.entity.AdminRole;
import com.ecommerce.marketplace.user.entity.Role;
import com.ecommerce.marketplace.user.entity.UserStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;

public class SecurityTestUtils {

    public static UserPrincipal createMockPrincipal(UUID id, String email, Role role, AdminRole adminRole) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        if (role == Role.ADMIN && adminRole != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + adminRole.name()));
        }

        return UserPrincipal.builder()
                .id(id)
                .email(email)
                .password("encoded_password")
                .role(role)
                .adminRole(adminRole)
                .status(UserStatus.ACTIVE)
                .authorities(authorities)
                .build();
    }

    public static void setUpSecurityContext(UUID id, String email, Role role, AdminRole adminRole) {
        UserPrincipal principal = createMockPrincipal(id, email, role, adminRole);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    public static void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }
    
    public static RequestPostProcessor mockUser(UUID id, String email, Role role) {
        return mockUser(id, email, role, null);
    }

    public static RequestPostProcessor mockUser(UUID id, String email, Role role, AdminRole adminRole) {
        UserPrincipal principal = createMockPrincipal(id, email, role, adminRole);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());
        return authentication(auth);
    }
}
