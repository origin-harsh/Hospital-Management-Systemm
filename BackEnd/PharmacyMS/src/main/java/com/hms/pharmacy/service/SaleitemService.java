package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.dto.SaleitemDTO;
import com.hms.pharmacy.exception.HMSException;

public interface SaleitemService {
    Long createSaleitem(SaleitemDTO saleitemDTO) throws HMSException;
    void createMultipleSaleitems(Long saleId, Long medicineId, List<SaleitemDTO> saleitemDTOs) throws HMSException;
    void updateSaleitem(SaleitemDTO saleitemDTO) throws HMSException;
    SaleitemDTO getSaleitem(Long id) throws HMSException;
    List<SaleitemDTO> getSaleitemBySaleId(Long id) throws HMSException;

    
}
