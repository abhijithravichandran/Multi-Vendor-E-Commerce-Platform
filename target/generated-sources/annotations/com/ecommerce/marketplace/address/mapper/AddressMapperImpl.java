package com.ecommerce.marketplace.address.mapper;

import com.ecommerce.marketplace.address.dto.AddressDto;
import com.ecommerce.marketplace.address.entity.Address;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-10-02T07:47:57+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public AddressDto toDto(Address address) {
        if ( address == null ) {
            return null;
        }

        AddressDto.AddressDtoBuilder addressDto = AddressDto.builder();

        addressDto.id( address.getId() );
        addressDto.userId( address.getUserId() );
        addressDto.label( address.getLabel() );
        addressDto.name( address.getName() );
        addressDto.phone( address.getPhone() );
        addressDto.line1( address.getLine1() );
        addressDto.line2( address.getLine2() );
        addressDto.city( address.getCity() );
        addressDto.state( address.getState() );
        addressDto.pincode( address.getPincode() );
        addressDto.createdAt( address.getCreatedAt() );

        return addressDto.build();
    }

    @Override
    public List<AddressDto> toDtoList(List<Address> addresses) {
        if ( addresses == null ) {
            return null;
        }

        List<AddressDto> list = new ArrayList<AddressDto>( addresses.size() );
        for ( Address address : addresses ) {
            list.add( toDto( address ) );
        }

        return list;
    }
}
