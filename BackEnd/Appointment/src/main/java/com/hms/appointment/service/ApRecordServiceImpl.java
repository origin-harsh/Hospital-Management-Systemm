package com.hms.appointment.service;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.Doctorname;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.exception.HMSException;

import lombok.RequiredArgsConstructor;

import java.lang.StackWalker.Option;


import org.springframework.stereotype.Service;
import com.hms.appointment.repository.ApRecordRepository;
import com.hms.appointment.utility.StringListConvetor;

import jakarta.transaction.Transactional;

import com.hms.appointment.entity.ApRecord;
import com.hms.appointment.clients.ProfileClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class ApRecordServiceImpl implements ApRecordService {

    private final ApRecordRepository apRecordRepository;
    private final PrescriptionService prescriptionService;
    private final ProfileClient profileClient;

    @Override
    public Long createApRecord(ApRecordDTO request) throws HMSException {
        Optional<ApRecord> existingRecord = apRecordRepository.findByAppointment_Id(request.getAppointmentId());
        if(existingRecord.isPresent()){
            throw new HMSException("APPOINTMENT_RECORD_ALREADY_EXISTS");
        }   
        request.setCreatedAt(LocalDateTime.now());
        Long id = apRecordRepository.save(request.toEntity()).getId();
        if(request.getPrescription() != null){
            request.getPrescription().setAppointmentId(request.getAppointmentId());
            prescriptionService.savePrescription(request.getPrescription());
        }
        return id;
    }

    @Override
    public void updateApRecord(ApRecordDTO request) throws HMSException {
        ApRecord existingRecord = apRecordRepository.findById(request.getId()).orElseThrow(()-> new HMSException("APPOINTMENT_RECORD_NOT_FOUND"));
        existingRecord.setNotes(request.getNotes());
        existingRecord.setDiagnosis(request.getDiagnosis());
        existingRecord.setReferral(request.getReferral());  
        existingRecord.setSymptoms(StringListConvetor.convertListToString(request.getSymptoms()));
        existingRecord.setTest(StringListConvetor.convertListToString(request.getTest()));    
        existingRecord.setFollowUpDate(request.getFollowUpDate());
        apRecordRepository.save(existingRecord);
    }

    @Override
    public ApRecordDTO getApRecordByAppointmentId(Long appointmentId) throws HMSException {
        return apRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_RECORD_NOT_FOUND")).toDTO();
    }

    @Override
    public ApRecordDTO getApRecordById(Long recordId) throws HMSException {
        return apRecordRepository.findById(recordId).orElseThrow(()-> new HMSException("APPOINTMENT_RECORD_NOT_FOUND")).toDTO();
    }

    @Override
    public ApRecordDTO getApRecordDetailsByAppointmentId(Long appointmentId) throws HMSException {
        ApRecordDTO record = apRecordRepository.findByAppointment_Id(appointmentId)
        .orElseThrow(()-> new HMSException("APPOINTMENT_RECORD_NOT_FOUND")).toDTO();
        record.setPrescription(prescriptionService.getPrescriptionByAppointmentId(appointmentId));
        return record;
    }

    @Override
    public List<RecordDetails> getRecordsByPatientId(Long patientId) throws HMSException {
        List<ApRecord> records = apRecordRepository.findByPatientId(patientId);
        List<RecordDetails> recordDetails = records.stream().map(ApRecord::toRecordDetails).toList();

        List<Long> doctorIds = recordDetails.stream().map(RecordDetails::getDoctorId).distinct().toList();

        List<Doctorname> doctorNames = profileClient.getDoctorByIds(doctorIds);

        Map<Long, String> doctorIdNameMap = doctorNames.stream().collect(Collectors.toMap(Doctorname::getId, Doctorname::getName));
         recordDetails.forEach(record ->{
            String doctorName = doctorIdNameMap.get(record.getDoctorId());
            if(doctorName != null){
                record.setDoctorName(doctorName);
            }else{
                record.setDoctorName("Unknown Doctor");
            }
         });

          
       return recordDetails;
    }

    @Override
    public Boolean isRecordExist(Long appointmentId) throws HMSException {
        return apRecordRepository.existsByAppointment_Id(appointmentId);
    }
    
}
