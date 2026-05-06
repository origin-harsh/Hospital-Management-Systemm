package com.hms.GatewayMS.Filter;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    private static final String SECRET_KEY = "69f2d270b0981bb6305d402ba32264e7151c428ed59570a73014509481b9fdd361297deb4e31dd98ca5eecbddc9ea5d9e73f54b26d6411dc05fafabfa34d6425";
    
    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
           String path = exchange.getRequest().getURI().getPath();
           if(path.contains("/users/login") || path.contains("/users/register")){
            return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build());
            
        }
        HttpHeaders headers = exchange.getRequest().getHeaders();
        if(!headers.containsKey(HttpHeaders.AUTHORIZATION)){
            throw new RuntimeException("Missing Authorization header");
        }
        String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            throw new RuntimeException("Invalid Authorization header");
        }
        String token = authHeader.substring(7);
        try{
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            exchange = exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build();

        } catch (Exception e) {
            throw new RuntimeException("Invalid token");    
        }
        return chain.filter(exchange);
        };
    }

   

    public static class Config {
       public Config() {
        }
    }
    
}
