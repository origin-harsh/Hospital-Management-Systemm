package com.hms.ProfileMS.entity;

import java.time.LocalDate;

import com.hms.ProfileMS.dto.DoctorDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    @Column(unique = true)
    private String email;
    private LocalDate dob;
    private Long ProfilePictureId;
    private String gender;
    private String phone;
    private String address;
    @Column(unique = true)
    private String licenseNo;
    private String specialization;
    private String department;
    private String totalExp;

    public DoctorDTO toDTO() {
        return new DoctorDTO(this.Id, this.name, this.email, this.dob, this.ProfilePictureId, this.gender, this.phone, this.address, this.licenseNo, this.specialization, this.department, this.totalExp);
    }
}
