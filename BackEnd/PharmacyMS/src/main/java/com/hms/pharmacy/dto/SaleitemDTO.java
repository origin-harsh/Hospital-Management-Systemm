package com.hms.pharmacy.dto;

import com.hms.pharmacy.entity.Saleitem;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.entity.Medicine;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleitemDTO {
    private Long id;
    private Long saleId;
    private Long medicineId;
    private String batchNo;
    private Integer quantity;
    private Double unitPrice;

    public Saleitem toEntity() {
        return new Saleitem(
            id,
            new Sale(saleId),
            new Medicine(medicineId),
            batchNo,
            quantity,
            unitPrice
        );
    }
}
