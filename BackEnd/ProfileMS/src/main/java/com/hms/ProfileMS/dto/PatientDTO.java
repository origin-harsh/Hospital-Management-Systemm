package com.hms.ProfileMS.dto;

import java.time.LocalDate;

import com.hms.ProfileMS.entity.Patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long Id;
    private String name;
    private String email;
    private LocalDate dob;
    private Long ProfilePictureId;
    private String gender;
    private String phone;
    private String address;
    private String aadharNo;
    private bloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;
    
    public Patient toEntity() {
        return new Patient(this.Id, this.name, this.email, this.dob, this.ProfilePictureId, this.gender, this.phone, this.address, this.aadharNo, this.bloodGroup, this.allergies, this.chronicDisease);
    }
}
