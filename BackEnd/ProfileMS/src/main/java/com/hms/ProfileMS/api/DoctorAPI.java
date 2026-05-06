package com.hms.ProfileMS.api;

import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ProfileMS.dto.DoctorDTO;
import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.exception.HMSException;
import com.hms.ProfileMS.service.DoctorService;
import com.hms.ProfileMS.dto.DoctorDropDown;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@CrossOrigin
@RequestMapping("/profile/doctor")
@Validated
public class DoctorAPI {
    
    @Autowired
    private DoctorService doctorService;
    
    @PostMapping("/add")
    public ResponseEntity<Long> addDoctor(@RequestBody DoctorDTO doctorDTO) throws HMSException{
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO),HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<DoctorDTO> getDoctor(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(doctorService.getDoctorById(id),HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody DoctorDTO doctorDTO) throws HMSException {
        return new ResponseEntity<>(doctorService.updateDoctor(doctorDTO), HttpStatus.OK);
    }
    @GetMapping("/exist/{id}")
    public ResponseEntity<Boolean> getMethodName(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(doctorService.doctorExist(id),HttpStatus.OK);
    }
    @GetMapping("/getDoctorById")
    public ResponseEntity<List<DoctorDropDown>> getDoctorsById(@RequestParam List<Long> ids) throws HMSException {
        return new ResponseEntity<>(doctorService.getDoctorByIds(ids),HttpStatus.OK);
    }
    
    @GetMapping("/dropdown")
    public ResponseEntity<List<DoctorDropDown>> getAllDoctor() throws HMSException {
        return new ResponseEntity<>(doctorService.getAllDoctorsForDropDown(),HttpStatus.OK);
    }
    
}
