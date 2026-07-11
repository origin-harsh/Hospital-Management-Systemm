package com.hms.pharmacy.dto;

import java.time.LocalDateTime;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.MedicineCategory;
import com.hms.pharmacy.entity.MedicineType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDTO {
    private Long id;
    private String name;
    private String dosage;
    private MedicineType type;    
    private MedicineCategory category;  
    private String manufacturer;
    private Integer stock;
    private Double unitprice;
    private LocalDateTime createdAt;

    public Medicine toEntity(){
        return new Medicine(id, name, dosage, type, category, manufacturer, stock, unitprice, createdAt);
    }
} 
