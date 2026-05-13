package com.employeeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import lombok.extern.slf4j.Slf4j;

/**
 * Main Spring Boot Application Class
 * Entry point for the Employee Management API
 * 
 * Features:
 * - Auto-configuration of Spring components
 * - CORS configuration for React frontend communication
 * - JPA auto-configuration for database operations
 * 
 * @author Employee Management Team
 * @version 1.0.0
 */
@SpringBootApplication
@Slf4j
public class EmployeeManagementApplication {

    /**
     * Main method to start the Spring Boot application
     * 
     * @param args command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);

        log.info("======================================");
        log.info("Employee Management API Started");
        log.info("Server: http://localhost:8081");
        log.info("API Base URL: http://localhost:8081/api");
        log.info("======================================");

        log.debug("Debug log: Application startup process completed.");
        log.warn("Warning log: Please ensure production profiles are used in production.");
        log.error("Error log: This is an example of an error level log.");
    }

    /**
     * Configure CORS (Cross-Origin Resource Sharing)
     * This allows the React frontend running on localhost:3000 to communicate with
     * the backend
     * 
     * @return WebMvcConfigurer with CORS configuration
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/employees/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
