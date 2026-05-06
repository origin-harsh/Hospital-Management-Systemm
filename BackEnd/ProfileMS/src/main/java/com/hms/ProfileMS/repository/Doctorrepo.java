package com.hms.ProfileMS.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.dto.DoctorDropDown;
import com.hms.ProfileMS.entity.Doctor;

public interface Doctorrepo extends CrudRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNo(String licenseNo);

    @Query("SELECT d.id as id, d.name as name FROM Doctor d")
    List<DoctorDropDown> findAllDoctorDropDowns();

     @Query("SELECT d.id as id, d.name as name FROM Doctor d WHERE d.id IN ?1")
    List<DoctorDropDown> findAllDoctorDropDownsByIds(List<Long> ids);

}
