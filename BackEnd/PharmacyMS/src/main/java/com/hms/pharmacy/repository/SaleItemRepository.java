package com.hms.pharmacy.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.pharmacy.entity.Saleitem;

public interface SaleItemRepository extends CrudRepository<Saleitem, Long>{
    List<Saleitem> findBySaleId(Long saleId);
    List<Saleitem> findByMedicineId(Long medicineId);
}
