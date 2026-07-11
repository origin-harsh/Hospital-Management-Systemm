package com.hms.pharmacy.entity;
import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import com.hms.pharmacy.dto.SaleDTO;

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
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long prescriptionId;
    private String buyerName;
    private String buyerContact;
    private LocalDateTime saleDate;
    private Double totalAmount;

    public Sale(Long id){
        this.id = id;
    }

    public SaleDTO toDTO() {
        return new SaleDTO(
            id,
            prescriptionId,
            buyerName,
            buyerContact,
            saleDate,
            totalAmount
        );
    }
}
