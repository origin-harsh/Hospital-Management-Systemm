package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.dto.MedicineDTO;
import com.hms.pharmacy.exception.HMSException;

public interface MedicineService {
  public Long addMedicine(MedicineDTO medicineDTO) throws HMSException;
  public MedicineDTO getMedicineById(Long Id) throws HMSException;
  public void updateMedcine( MedicineDTO medicineDTO) throws HMSException;
  public List<MedicineDTO> getAllMedicine() throws HMSException;
  public Integer getStockById(Long id) throws HMSException;

  public Integer addStock(Long id, Integer quantity) throws HMSException;
  public Integer removeStock(Long id, Integer quantity) throws HMSException;

    
} 
