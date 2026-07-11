package com.hms.ProfileMS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ProfileMS.dto.DoctorDropDown;
import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.dto.PatientDropDown;
import com.hms.ProfileMS.entity.Patient;
import com.hms.ProfileMS.exception.HMSException;
import com.hms.ProfileMS.repository.PatientRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

  
    private final PatientRepo patientRepo;

     @Override
     public Long addPatient(PatientDTO patientDTO) throws HMSException {
        if(patientDTO.getEmail() != null && patientRepo.findByEmail(patientDTO.getEmail()).isPresent()){
            throw new HMSException("PATIENT_ALREADY_EXISTS");
        }   
        if(patientDTO.getAadharNo() != null && patientRepo.findByaadharNo(patientDTO.getAadharNo()).isPresent()){
               throw new HMSException("PATIENT_ALREADY_EXISTS");
       }
        else{
         return  patientRepo.save(patientDTO.toEntity()).getId();
       }
          
     }

     @Override
     public PatientDTO getPatientById(Long id) throws HMSException {
          
        return patientRepo.findById(id).orElseThrow(()-> new HMSException("PATIENT_NOT_FOUND")).toDTO();
     }

     @Override
     public PatientDTO updatePatient(PatientDTO patientDTO) throws HMSException {
          patientRepo.findById(patientDTO.getId()).orElseThrow(()-> new HMSException("PATIENT_NOT_FOUND"));
        
          return patientRepo.save(patientDTO.toEntity()).toDTO();   
     }

     @Override
     public Boolean patientExist(Long id) throws HMSException {
      return patientRepo.existsById(id);
     }

     @Override
    public List<PatientDropDown> getPatientByIds(List<Long> ids) throws HMSException {
        return patientRepo.findAllPatientDropDownsByIds(ids);
    }

     @Override
     public List<PatientDTO> getAllPatients() throws HMSException {
        return ((List<Patient>)patientRepo.findAll()).stream().map(Patient::toDTO).toList();
     }
    
}
