package com.hms.ProfileMS.api;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.exception.HMSException;
import com.hms.ProfileMS.service.PatientService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
@RequestMapping("/profile/patient")
@Validated
public class PatientAPI {

  
    @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public ResponseEntity<Long> addPatient(@RequestBody PatientDTO patientDTO) throws HMSException {
        return new ResponseEntity<>(patientService.addPatient(patientDTO), 
        HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(patientService.getPatientById(id),HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<PatientDTO> updatePatient(@RequestBody PatientDTO patientDTO) throws HMSException {
        return new ResponseEntity<>(patientService.updatePatient(patientDTO), HttpStatus.OK);
    }
    @GetMapping("/exist/{id}")
    public ResponseEntity<Boolean> getMethodName(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(patientService.patientExist(id),HttpStatus.OK);
    }
}
