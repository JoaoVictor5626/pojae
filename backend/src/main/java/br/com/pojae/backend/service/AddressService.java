package br.com.pojae.backend.service;

import br.com.pojae.backend.model.Address;
import br.com.pojae.backend.repository.AddressRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;

    public Address create(Address address) {
        return repository.save(address);
    }

}
