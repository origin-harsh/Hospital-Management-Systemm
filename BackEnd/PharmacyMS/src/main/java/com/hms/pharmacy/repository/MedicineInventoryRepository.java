package com.hms.pharmacy.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.pharmacy.dto.StockStatus;
import com.hms.pharmacy.entity.MedicineInventory;


public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory, Long>{
    List<MedicineInventory> findByExpiryDateBefore(LocalDate date);

//medicineId and expiredate>now an quantity>0 top 1 asc by expiryDate
    List<MedicineInventory> findByMedicineIdAndExpiryDateAfterAndQuantityGreaterThanAndStockStatusOrderByExpiryDateAsc(Long medicineId, LocalDate date, Integer quantity, StockStatus status);    
    
}
