package br.com.pojae.backend.repository;

import br.com.pojae.backend.model.Address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

}
