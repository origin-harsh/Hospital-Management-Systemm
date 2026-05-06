package com.hms.user.UserMS.utility;

import java.time.LocalDateTime;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorInfo {
    private String errorMessage;
    private Integer errorCode;
    private LocalDateTime timestamp;
    ErrorInfo(String errorMessage, int value, LocalDateTime now) {
        this.errorMessage = errorMessage;
        this.errorCode = Integer.valueOf(value);
        this.timestamp = now;
    }
}
