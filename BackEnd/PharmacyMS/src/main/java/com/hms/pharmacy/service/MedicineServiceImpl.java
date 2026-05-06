package com.hms.pharmacy.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hms.pharmacy.dto.MedicineDTO;
import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.repository.MedicineRepository;

import jakarta.transaction.Transactional;

import java.util.Collection;
import java.util.List;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor

public class MedicineServiceImpl implements MedicineService {
   private final MedicineRepository medicineRepository;


    @Override
    public Long addMedicine(MedicineDTO medicineDTO) throws HMSException {
      Optional<Medicine> optional = medicineRepository.findByNameIgnoreCaseAndDosageIgnoreCase(medicineDTO.getName(), medicineDTO.getDosage());
      if(optional.isPresent()){
        throw new HMSException("MEDICINE_ALREADY_EXIST");
      }
      medicineDTO.setStock(medicineDTO.getStock() != null ? medicineDTO.getStock() : 0);
      medicineDTO.setCreatedAt(LocalDateTime.now());
      return medicineRepository.save(medicineDTO.toEntity()).getId();

    }

    @Override
    public MedicineDTO getMedicineById(Long Id) throws HMSException {
        return medicineRepository.findById(Id).orElseThrow(()->new HMSException("MEDICINE_NOT_FOUND")).toDTO();
    }

    @Override
    public void updateMedcine(MedicineDTO medicineDTO) throws HMSException {
        Medicine existingMedicine = medicineRepository.findById(medicineDTO.getId()).orElseThrow(()-> new HMSException("MEDICINE_NOT_FOUND"));
        if(!medicineDTO.getName().equalsIgnoreCase(existingMedicine.getName()) || !medicineDTO.getDosage().equalsIgnoreCase(existingMedicine.getDosage())){
             Optional<Medicine> optional = medicineRepository.findByNameIgnoreCaseAndDosageIgnoreCase(medicineDTO.getName(), medicineDTO.getDosage());
            if(optional.isPresent()){
                throw new HMSException("MEDICINE_ALREADY_EXIST");
            }
            existingMedicine.setName(medicineDTO.getName());
            existingMedicine.setDosage(medicineDTO.getDosage());
            existingMedicine.setCategory(medicineDTO.getCategory());
            existingMedicine.setType(medicineDTO.getType());
            existingMedicine.setManufacturer(medicineDTO.getManufacturer());
            existingMedicine.setUnitprice(medicineDTO.getUnitprice());
            medicineRepository.save(existingMedicine);

        }
        
    }

    @Override
    public List<MedicineDTO> getAllMedicine() throws HMSException {
        return ((List<Medicine>) medicineRepository.findAll()).stream().map(Medicine::toDTO).toList();
    }

    @Override
    public Integer getStockById(Long id) throws HMSException {
        return medicineRepository.findStockById(id).orElseThrow(()->new HMSException("NO_STOCK_FOUND"));
    }

    @Override
    public Integer addStock(Long id, Integer quantity) throws HMSException {
       Medicine medicine =  medicineRepository.findById(id).orElseThrow(()->new HMSException("NO_MEDICINE_FOUND"));
       medicine.setStock(medicine.getStock() != null ? medicine.getStock()+quantity : quantity);
       medicineRepository.save(medicine);
       return medicine.getStock();
    }

    @Override
    public Integer removeStock(Long id, Integer quantity) throws HMSException {
         Medicine medicine =  medicineRepository.findById(id).orElseThrow(()->new HMSException("NO_MEDICINE_FOUND"));
       medicine.setStock(medicine.getStock() != null ? medicine.getStock()-quantity : quantity);
       medicineRepository.save(medicine);
       return medicine.getStock();
    }

    
    
}
