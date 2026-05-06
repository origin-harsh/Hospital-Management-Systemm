package com.hms.ProfileMS.service;

import java.util.List;

import javax.print.Doc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ProfileMS.dto.DoctorDTO;
import com.hms.ProfileMS.exception.HMSException;
import com.hms.ProfileMS.repository.Doctorrepo;
import com.hms.ProfileMS.repository.PatientRepo;
import com.hms.ProfileMS.dto.DoctorDropDown;

@Service
public class DoctorServiceImpl implements DoctorService  {

    @Autowired
    private Doctorrepo doctorRepo;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) throws HMSException {
        
        if(doctorDTO.getEmail() != null && doctorRepo.findByEmail(doctorDTO.getEmail()).isPresent()){
             throw new HMSException("DOCTOR_ALREADY_EXISTS");
          

        }
        if(doctorDTO.getLicenseNo() != null && doctorRepo.findByLicenseNo(doctorDTO.getLicenseNo()).isPresent()){
            throw new HMSException("DOCTOR_ALREADY_EXISTS");
        }
        else{
           return doctorRepo.save(doctorDTO.toEntity()).getId();   
        }
     
    }

    @Override
    public DoctorDTO getDoctorById(Long id) throws HMSException {
        return doctorRepo.findById(id).orElseThrow(()-> new HMSException("DOCTOR_NOT_FOUND")).toDTO();  
    }
    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HMSException {
        doctorRepo.findById(doctorDTO.getId()).orElseThrow(()-> new HMSException("DOCTOR_NOT_FOUND"));
        
        return doctorRepo.save(doctorDTO.toEntity()).toDTO();   
    }

    @Override
    public Boolean doctorExist(Long id) throws HMSException {
        return doctorRepo.existsById(id);
    }

    @Override
    public List<DoctorDropDown> getAllDoctorsForDropDown() throws HMSException {
        return doctorRepo.findAllDoctorDropDowns();
    }

    @Override
    public List<DoctorDropDown> getDoctorByIds(List<Long> ids) throws HMSException {
        return doctorRepo.findAllDoctorDropDownsByIds(ids);
    }
    
}
