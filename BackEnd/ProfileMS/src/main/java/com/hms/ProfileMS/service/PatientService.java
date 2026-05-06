package com.hms.ProfileMS.service;

import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.entity.Patient;
import com.hms.ProfileMS.exception.HMSException;

public interface PatientService {
     public Long addPatient(PatientDTO patientDTO) throws HMSException;
     public PatientDTO getPatientById(Long id) throws HMSException;
     public PatientDTO updatePatient(PatientDTO patientDTO) throws HMSException;
     public Boolean patientExist(Long id) throws HMSException;
   
}
