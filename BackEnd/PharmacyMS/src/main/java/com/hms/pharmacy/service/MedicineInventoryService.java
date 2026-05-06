package com.hms.pharmacy.service;

import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.dto.MedicineInventoryDTO;
import java.util.List;

public interface MedicineInventoryService {
  List<MedicineInventoryDTO> getAllMedicineInventory() throws HMSException;

  MedicineInventoryDTO getmedicineById(Long id) throws HMSException;
  MedicineInventoryDTO addMedicine(MedicineInventoryDTO medicineInventoryDTO) throws HMSException;
  MedicineInventoryDTO updateMedicine(MedicineInventoryDTO medicineInventoryDTO) throws HMSException;
   void deleteMedicine(Long id) throws HMSException;
   void deleteExpiredMedicines() throws HMSException;

    
}
