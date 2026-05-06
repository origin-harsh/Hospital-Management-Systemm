package com.hms.appointment.dto;

import java.time.LocalDate;


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
    private String gender;
    private String phone;
    private String address;
    private String licenseNo;
    private String specialization;
    private String department;
    private String totalExp;

   
}
