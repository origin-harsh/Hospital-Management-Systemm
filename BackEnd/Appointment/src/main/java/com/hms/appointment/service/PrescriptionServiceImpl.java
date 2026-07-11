package com.hms.appointment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.Doctorname;
import com.hms.appointment.dto.PatientName;
import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;
import com.hms.appointment.entity.Prescription;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.PrescriptionRepository;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;
    private final MedicineService medicineService;
    private final ProfileClient profileClient;

    @Override
    public Long savePrescription(PrescriptionDTO request) {
        request.setPrescriptionDate(LocalDateTime.now());
        Long prescriptionId = prescriptionRepository.save(request.toEntity()).getId();
        request.getMedicines().forEach(medicine -> medicine.setPrescriptionId(prescriptionId));
       medicineService.saveMedicines(request.getMedicines());
        request.setId(prescriptionId);
        return prescriptionId;
    }

    @Override
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) throws HMSException {
       PrescriptionDTO prescriptionDTO = prescriptionRepository.findByAppointment_Id(appointmentId)
       .orElseThrow(() -> new HMSException("PRESCRIPTION_NOT_FOUND")).toDTO();
       prescriptionDTO.setMedicines(medicineService.getMedicinesByPrescriptionId(prescriptionDTO.getId()));
       
        return prescriptionDTO;
    }

    @Override
    public PrescriptionDTO getPrescriptionById(Long prescriptionId) throws HMSException {
        PrescriptionDTO prescriptionDTO = prescriptionRepository.findById(prescriptionId)
        .orElseThrow(() -> new HMSException("PRESCRIPTION_NOT_FOUND")).toDTO();
        return prescriptionDTO;
    }

    @Override
    public List<PrescriptionDetails> getPrescriptionDeatilsByPatientId(Long patientId) throws HMSException {
        List<Prescription> prescriptions = prescriptionRepository.findAllByPatientId(patientId);
        List<PrescriptionDetails> prescriptionDetails = prescriptions.stream().map(Prescription::toDetails).toList();
        prescriptionDetails.forEach(details->{
            details.setMedicines(medicineService.getMedicinesByPrescriptionId(details.getId()));
        });
        List<Long> doctorIds = prescriptionDetails.stream().map(PrescriptionDetails::getDoctorId).distinct().toList();
        List<Doctorname> doctorNames = profileClient.getDoctorByIds(doctorIds);
        Map<Long, String> doctorIdNameMap = doctorNames.stream().collect(Collectors.toMap(Doctorname::getId, Doctorname::getName));
        prescriptionDetails.forEach(details->{
            String doctorName = doctorIdNameMap.get(details.getDoctorId());
            if(doctorName != null){
                details.setDoctorName(doctorName);
            }
            else{
                details.setDoctorName("Unknown Doctor");
            }
        });

        return prescriptionDetails;
    }

    @Override
    public List<PrescriptionDetails> getAllPrescription() throws HMSException {
        List<Prescription> prescriptions = (List<Prescription>)prescriptionRepository.findAll();
        List<PrescriptionDetails> prescriptionDetails = prescriptions.stream().map(Prescription::toDetails).toList();

        List<Long> doctorIds = prescriptionDetails.stream().map(PrescriptionDetails::getDoctorId).distinct().toList();
        List<Long> patientIds = prescriptionDetails.stream().map(PrescriptionDetails::getPatientId).distinct().toList();
        List<Doctorname> doctorNames = profileClient.getDoctorByIds(doctorIds);
        List<PatientName> patientNames = profileClient.getPatientByIds(patientIds);
        Map<Long, String> doctorIdNameMap = doctorNames.stream().collect(Collectors.toMap(Doctorname::getId, Doctorname::getName));
        Map<Long, String> patientIdNameMap = patientNames.stream().collect(Collectors.toMap(PatientName::getId, PatientName::getName));
        prescriptionDetails.forEach(details->{
            String doctorName = doctorIdNameMap.get(details.getDoctorId());
            String patientName = patientIdNameMap.get(details.getPatientId());
            if(doctorName != null){
                details.setDoctorName(doctorName);
            }
            else{
                details.setDoctorName("Unknown Doctor");
            }
            if(patientName != null){
                details.setPatientName(patientName);
            }
            else{
                details.setPatientName("Unknown Patient");
            }
        });
        

        return prescriptionDetails;
    }

}


