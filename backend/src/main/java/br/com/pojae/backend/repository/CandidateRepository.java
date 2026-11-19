package br.com.pojae.backend.repository;

import br.com.pojae.backend.model.Candidate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, UUID> {

    Optional<Candidate> findByCpf(String cpf);

}
