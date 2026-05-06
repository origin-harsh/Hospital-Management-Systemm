package com.hms.appointment.api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.service.AppointmentServiceImpl;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@CrossOrigin
@RequestMapping("/appointment")
@Validated
public class AppointmentAPI {

    @Autowired
    private AppointmentServiceImpl appointmentService;
    
    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HMSException {
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO),HttpStatus.CREATED);
    }
    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId) throws HMSException {
        appointmentService.cancelAppointment(appointmentId);
        return new ResponseEntity<>("Appointment cancelled successfully",HttpStatus.OK);
    }
    @PutMapping("/completed/{appointmentId}")
    public ResponseEntity<String> completedAppointment(@PathVariable Long appointmentId) throws HMSException {
        appointmentService.completeAppointment(appointmentId);
        return new ResponseEntity<>("Appointment completed successfully",HttpStatus.OK);
    }
    @GetMapping("/get/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable Long appointmentId) throws HMSException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetails(appointmentId), HttpStatus.OK);
    }
    @GetMapping("/get/details/{appointmentId}")
    public ResponseEntity<AppointmentDetails> getAppointmentDetailsWithName(@PathVariable Long appointmentId) throws HMSException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsWithName(appointmentId), HttpStatus.OK);
    }
    @GetMapping("/getAllByPatient/{patientId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentsByPatientId(@PathVariable Long patientId) throws HMSException {
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByPatientId(patientId), HttpStatus.OK);
    }
    @GetMapping("/getAllByDoctor/{doctorId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentsByDoctorId(@PathVariable Long doctorId) throws HMSException {
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByDoctorId(doctorId), HttpStatus.OK);
    }
    

}
