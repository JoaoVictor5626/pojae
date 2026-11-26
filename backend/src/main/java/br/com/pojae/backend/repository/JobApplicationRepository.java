package br.com.pojae.backend.repository;

import br.com.pojae.backend.model.JobApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    List<JobApplication> findAllByJobCompanyId(UUID companyId);
    void deleteAllByJobId(UUID jobId);
    void deleteAllByCandidateId(UUID candidateId);

}
