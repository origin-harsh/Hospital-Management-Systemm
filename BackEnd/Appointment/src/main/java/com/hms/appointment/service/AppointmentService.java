package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HMSException;

public interface AppointmentService  {
   Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HMSException;
   void cancelAppointment(Long appointmentId) throws HMSException;
   void completeAppointment(long appointmentId) throws HMSException;
   void rescheduleAppointment(Long appointmentId, String newDateTime) throws HMSException;
   AppointmentDTO getAppointmentDetails(Long appointmentId) throws HMSException;  
   AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HMSException;
   List<AppointmentDetails> getAllAppointmentsByPatientId(Long patientId) throws HMSException;
   List<AppointmentDetails> getAllAppointmentsByDoctorId(Long doctorId) throws HMSException;


}
