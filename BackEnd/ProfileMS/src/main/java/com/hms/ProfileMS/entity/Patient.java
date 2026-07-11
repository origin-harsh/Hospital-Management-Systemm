package com.hms.ProfileMS.entity;



import java.time.LocalDate;

import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.dto.bloodGroup;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;





@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Patient {
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
    private String aadharNo;
    private bloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;
    
     public PatientDTO toDTO() {
        return new PatientDTO(this.Id, this.name, this.email, this.dob, this.ProfilePictureId, this.gender, this.phone, this.address, this.aadharNo, this.bloodGroup, this.allergies, this.chronicDisease);
    }
    
}
