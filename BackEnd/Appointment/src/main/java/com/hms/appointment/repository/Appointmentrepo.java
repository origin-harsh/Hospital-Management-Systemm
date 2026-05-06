package com.hms.appointment.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.hms.appointment.entity.appointment;
import java.util.List;
import com.hms.appointment.dto.AppointmentDetails;

public interface Appointmentrepo extends CrudRepository<appointment, Long> {
    
    @Query("SELECT new com.hms.appointment.dto.AppointmentDetails(a.id, a.patientId, null, null, null, a.doctorId, null, a.appointmentDate, a.status, a.reason, a.notes) FROM appointment a WHERE a.patientId = ?1")
    List<AppointmentDetails> findAllByPatientId(Long patientId);

    @Query("SELECT new com.hms.appointment.dto.AppointmentDetails(a.id, a.patientId, null, null, null, a.doctorId, null, a.appointmentDate, a.status, a.reason, a.notes) FROM appointment a WHERE a.doctorId = ?1")
    List<AppointmentDetails> findAllByDoctorId(Long doctorId);

}
