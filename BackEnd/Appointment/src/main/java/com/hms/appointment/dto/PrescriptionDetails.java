package com.hms.appointment.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDetails {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private String doctorName;
    private String patientName;
    private Long appointmentId;
    private LocalDateTime prescriptionDate;
    private String notes;
    private List<MedicineDTO> medicines;
}
