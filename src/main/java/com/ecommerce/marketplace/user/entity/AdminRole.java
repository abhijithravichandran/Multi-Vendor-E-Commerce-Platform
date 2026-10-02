package com.ecommerce.marketplace.user.entity;

import com.ecommerce.marketplace.admin.entity.Permission;
import java.util.Set;
import java.util.EnumSet;

public enum AdminRole {
    SUPER_ADMIN(EnumSet.allOf(Permission.class)),
    CATALOG_MANAGER(EnumSet.of(Permission.VIEW_CATALOG, Permission.MANAGE_CATALOG)),
    SUPPORT(EnumSet.of(Permission.VIEW_CUSTOMERS, Permission.VIEW_SELLERS, Permission.VIEW_CATALOG)),
    FINANCE(EnumSet.of(Permission.VIEW_FINANCE));

    private final Set<Permission> permissions;

    AdminRole(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}
