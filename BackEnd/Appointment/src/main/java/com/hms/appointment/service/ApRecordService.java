package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.exception.HMSException;

public interface ApRecordService {
    public Long createApRecord(ApRecordDTO request) throws HMSException;
    public void updateApRecord(ApRecordDTO request) throws HMSException;
    public ApRecordDTO getApRecordByAppointmentId(Long appointmentId) throws HMSException;
    public ApRecordDTO getApRecordDetailsByAppointmentId(Long appointmentId) throws HMSException;
    public ApRecordDTO getApRecordById(Long recordId) throws HMSException;
    List<RecordDetails> getRecordsByPatientId(Long patientId) throws HMSException;
    Boolean isRecordExist(Long appointmentId) throws HMSException;
  
}
