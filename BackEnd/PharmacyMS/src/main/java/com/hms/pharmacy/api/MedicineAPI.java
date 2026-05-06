package com.hms.pharmacy.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pharmacy.dto.MedicineDTO;
import com.hms.pharmacy.dto.ResponseDTO;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.service.MedicineService;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
@RequestMapping("/pharmacy/medicines")
@Validated
@RequiredArgsConstructor
public class MedicineAPI {
    private final MedicineService medicineService;
      @PostMapping("/add")
      public ResponseEntity<Long> addMedicine(@RequestBody MedicineDTO medicineDTO) throws HMSException {
          return new ResponseEntity<>(medicineService.addMedicine(medicineDTO),HttpStatus.CREATED);
      }
      
      @GetMapping("/get/{id}")
      public ResponseEntity<MedicineDTO> getMedicineById(@PathVariable Long id) throws HMSException{
          return new ResponseEntity<>(medicineService.getMedicineById(id),HttpStatus.OK);
      }

      @PutMapping("update")
      public ResponseEntity<ResponseDTO> updateMedicine(@RequestBody MedicineDTO medicineDTO) throws HMSException {
        medicineService.updateMedcine(medicineDTO);
          return new ResponseEntity<>(new ResponseDTO("Medicine Updated Successfully"),HttpStatus.OK);
      }
      
      @GetMapping("/getAll")
      public ResponseEntity<List<MedicineDTO>> getAllMedicine() throws HMSException {
          return new ResponseEntity<>(medicineService.getAllMedicine(),HttpStatus.OK);
      }
      
    
}
