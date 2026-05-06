package com.hms.pharmacy.api;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pharmacy.dto.MedicineInventoryDTO;
import com.hms.pharmacy.dto.ResponseDTO;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.service.MedicineInventoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
@RequestMapping("/pharmacy/inventory")
@Validated
@RequiredArgsConstructor
public class MedicineInventoryAPI {

    private final MedicineInventoryService medicineInventoryService;

    @GetMapping("/getAll")
    public ResponseEntity<List<MedicineInventoryDTO>> getAllInventory() throws HMSException{
        return new ResponseEntity<>(medicineInventoryService.getAllMedicineInventory(),HttpStatus.OK);
    }
    
    @GetMapping("/getById/{id}")
    public ResponseEntity<MedicineInventoryDTO> getInventoryById(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(medicineInventoryService.getmedicineById(id),HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<MedicineInventoryDTO> addInventory(@RequestBody MedicineInventoryDTO medicineInventoryDTO) throws HMSException
     {
       
        
        return new ResponseEntity<>(medicineInventoryService.addMedicine(medicineInventoryDTO),HttpStatus.CREATED);
    }
    
    @PutMapping("/update")
    public ResponseEntity<MedicineInventoryDTO> updateInventory(@RequestBody MedicineInventoryDTO medicineInventoryDTO) throws HMSException {
        return new ResponseEntity<>(medicineInventoryService.updateMedicine(medicineInventoryDTO),HttpStatus.OK);
    }

    // @DeleteMapping("/delete/{id}")
    // public ResponseEntity<Void> deleteInventory(@PathVariable Long id) throws HMSException{
    //     medicineInventoryService.deleteMedicine(id);
    //     return new ResponseEntity<>(new ResponseDTO("Medicine deleted successfully"),HttpStatus.OK);
    // }
    
}
