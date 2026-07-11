package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.dto.SaleitemDTO;
import com.hms.pharmacy.entity.Sale;
import com.hms.pharmacy.entity.Saleitem;
import com.hms.pharmacy.exception.HMSException;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.repository.SaleItemRepository;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor

public class SaleitemServiceImpl implements SaleitemService {


    private final SaleItemRepository saleItemRepository;
    private final MedicineInventoryService medicineInventoryService;
    private final MedicineService medicineService;

    @Override
    public Long createSaleitem(SaleitemDTO saleitemDTO) throws HMSException {
        saleitemDTO.setUnitPrice(medicineService.getMedicineById(saleitemDTO.getMedicineId()).getUnitprice());
        return saleItemRepository.save(saleitemDTO.toEntity()).getId();
    }

    @Override
    public void createMultipleSaleitems(Long saleId, Long medicineId, List<SaleitemDTO> saleitemDTOs)
            throws HMSException {
        saleitemDTOs.stream().map((x)->{
            x.setSaleId(saleId);
            x.setMedicineId(medicineId);
            try {
                x.setUnitPrice(medicineService.getMedicineById(medicineId).getUnitprice());
            } catch (HMSException e) {
                e.printStackTrace();
            }
            return x.toEntity();
        }).forEach(saleItemRepository::save);
    }

    @Override
    public void updateSaleitem(SaleitemDTO saleitemDTO) throws HMSException {
        Saleitem existingSaleitem = saleItemRepository.findById(saleitemDTO.getId()).orElseThrow(() -> new HMSException("SALEITEM_NOT_FOUND"));
        existingSaleitem.setQuantity(saleitemDTO.getQuantity());
        existingSaleitem.setUnitPrice(saleitemDTO.getUnitPrice());
        saleItemRepository.save(existingSaleitem);
    
    }

    @Override
    public SaleitemDTO getSaleitem(Long id) throws HMSException {
       return saleItemRepository.findById(id).orElseThrow(() -> new HMSException("SALEITEM_NOT_FOUND")).toDTO();
    }

    @Override
    public List<SaleitemDTO> getSaleitemBySaleId(Long id) throws HMSException {
       return saleItemRepository.findBySaleId(id).stream().map(Saleitem::toDTO).toList();
    }

    @Override
    public void createSaleitems(Long saleId, List<SaleitemDTO> saleitemDTOs) throws HMSException {
       
        saleitemDTOs.stream().map((x)->{
            x.setSaleId(saleId);
            try {
                x.setUnitPrice(medicineService.getMedicineById(x.getMedicineId()).getUnitprice());
            } catch (HMSException e) {
            
                e.printStackTrace();
            }
            return x.toEntity();
        }).forEach(saleItemRepository::save);
    }
    
}
