package com.hms.ProfileMS.service;

import com.hms.ProfileMS.dto.DoctorDTO;
import com.hms.ProfileMS.exception.HMSException;
import java.util.List;
import com.hms.ProfileMS.dto.DoctorDropDown;

public interface DoctorService {
     public Long addDoctor(DoctorDTO doctorDTO) throws HMSException;
     public DoctorDTO getDoctorById(Long id)   throws HMSException;
     public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HMSException;
     public Boolean doctorExist(Long id) throws HMSException;
     List<DoctorDropDown> getAllDoctorsForDropDown() throws HMSException;
     List<DoctorDropDown> getDoctorByIds(List<Long> ids) throws HMSException;
    
}
