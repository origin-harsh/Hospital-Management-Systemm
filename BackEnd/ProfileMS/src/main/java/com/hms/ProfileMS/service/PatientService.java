package com.hms.ProfileMS.service;

import java.util.List;

import com.hms.ProfileMS.dto.DoctorDropDown;
import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.dto.PatientDropDown;
import com.hms.ProfileMS.entity.Patient;
import com.hms.ProfileMS.exception.HMSException;

public interface PatientService {
     public Long addPatient(PatientDTO patientDTO) throws HMSException;
     public PatientDTO getPatientById(Long id) throws HMSException;
     public PatientDTO updatePatient(PatientDTO patientDTO) throws HMSException;
     public Boolean patientExist(Long id) throws HMSException;
     List<PatientDropDown> getPatientByIds(List<Long> ids) throws HMSException;
     List<PatientDTO> getAllPatients() throws HMSException;
   
}
