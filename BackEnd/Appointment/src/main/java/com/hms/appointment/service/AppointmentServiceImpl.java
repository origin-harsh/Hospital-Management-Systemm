package com.hms.appointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.entity.appointment;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.Appointmentrepo;
import com.netflix.discovery.converters.Auto;
import com.hms.appointment.dto.Status;


@Service
public class AppointmentServiceImpl implements AppointmentService{


    @Autowired
    private Appointmentrepo appointmentRepo;

    @Autowired
    private ApiService apiService;

    @Autowired
    private ProfileClient profileClient;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HMSException {
        Boolean doctorExists = profileClient.doctorExist(appointmentDTO.getDoctorId());
        if(doctorExists == null || !doctorExists){
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        Boolean patientExists = profileClient.patientExist(appointmentDTO.getPatientId());
        if(patientExists == null || !patientExists){
            throw new HMSException("PATIENT_NOT_FOUND");
        }
        appointmentDTO.setStatus(Status.SCHEDULED);
        return appointmentRepo.save(appointmentDTO.toEntity()).getId();
    }

    @Override
    public void cancelAppointment(Long appointmentId) throws HMSException {
        
         appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND"));
        if(appointment.getStatus().equals(Status.CANCELLED) ){
            throw new HMSException("APPOINTMENT_ALREADY_CANCELLED");
        }
        appointment.setStatus(Status.CANCELLED);
        appointmentRepo.save(appointment);
    }

    @Override
    public void completeAppointment(long appointmentId) throws HMSException {
        appointment appointment = appointmentRepo.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND"));
        if(appointment.getStatus().equals(Status.COMPLETED) ){
            throw new HMSException("APPOINTMENT_ALREADY_COMPLETED");
        }
        appointment.setStatus(Status.COMPLETED);
        appointmentRepo.save(appointment);
    }

    @Override
    public void rescheduleAppointment(Long appointmentId, String newDateTime) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'rescheduleAppointment'");
    }

    @Override
    public AppointmentDTO getAppointmentDetails(Long appointmentId) throws HMSException {
        return appointmentRepo.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HMSException {
        AppointmentDTO appointmentDTO = appointmentRepo.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND")).toDTO();
        PatientDTO patientDTO = profileClient.getPatientById(appointmentDTO.getPatientId());
        DoctorDTO doctorDTO = profileClient.getDoctorById(appointmentDTO.getDoctorId());
        return new AppointmentDetails(
            appointmentDTO.getId(),
            appointmentDTO.getPatientId(),
            patientDTO.getName(),
            patientDTO.getEmail(),
            patientDTO.getPhone(),
            appointmentDTO.getDoctorId(),
            doctorDTO.getName(),
            appointmentDTO.getAppointmentDate(),
            appointmentDTO.getStatus(),
            appointmentDTO.getReason(),
            appointmentDTO.getNotes()
        );
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentsByPatientId(Long patientId) throws HMSException {
        return appointmentRepo.findAllByPatientId(patientId).stream().map(appointment -> {
            DoctorDTO doctorDTO = profileClient.getDoctorById(appointment.getDoctorId());
            appointment.setDoctorName(doctorDTO.getName());
            return appointment;
        }).toList();
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentsByDoctorId(Long doctorId) throws HMSException {
        return appointmentRepo.findAllByDoctorId(doctorId).stream().map(appointment -> {
            PatientDTO patientDTO = profileClient.getPatientById(appointment.getPatientId());
            appointment.setPatientName(patientDTO.getName());
            appointment.setPatientEmail(patientDTO.getEmail());
            appointment.setPatientPhone(patientDTO.getPhone());
            return appointment;
        }).toList();
    }

    
    
}
