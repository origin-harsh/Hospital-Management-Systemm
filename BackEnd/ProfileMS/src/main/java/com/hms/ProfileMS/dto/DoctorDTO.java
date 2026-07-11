package com.hms.ProfileMS.dto;

import java.time.LocalDate;

import com.hms.ProfileMS.entity.Doctor;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private Long Id;
    private String name;
    private String email;
    private LocalDate dob;
    private Long ProfilePictureId;
    private String gender;
    private String phone;
    private String address;
    private String licenseNo;
    private String specialization;
    private String department;
    private String totalExp;

    public Doctor toEntity() {
        return new Doctor(this.Id, this.name, this.email, this.dob, this.ProfilePictureId, this.gender, this.phone, this.address, this.licenseNo, this.specialization, this.department, this.totalExp);
    }
}
