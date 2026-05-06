package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.MedicineDTO;
import com.hms.appointment.exception.HMSException;

public interface MedicineService {
    public Long saveMedicine(MedicineDTO request) ;
    public List<MedicineDTO> saveMedicines(List<MedicineDTO> requests);
    public List<MedicineDTO> getMedicinesByPrescriptionId(Long prescriptionId);
}
