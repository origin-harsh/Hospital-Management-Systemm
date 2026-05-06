package com.hms.pharmacy.entity;

import org.hibernate.annotations.ManyToAny;

import com.hms.pharmacy.dto.SaleitemDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Saleitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;
    private String batchNo;
    private Integer quantity;
    private Double unitPrice;

    public SaleitemDTO toDTO() {
        return new SaleitemDTO(
            id,
            sale != null ? sale.getId() : null,
            medicine != null ? medicine.getId() : null,
            batchNo,
            quantity,
            unitPrice
        );
    }

    

}
