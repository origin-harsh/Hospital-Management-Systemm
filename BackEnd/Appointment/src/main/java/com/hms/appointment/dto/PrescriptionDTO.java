package com.hms.appointment.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.appointment.entity.appointment;
import com.hms.appointment.entity.Prescription;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.List;
import com.hms.appointment.dto.MedicineDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDTO {
      private Long id;
    private Long patientId;
    private Long doctorId;
    private Long appointmentId;
    private LocalDateTime prescriptionDate;
    private String notes;
    private List<MedicineDTO> medicines;

    public Prescription toEntity() {
        return new Prescription(id, patientId, doctorId, new appointment(appointmentId), prescriptionDate, notes);
    }
}
