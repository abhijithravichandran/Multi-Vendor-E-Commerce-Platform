package com.ecommerce.marketplace.user.mapper;

import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @org.mapstruct.Mapping(target = "mustChangePassword", expression = "java(user.getRole() == com.ecommerce.marketplace.user.entity.Role.DELIVERY && user.getStatus() == com.ecommerce.marketplace.user.entity.UserStatus.PENDING)")
    UserProfileDto toDto(User user);
}
