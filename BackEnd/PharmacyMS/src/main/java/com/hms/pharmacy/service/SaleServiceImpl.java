package com.hms.pharmacy.service;

import org.springframework.stereotype.Service;

import com.hms.pharmacy.dto.SaleDTO;
import com.hms.pharmacy.dto.SaleRequest;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.exception.HMSException;
import com.hms.pharmacy.repository.SaleRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {
    private final SaleRepository saleRepository;

    private final SaleitemService saleitemService;

    @Override
    public Long createSale(SaleRequest saleDTO) throws HMSException {
        if(saleRepository.existsByPrescriptionId(saleDTO.getPrescriptionId()))
            throw new HMSException("SALE_ALREADY_EXISTS");
        saleDTO.setSaleDate(java.time.LocalDateTime.now());
        return saleRepository.save(saleDTO.toEntity()).getId();
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
    
}
