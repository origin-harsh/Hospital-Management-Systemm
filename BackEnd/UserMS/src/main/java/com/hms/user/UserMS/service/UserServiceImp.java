package com.hms.user.UserMS.service;

import java.lang.StackWalker.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.user.UserMS.repository.UserRepository;
import com.hms.user.UserMS.entity.User;
import com.hms.user.UserMS.exception.HMSException;


import java.util.Optional;

import com.hms.user.UserMS.clients.ProfileClient;
import com.hms.user.UserMS.dto.Roles;
import com.hms.user.UserMS.dto.UserDTO;


@Service("userService")
@Transactional
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    // @Autowired
    // private ApiService apiService;


    @Autowired
    private ProfileClient profileClient;

    
    @Override
    public void registerUser(UserDTO userDTO) throws HMSException{
         Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
         if(existingUser.isPresent()) {
            throw new HMSException("USER_ALREADY_EXISTS");
         }

        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        Long profileId = null;
        if(userDTO.getRole().equals(Roles.DOCTOR)){
            profileId = profileClient.addDoctor(userDTO);

        }
        else if(userDTO.getRole().equals(Roles.PATIENT)){
            profileId = profileClient.addPatient(userDTO);
        }
        System.out.println("Profile ID: " + profileId);
        userDTO.setProfileId(profileId);
        
        userRepository.save(userDTO.toEntity());
    }
 
    @Override
    public UserDTO loginUser(UserDTO userDTO) throws HMSException {
        User user = userRepository.findByEmail((userDTO.getEmail())).orElseThrow(()->
         new HMSException("USER_NOT_FOUND"));
         if(!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())){
            throw new HMSException("INVALID_CREDENTIALS");
         }
         user.setPassword("null");
         return user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) throws HMSException {
      return userRepository.findById(id).orElseThrow(()->
        new HMSException("USER_NOT_FOUND")).toDTO();   
        
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public UserDTO getUser(String email) throws HMSException {
        return userRepository.findByEmail(email).orElseThrow(() -> new HMSException("USER_NOT_FOUND")).toDTO();
    }
    
}
