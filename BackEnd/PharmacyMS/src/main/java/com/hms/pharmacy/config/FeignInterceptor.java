package com.hms.pharmacy.config;

import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;

@Configuration
public class FeignInterceptor implements RequestInterceptor{

    @Override
    public void apply(RequestTemplate template) {
      
        template.header("X-Secret-Key", "SECRET");
    }
    
}
