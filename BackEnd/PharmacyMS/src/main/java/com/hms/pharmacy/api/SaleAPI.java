package com.hms.pharmacy.api;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pharmacy.dto.ResponseDTO;
import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.dto.SaleRequest;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.service.SaleService;
import com.hms.pharmacy.service.SaleitemService;
import com.hms.pharmacy.dto.SaleitemDTO;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@CrossOrigin
@RequestMapping("/pharmacy/sales")
@Validated
@RequiredArgsConstructor
public class SaleAPI {
    private final SaleService saleService;
    private final SaleitemService saleitemService; 

    @PostMapping("/add")
    public ResponseEntity<Long> createSale(@RequestBody SaleRequest saleDTO) throws HMSException {
        return new ResponseEntity<>(saleService.createSale(saleDTO),HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> putMethodName(@RequestBody SaleDTO saleDTO) throws HMSException {
        saleService.updateSale(saleDTO);
        return new ResponseEntity<>(new ResponseDTO("Sale Updated Successfully"),HttpStatus.OK);
    }

    @GetMapping("/getSaleItems/{saleId}")
    public ResponseEntity<List<SaleitemDTO>> getSaleItems(@PathVariable Long saleId) throws HMSException  {
        return new ResponseEntity<>(saleitemService.getSaleitemBySaleId(saleId), HttpStatus.OK);
    }
    

    @GetMapping("/getById/{id}")
    public ResponseEntity<SaleDTO> getSaleById(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(saleService.getSale(id),HttpStatus.OK);
    }   
    
    @GetMapping("/getByPrescriptionId/{prescriptionId}")
    public ResponseEntity<SaleDTO> getSaleByPrescriptionId(@PathVariable Long prescriptionId) throws HMSException {
        return new ResponseEntity<>(saleService.getSaleByPrescriptionId(prescriptionId),HttpStatus.OK);
    }  
    
    @GetMapping("/getAll")
    public ResponseEntity<List<SaleDTO>> getAllSales() throws HMSException {
        return new ResponseEntity<>(saleService.getAllSales(),HttpStatus.OK);
    }
    
}
