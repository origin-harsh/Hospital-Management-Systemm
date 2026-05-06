package com.hms.appointment.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.hms.appointment.entity.ApRecord;
import com.hms.appointment.entity.appointment;
import com.hms.appointment.utility.StringListConvetor;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor


public class ApRecordDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private Long appointmentId;
    private List<String> symptoms;
    private String diagnosis;
    private List<String> test;
    private String notes;
    private String referral;
    private PrescriptionDTO prescription;
    private LocalDate followUpDate;
    private LocalDateTime createdAt;

    public ApRecord toEntity(){
        return new ApRecord(this.id, this.patientId, this.doctorId, new appointment(appointmentId), StringListConvetor.convertListToString(symptoms), this.diagnosis, StringListConvetor.convertListToString(test), this.notes, this.referral, this.followUpDate, this.createdAt);
    }
}
