package br.com.pojae.backend.repository;

import br.com.pojae.backend.model.EducationalInstitution;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EducationalInstitutionRepository extends JpaRepository<EducationalInstitution, UUID> {

}
