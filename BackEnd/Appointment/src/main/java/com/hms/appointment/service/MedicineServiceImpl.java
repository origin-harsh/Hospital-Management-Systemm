package com.hms.appointment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hms.appointment.dto.MedicineDTO;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.MedicineRepository;

import jakarta.transaction.Transactional;

import com.hms.appointment.entity.Medicine;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicineServiceImpl implements MedicineService {
    private final MedicineRepository medicineRepository;

    @Override
    public Long saveMedicine(MedicineDTO request)  {
        return medicineRepository.save(request.toEntity()).getId();
    }

    @Override
    public List<MedicineDTO> saveMedicines(List<MedicineDTO> requests)  {
        return ((List<Medicine>)medicineRepository.saveAll(requests.stream().map(MedicineDTO::toEntity).toList()))
                .stream().map(Medicine::toDTO).toList();
    }

    @Override
    public List<MedicineDTO> getMedicinesByPrescriptionId(Long prescriptionId)  {
        return ((List<Medicine>)medicineRepository.findByPrescription_Id(prescriptionId)).stream().map(Medicine::toDTO).toList();
    }
    
}
