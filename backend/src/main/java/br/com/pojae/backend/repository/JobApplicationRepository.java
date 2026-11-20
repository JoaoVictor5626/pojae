package br.com.pojae.backend.repository;

import br.com.pojae.backend.model.JobApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    List<JobApplication> findAllByJob_Company_Id(UUID companyId);
    void deleteAllByJob_Id(UUID jobId);

}
