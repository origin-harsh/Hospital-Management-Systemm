package com.hms.appointment.repository;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.hms.appointment.entity.Medicine;

public interface MedicineRepository extends CrudRepository<Medicine, Long> {
    List<Medicine> findByPrescription_Id(Long prescriptionId);
}
