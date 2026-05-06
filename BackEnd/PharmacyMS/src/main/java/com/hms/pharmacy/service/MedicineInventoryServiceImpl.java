package com.hms.pharmacy.service;

import com.hms.pharmacy.api.MedicineAPI;
import com.hms.pharmacy.api.MedicineInventoryAPI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.dto.StockStatus;
import com.hms.pharmacy.entity.MedicineInventory;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.repository.MedicineInventoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class MedicineInventoryServiceImpl implements MedicineInventoryService{

    private final MedicineInventoryRepository medicineInventoryRepository;
    private final MedicineService medicineService;



    @Override
    public List<MedicineInventoryDTO> getAllMedicineInventory() throws HMSException {
        List<MedicineInventory> inventory = (List<MedicineInventory>) medicineInventoryRepository.findAll();
        return inventory.stream().map(MedicineInventory::toDTO).toList();
    }

    @Override
    public MedicineInventoryDTO getmedicineById(Long id) throws HMSException {
        return medicineInventoryRepository.findById(id).orElseThrow(()-> new HMSException("INVENTORY_NOT_FOUND")).toDTO();
    }

    @Override
    public MedicineInventoryDTO addMedicine(MedicineInventoryDTO medicineInventoryDTO) throws HMSException {
        
        
             medicineInventoryDTO.setAddedDate(LocalDate.now());
             medicineService.addStock(medicineInventoryDTO.getMedicineId(), medicineInventoryDTO.getQuantity());
             medicineInventoryDTO.setInitialQuantity(medicineInventoryDTO.getQuantity());
             if(medicineInventoryDTO.getExpiryDate().isBefore(LocalDate.now())){
                medicineInventoryDTO.setStockStatus(StockStatus.EXPIRED);
             }
             else if(medicineInventoryDTO.getExpiryDate().isBefore(medicineInventoryDTO.getAddedDate()))
             {
                    medicineInventoryDTO.setStockStatus(StockStatus.EXPIRED);
                
             }else{
                medicineInventoryDTO.setStockStatus(StockStatus.VALID);
             }
             
            return medicineInventoryRepository.save(medicineInventoryDTO.toEntity()).toDTO();
        
       
    }

    @Override
    public MedicineInventoryDTO updateMedicine(MedicineInventoryDTO medicineInventoryDTO) throws HMSException {
       MedicineInventory existinventory = medicineInventoryRepository.findById(medicineInventoryDTO.getId()).orElseThrow(()->new HMSException("INVENTORY_NOT_FOUND"));
       existinventory.setAddedDate(medicineInventoryDTO.getAddedDate());
       existinventory.setBatchNo(medicineInventoryDTO.getBatchNo());
      
     
       if(existinventory.getInitialQuantity() < medicineInventoryDTO.getQuantity()){
        medicineService.addStock(medicineInventoryDTO.getMedicineId(), medicineInventoryDTO.getQuantity() - existinventory.getInitialQuantity());

       }else if(existinventory.getInitialQuantity() > medicineInventoryDTO.getQuantity()){
         medicineService.removeStock(medicineInventoryDTO.getMedicineId(), existinventory.getInitialQuantity() -  medicineInventoryDTO.getQuantity());
       }
       existinventory.setQuantity(medicineInventoryDTO.getQuantity());
        existinventory.setInitialQuantity(medicineInventoryDTO.getQuantity());
          existinventory.setExpiryDate(medicineInventoryDTO.getExpiryDate());
       return medicineInventoryRepository.save(existinventory).toDTO();
    }

    @Override
    public void deleteMedicine(Long id) throws HMSException {
        // MedicineInventory med = medicineInventoryRepository.findById(id).orElseThrow(()->new HMSException("MEDICINE_NOT_FOUND"));
        // medicineService.removeStock(id, med.getQuantity());


       medicineInventoryRepository.deleteById(id);
    }

    private void markExpired(List<MedicineInventory> med) throws HMSException{
        for(MedicineInventory m : med){
            m.setStockStatus(StockStatus.EXPIRED);

        }
        medicineInventoryRepository.saveAll(med);
        
    }

    @Override
    @Scheduled(cron = "0 33 21 * * ?") // Runs every day at midnight
    public void deleteExpiredMedicines() throws HMSException{
        System.out.println("Running scheduled task to delete expired medicines...");
        List<MedicineInventory> expiredMedicines = medicineInventoryRepository.findByExpiryDateBefore(LocalDate.now());
        for(MedicineInventory med : expiredMedicines){
            medicineService.removeStock(med.getMedicine().getId(), med.getQuantity());
    
           
        }
        this.markExpired(expiredMedicines);
        
        
    }


    
    
}
