package com.hms.pharmacy.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.pharmacy.dto.MedicineDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String dosage;
    private MedicineType type;    
    private MedicineCategory category;  
    private String manufacturer;
    private Integer stock;
    private Integer unitprice;
    private LocalDateTime createdAt;
    

    public MedicineDTO toDTO() {
    return new MedicineDTO(
        id,
        name,
        dosage,
        type,
        category,
        manufacturer,
        stock,
        unitprice,
        createdAt
    );
}
    public Medicine(Long id){
        this.id  = id;
    }
}
