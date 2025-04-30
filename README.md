spring.application.name=API-GATEWAY
server.port=8089

spring.cloud.gateway.routes[0].id=Authservice
spring.cloud.gateway.routes[0].uri=lb://Authservice
spring.cloud.gateway.routes[0].predicates[0]=Path= /auth/**

spring.cloud.gateway.routes[1].id=Room-Service
spring.cloud.gateway.routes[1].uri=lb://Room-Service
spring.cloud.gateway.routes[1].predicates[0]=Path= /room/**

spring.cloud.gateway.routes[2].id=Booking-Service
spring.cloud.gateway.routes[2].uri=lb://Booking-Service
spring.cloud.gateway.routes[2].predicates[0]=Path= /booking/**, /guest/**

spring.cloud.gateway.routes[3].id=Staff-service
spring.cloud.gateway.routes[3].uri=lb://Staff-service
spring.cloud.gateway.routes[3].predicates[0]=Path= /staff/**
spring.cloud.gateway.discovery.locator.enabled=true
package com.example.ApiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
}package com.example.ApiGateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final String SECRET ="mysecretkeylfkjgdflkgjdlfgjdlfgjdlfgjdlfgjldfgjldfgjldfgjldfgjdlfjldlfflflflfflflflsliroer";


    public Claims validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println("JWT validated successfully. Claims: " + claims);
            return claims;
        } catch (Exception e) {
            System.err.println("JWT validation failed: " + e.getMessage());
            throw new RuntimeException("Invalid token: " + e.getMessage(), e);
        }
    }
}package com.example.ApiGateway.security;

import com.example.ApiGateway.filter.AuthFilter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
//import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository.
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.function.Function;

@Configuration
@EnableWebFluxSecurity
public class JwtConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        AuthenticationWebFilter jwtAuthFilter=new AuthenticationWebFilter(authenticationManager());
        jwtAuthFilter.setAuthenticationConverter(authenticationConverter());
        return http
                .csrf().disable() // Disable CSRF for API gateway
                .authorizeExchange()
                .pathMatchers("/auth/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/room/**").hasAuthority("RECEPTION")
                .pathMatchers("/room/**").hasAuthority("ADMIN")
                .pathMatchers(HttpMethod.GET, "/booking/**", "/guest/**").hasAuthority("RECEPTION")
                .pathMatchers("/booking/**", "/guest/**").hasAuthority("ADMIN")
                .anyExchange().authenticated()
                .and()
                .authenticationManager(authenticationManager())
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .addFilterAt(jwtAuthFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .build();
    }

    @Bean
    public ReactiveAuthenticationManager authenticationManager() {
        return authentication -> {
            String token = authentication.getCredentials().toString();
            try {
                Claims claims = jwtUtil.validateToken(token);
                String role = claims.get("role", String.class);
                System.out.println("Authenticated user: " + claims.getSubject() + ", Role: " + role);
                return Mono.just(new UsernamePasswordAuthenticationToken(
                        claims.getSubject(),
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(role))
                ));
            } catch (Exception e) {
                System.err.println("Authentication failed: " + e.getMessage());
                return Mono.error(e);
            }
        };
    }

    @Bean
    public Function<ServerWebExchange, Mono<Authentication>> authenticationConverter() {
        return exchange -> {
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                System.out.println("Extracted JWT token: " + token);
                return Mono.just(new UsernamePasswordAuthenticationToken(token, token));
            }
            System.out.println("No valid Authorization header found");
            return Mono.empty();
        };
    }

    @Bean
    public WebFilter authFilter() {
        return new AuthFilter();
    }
}package com.example.ApiGateway.filter;

import com.example.ApiGateway.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

public class AuthFilter implements WebFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();
        System.out.println("Request Path: " + path);
        System.out.println("Request Method: " + method);
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        System.out.println("Authorization Header: " + authHeader);

        return ReactiveSecurityContextHolder.getContext()
                .map(context -> context.getAuthentication())
                .flatMap(auth -> {
                    System.out.println("Authenticated User: " + auth.getName() + ", Authorities: " + auth.getAuthorities());
                    return chain.filter(exchange);
                })
                .switchIfEmpty(chain.filter(exchange)); // Proceed if no authentication
    }
}
