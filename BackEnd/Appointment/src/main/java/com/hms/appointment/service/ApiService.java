package com.hms.appointment.service;

import javax.print.Doc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;

import reactor.core.publisher.Mono;

@Service
public class ApiService {
    @Autowired
    private WebClient.Builder webClient;

    public Mono<Boolean> doctorExist(Long Id) {
     
    
    return webClient.build()
                .get()
                .uri("http://localhost:9100/profile/doctor/exist/" + Id)
                .retrieve()
                .bodyToMono(Boolean.class);
    }

    public Mono<Boolean> patientExist(Long Id) {
     
    
        return webClient.build()
                    .get()
                    .uri("http://localhost:9100/profile/patient/exist/" + Id)
                    .retrieve()
                    .bodyToMono(Boolean.class);
        }
    public Mono<PatientDTO> getPatientById(Long Id) {
        return webClient.build()
                    .get()
                    .uri("http://localhost:9100/profile/patient/get/" + Id)
                    .retrieve()
                    .bodyToMono(PatientDTO.class);
    }

    public Mono<DoctorDTO> getDoctorById(Long Id) {
        return webClient.build()
                    .get()
                    .uri("http://localhost:9100/profile/doctor/get/" + Id)
                    .retrieve()
                    .bodyToMono(DoctorDTO.class);
    }
}
