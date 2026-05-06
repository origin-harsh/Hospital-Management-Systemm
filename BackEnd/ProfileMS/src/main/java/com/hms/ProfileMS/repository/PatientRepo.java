package com.hms.ProfileMS.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.entity.Patient;

public interface PatientRepo extends CrudRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByaadharNo(String aadharNo);
}
