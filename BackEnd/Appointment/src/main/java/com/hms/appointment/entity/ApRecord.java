package com.hms.appointment.entity;

import org.springframework.cglib.core.Local;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.utility.StringListConvetor;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ApRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private appointment appointment;
    private String symptoms;
    private String diagnosis;
    private String test;
    private String notes;
    private String referral;
    private LocalDate followUpDate;
    private LocalDateTime createdAt;

   public ApRecordDTO toDTO(){
        return new ApRecordDTO(this.id, this.patientId, this.doctorId, this.appointment.getId(), StringListConvetor.convertStringToList(this.symptoms), this.diagnosis, StringListConvetor.convertStringToList(this.test), this.notes, this.referral,null, this.followUpDate, this.createdAt);
    }

    public RecordDetails toRecordDetails(){
         return new RecordDetails(id, patientId, doctorId, null, appointment.getId(), StringListConvetor.convertStringToList(this.symptoms), diagnosis, StringListConvetor.convertStringToList(test), notes, referral, followUpDate, createdAt);
       
    }
}
