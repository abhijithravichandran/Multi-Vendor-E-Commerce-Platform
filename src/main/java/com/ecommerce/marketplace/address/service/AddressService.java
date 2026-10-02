package com.ecommerce.marketplace.address.service;

import com.ecommerce.marketplace.address.dto.AddressDto;
import com.ecommerce.marketplace.address.dto.AddressRequest;
import com.ecommerce.marketplace.address.entity.Address;
import com.ecommerce.marketplace.address.mapper.AddressMapper;
import com.ecommerce.marketplace.address.repository.AddressRepository;
import com.ecommerce.marketplace.common.exception.ApiException;
import com.ecommerce.marketplace.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    @Transactional(readOnly = true)
    public List<AddressDto> getUserAddresses(UUID userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        return addressMapper.toDtoList(addresses);
    }

    @Transactional
    public AddressDto createAddress(UUID userId, AddressRequest request) {
        if (request.isDefault()) {
            clearDefaultAddress(userId);
        }

        Address address = Address.builder()
                .userId(userId)
                .label(request.getLabel())
                .name(request.getName())
                .phone(request.getPhone())
                .line1(request.getLine1())
                .line2(request.getLine2())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .isDefault(request.isDefault())
                .build();

        address = addressRepository.save(address);
        return addressMapper.toDto(address);
    }

    @Transactional
    public AddressDto updateAddress(UUID userId, UUID addressId, AddressRequest request) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "Address not found"));

        if (!address.getUserId().equals(userId)) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this address");
        }

        if (request.isDefault() && !address.isDefault()) {
            clearDefaultAddress(userId);
        }

        address.setLabel(request.getLabel());
        address.setName(request.getName());
        address.setPhone(request.getPhone());
        address.setLine1(request.getLine1());
        address.setLine2(request.getLine2());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setDefault(request.isDefault());

        address = addressRepository.save(address);
        return addressMapper.toDto(address);
    }

    @Transactional
    public void deleteAddress(UUID userId, UUID addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "Address not found"));

        if (!address.getUserId().equals(userId)) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this address");
        }

        addressRepository.delete(address);
    }

    @Transactional
    public AddressDto setDefaultAddress(UUID userId, UUID addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ApiException(ErrorCode.RESOURCE_NOT_FOUND, "Address not found"));

        if (!address.getUserId().equals(userId)) {
            throw new ApiException(ErrorCode.OWNERSHIP_VIOLATION, "You do not own this address");
        }

        clearDefaultAddress(userId);
        address.setDefault(true);
        address = addressRepository.save(address);
        return addressMapper.toDto(address);
    }

    private void clearDefaultAddress(UUID userId) {
        addressRepository.findByUserIdAndIsDefaultTrue(userId).ifPresent(addr -> {
            addr.setDefault(false);
            addressRepository.save(addr);
        });
    }
}
