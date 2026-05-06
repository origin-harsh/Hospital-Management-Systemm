package com.hms.user.UserMS.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/health")
public class health {
    
    @GetMapping
    public String getMethodName() {
        return "UserMS is healthy";
    }
    
}
