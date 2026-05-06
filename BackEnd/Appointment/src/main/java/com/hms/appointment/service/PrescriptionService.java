package com.hms.appointment.service;
import java.util.List;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.dto.PrescriptionDetails;

public interface PrescriptionService {
    public Long savePrescription(PrescriptionDTO request);
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) throws HMSException;
    public PrescriptionDTO getPrescriptionById(Long prescriptionId) throws HMSException;
    public List<PrescriptionDetails> getPrescriptionDeatilsByPatientId(Long patientId) throws HMSException;
    
}
