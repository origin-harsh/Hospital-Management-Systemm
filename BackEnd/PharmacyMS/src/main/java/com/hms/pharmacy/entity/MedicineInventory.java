package com.hms.pharmacy.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.dto.StockStatus;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;
    private String batchNo;
    private Integer quantity;
    private LocalDate expiryDate;
    private LocalDate addedDate;
    private Integer initialQuantity;
    @Enumerated(EnumType.STRING)
    private StockStatus stockStatus;


    public MedicineInventoryDTO toDTO(){
        return new MedicineInventoryDTO(id, medicine != null ? medicine.getId() : null, batchNo, quantity, expiryDate, addedDate, initialQuantity, stockStatus);
    }
}
