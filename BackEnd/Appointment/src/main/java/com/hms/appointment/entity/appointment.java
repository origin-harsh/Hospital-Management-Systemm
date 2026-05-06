package com.hms.appointment.entity;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.Status;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
    private Status status;
    private String reason;
    private String notes;

    public AppointmentDTO toDTO(){
        return new AppointmentDTO(this.id, this.patientId, this.doctorId, this.appointmentDate, this.status, this.reason, this.notes);
    }

    public appointment(Long id){
         this.id = id;    
    }
}
