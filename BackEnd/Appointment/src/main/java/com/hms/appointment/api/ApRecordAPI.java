package com.hms.appointment.api;


import java.util.List;

import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.service.ApRecordService;
import com.hms.appointment.service.PrescriptionService;

import feign.Response;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
@RequestMapping("/appointment/record")
@Validated
@RequiredArgsConstructor
public class ApRecordAPI {

    
    private final ApRecordService apRecordService;
    
    private final PrescriptionService prescriptionService;


    @PostMapping("/create")
    public ResponseEntity<Long> createApRecord(@RequestBody ApRecordDTO request) throws HMSException {
        return new ResponseEntity<>(apRecordService.createApRecord(request), HttpStatus.CREATED);
       
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateApRecord(@RequestBody ApRecordDTO request) throws HMSException {
        
            apRecordService.updateApRecord(request);
            return new ResponseEntity<>( "Appointment record updated successfully", HttpStatus.OK);
    }

    
    @GetMapping("/getByAppointmentId/{appointmentId}")
    public ResponseEntity<ApRecordDTO> getApRecordByAppointmentId(@PathVariable Long appointmentId) throws HMSException {
        return new ResponseEntity<>(apRecordService.getApRecordByAppointmentId(appointmentId), HttpStatus.OK);
    }
    @GetMapping("/getById/{recordId}")
    public ResponseEntity<ApRecordDTO> getApRecordById(@PathVariable Long recordId) throws HMSException {
        return new ResponseEntity<>(apRecordService.getApRecordById(recordId), HttpStatus.OK);
    }

    @GetMapping("/getRecordByPatientId/{patientId}")
    public ResponseEntity<List<RecordDetails>> getRecordByPatientId(@PathVariable Long patientId) throws HMSException{
        return new ResponseEntity<>(apRecordService.getRecordsByPatientId(patientId),HttpStatus.OK);
    }
    

    @GetMapping("/isRecordExist/{appointmentId}")
    public ResponseEntity<Boolean> isRecordExist(@PathVariable Long appointmentId) throws HMSException {
        return new ResponseEntity<>(apRecordService.isRecordExist(appointmentId),HttpStatus.OK);
    }
    
    @GetMapping("/getPrescriptionByPatientId/{patientId}")
    public ResponseEntity<List<PrescriptionDetails>> getPrescriptionByPatientId(@PathVariable Long patientId) throws HMSException {
        return new ResponseEntity<>(prescriptionService.getPrescriptionDeatilsByPatientId(patientId),HttpStatus.OK);
    }

}
