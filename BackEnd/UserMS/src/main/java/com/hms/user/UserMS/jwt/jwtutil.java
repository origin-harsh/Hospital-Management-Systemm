package com.hms.user.UserMS.jwt;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class jwtutil {
    private static final Long JWT_TOKEN_VALIDITY = 5 * 60 * 60L;
    private static final String SECRET_KEY = "69f2d270b0981bb6305d402ba32264e7151c428ed59570a73014509481b9fdd361297deb4e31dd98ca5eecbddc9ea5d9e73f54b26d6411dc05fafabfa34d6425";
   
    public String generateToken(UserDetails userDetails){ 
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());

        return doGenerateToken(claims, userDetails.getUsername());
    }
    
    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .compact();
    }
    
 
}


