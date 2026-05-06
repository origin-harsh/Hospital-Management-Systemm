package com.hms.appointment.dto;

import java.time.LocalDate;


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
    private String gender;
    private String phone;
    private String address;
    private String aadharNo;
    private bloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;
    

}
