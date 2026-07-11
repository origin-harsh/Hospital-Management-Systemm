package com.hms.pharmacy.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.dto.SaleRequest;
import com.hms.pharmacy.dto.SaleitemDTO;
import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.repository.SaleRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {
    private final SaleRepository saleRepository;


    private final SaleitemService saleitemService;
    private final MedicineInventoryService medicineInventoryService;

    @Override
    @Transactional
    public Long createSale(SaleRequest dto) throws HMSException {
        if(dto.getPrescriptionId() != null && saleRepository.existsByPrescriptionId(dto.getPrescriptionId())){
            throw new HMSException("SALE_ALREADY_EXISTS");
        }
        for(SaleitemDTO saleItem: dto.getSaleItems()){
            saleItem.setBatchNo(
            medicineInventoryService.sellStock(saleItem.getMedicineId(), saleItem.getQuantity()));
        }
        Sale sale = new Sale(null, dto.getPrescriptionId(), dto.getBuyerName(), dto.getBuyerContact(), LocalDateTime.now(), dto.getTotalAmount());
        sale = saleRepository.save(sale);
        saleitemService.createSaleitems(sale.getId(), dto.getSaleItems());
        return sale.getId();
    }

    @Override
    public void updateSale(SaleDTO saleDTO) throws HMSException {
        Sale sale = saleRepository.findById(saleDTO.getId()).orElseThrow(() -> new HMSException("SALE_NOT_FOUND"));
        sale.setSaleDate(saleDTO.getSaleDate());
        sale.setTotalAmount(saleDTO.getTotalAmount());
        saleRepository.save(saleDTO.toEntity());
    }

    @Override
    public SaleDTO getSale(Long id) throws HMSException {
        return saleRepository.findById(id).orElseThrow(() -> new HMSException("SALE_NOT_FOUND")).toDTO();
    }

    @Override
    public SaleDTO getSaleByPrescriptionId(Long prescriptionId) throws HMSException {
        return saleRepository.findByPrescriptionId(prescriptionId).orElseThrow(() -> new HMSException("SALE_NOT_FOUND")).toDTO();
    }

    @Override
    public List<SaleDTO> getAllSales() throws HMSException {
         return ((List<Sale>) saleRepository.findAll()).stream().map(Sale::toDTO).toList();
    }
    
}
