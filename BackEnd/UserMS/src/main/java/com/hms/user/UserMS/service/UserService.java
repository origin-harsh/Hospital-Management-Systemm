package com.hms.user.UserMS.service;

import com.hms.user.UserMS.dto.UserDTO;
import com.hms.user.UserMS.exception.HMSException;


public interface UserService {
        public void registerUser(UserDTO userDTO) throws HMSException;
        public UserDTO loginUser(UserDTO userDTO) throws HMSException;
        public UserDTO getUserById(Long id) throws HMSException;
        public void updateUser(UserDTO userDTO) throws HMSException;
        public UserDTO getUser(String email) throws HMSException;
    
} 