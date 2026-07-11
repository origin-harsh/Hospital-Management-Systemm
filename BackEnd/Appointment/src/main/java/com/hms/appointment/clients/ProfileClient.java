package com.hms.appointment.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.hms.appointment.config.FeignInterceptor;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.dto.PatientName;
import com.hms.appointment.dto.Doctorname;
import java.util.List;

@FeignClient(name = "ProfileMS", configuration = FeignInterceptor.class)
public interface ProfileClient {
    @GetMapping("/profile/doctor/exist/{id}")
    Boolean doctorExist(@PathVariable("id") Long Id);
    @GetMapping("/profile/patient/exist/{id}")
    Boolean patientExist(@PathVariable("id") Long Id);
    @GetMapping("/profile/patient/get/{id}")
    PatientDTO getPatientById(@PathVariable("id") Long Id);
    @GetMapping("/profile/doctor/get/{id}")
    DoctorDTO getDoctorById(@PathVariable("id") Long Id);

    @GetMapping("/profile/doctor/getDoctorById")
    List<Doctorname> getDoctorByIds(@RequestParam List<Long> ids);
    
    @GetMapping("/profile/patient/getPatientById")
    List<PatientName> getPatientByIds(@RequestParam List<Long> ids);
    
}
