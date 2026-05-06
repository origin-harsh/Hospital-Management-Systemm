package com.hms.user.UserMS.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import com.hms.user.UserMS.config.FeignInterceptor;
import com.hms.user.UserMS.dto.UserDTO;

@FeignClient(name = "ProfileMS", configuration = FeignInterceptor.class)
public interface ProfileClient {
    @PostMapping("/profile/doctor/add")
    Long addDoctor(UserDTO userDTO);
    @PostMapping("/profile/patient/add")
    Long addPatient(UserDTO userDTO);
    
}
