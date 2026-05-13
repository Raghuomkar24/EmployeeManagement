package com.employeeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);

        System.out.println("======================================");
        System.out.println("Employee Management API Started");
        System.out.println("Server: http://localhost:8081");
        System.out.println("API Base URL: http://localhost:8081/api");
        System.out.println("======================================");
    }
}