package com.hms.ProfileMS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.dto.DoctorDropDown;
import com.hms.ProfileMS.dto.PatientDropDown;
import com.hms.ProfileMS.entity.Patient;

public interface PatientRepo extends CrudRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByaadharNo(String aadharNo);

    @Query("SELECT p.id as id, p.name as name FROM Patient p WHERE p.id IN ?1")
    List<PatientDropDown> findAllPatientDropDownsByIds(List<Long> ids);

}
