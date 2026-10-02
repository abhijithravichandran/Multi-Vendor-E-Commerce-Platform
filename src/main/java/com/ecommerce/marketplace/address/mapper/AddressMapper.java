package com.ecommerce.marketplace.address.mapper;

import com.ecommerce.marketplace.address.dto.AddressDto;
import com.ecommerce.marketplace.address.entity.Address;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDto toDto(Address address);
    List<AddressDto> toDtoList(List<Address> addresses);
}
