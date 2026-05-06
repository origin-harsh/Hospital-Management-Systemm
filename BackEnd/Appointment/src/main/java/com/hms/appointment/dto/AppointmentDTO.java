package com.hms.appointment.dto;

import java.time.LocalDateTime;

import com.hms.appointment.entity.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
    private Status status;
    private String reason;
    private String notes;

    public appointment toEntity(){
            return new appointment(this.id, this.patientId, this.doctorId, this.appointmentDate, this.status, this.reason, this.notes);
    }
    
}
