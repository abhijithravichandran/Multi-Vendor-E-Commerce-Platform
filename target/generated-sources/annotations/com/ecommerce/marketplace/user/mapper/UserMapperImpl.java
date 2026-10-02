package com.ecommerce.marketplace.user.mapper;

import com.ecommerce.marketplace.user.dto.UserProfileDto;
import com.ecommerce.marketplace.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-10-02T07:47:57+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserProfileDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserProfileDto.UserProfileDtoBuilder userProfileDto = UserProfileDto.builder();

        userProfileDto.id( user.getId() );
        userProfileDto.name( user.getName() );
        userProfileDto.email( user.getEmail() );
        userProfileDto.phone( user.getPhone() );
        userProfileDto.role( user.getRole() );
        userProfileDto.adminRole( user.getAdminRole() );
        userProfileDto.avatar( user.getAvatar() );
        userProfileDto.status( user.getStatus() );
        userProfileDto.emailVerified( user.isEmailVerified() );
        userProfileDto.phoneVerified( user.isPhoneVerified() );
        userProfileDto.lastLoginAt( user.getLastLoginAt() );
        userProfileDto.createdAt( user.getCreatedAt() );

        userProfileDto.mustChangePassword( user.getRole() == com.ecommerce.marketplace.user.entity.Role.DELIVERY && user.getStatus() == com.ecommerce.marketplace.user.entity.UserStatus.PENDING );

        return userProfileDto.build();
    }
}
