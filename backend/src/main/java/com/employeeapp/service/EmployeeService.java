package com.employeeapp.service;

import com.employeeapp.entity.Employee;
import com.employeeapp.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

/**
 * Employee Service Class
 * Contains business logic for employee operations
 * 
 * This service class handles:
 * - CRUD operations for employees
 * - Data validation
 * - Transaction management
 * - Business logic implementation
 * 
 * Uses @RequiredArgsConstructor from Lombok to inject dependencies
 * 
 * @author Employee Management Team
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class EmployeeService {

    /**
     * Employee repository for database operations
     * Injected automatically by Spring
     */
    private final EmployeeRepository employeeRepository;

    /**
     * Retrieve all employees from the database
     * 
     * @return List of all employees
     */
    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Retrieve a specific employee by ID
     * 
     * @param id the employee ID to retrieve
     * @return Optional containing the employee if found
     * @throws IllegalArgumentException if employee is not found
     */
    @Transactional(readOnly = true)
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
    }

    /**
     * Search employees by their name (first or last name)
     * 
     * @param searchTerm the name to search for
     * @return List of employees matching the search term
     */
    @Transactional(readOnly = true)
    public List<Employee> searchEmployeesByName(String searchTerm) {
        return employeeRepository.searchByName(searchTerm);
    }

    /**
     * Retrieve employees from a specific department
     * 
     * @param department the department name
     * @return List of employees in the specified department
     */
    @Transactional(readOnly = true)
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    /**
     * Create a new employee record
     * Validates that email doesn't already exist
     * 
     * @param employee the employee object to create
     * @return the created employee with generated ID
     * @throws IllegalArgumentException if email already exists
     */
    public Employee createEmployee(Employee employee) {
        log.info("Attempting to create employee with email: {}", employee.getEmail());
        // Validate email uniqueness
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            log.warn("Failed to create employee: Email {} already exists", employee.getEmail());
            throw new IllegalArgumentException("Email already exists: " + employee.getEmail());
        }

        // Validate required fields
        validateEmployee(employee);

        Employee savedEmployee = employeeRepository.save(employee);
        log.debug("Successfully saved new employee with ID: {}", savedEmployee.getId());
        return savedEmployee;
    }

    /**
     * Update an existing employee record
     * Validates that email is not used by another employee
     * 
     * @param id the ID of the employee to update
     * @param employeeDetails the updated employee details
     * @return the updated employee
     * @throws IllegalArgumentException if employee not found or email conflict
     */
    public Employee updateEmployee(Integer id, Employee employeeDetails) {
        // Find the existing employee
        Employee existingEmployee = getEmployeeById(id);

        // Check if email is being changed and validate uniqueness
        if (!existingEmployee.getEmail().equals(employeeDetails.getEmail())) {
            if (employeeRepository.existsByEmail(employeeDetails.getEmail())) {
                throw new IllegalArgumentException("Email already exists: " + employeeDetails.getEmail());
            }
        }

        // Validate updated details
        validateEmployee(employeeDetails);

        // Update fields
        existingEmployee.setFirstName(employeeDetails.getFirstName());
        existingEmployee.setLastName(employeeDetails.getLastName());
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setDepartment(employeeDetails.getDepartment());
        existingEmployee.setSalary(employeeDetails.getSalary());

        return employeeRepository.save(existingEmployee);
    }

    /**
     * Delete an employee record by ID
     * 
     * @param id the ID of the employee to delete
     * @throws IllegalArgumentException if employee not found
     */
    public void deleteEmployee(Integer id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

    /**
     * Validate employee data
     * Checks for required fields and valid values
     * 
     * @param employee the employee to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateEmployee(Employee employee) {
        // Validate first name
        if (employee.getFirstName() == null || employee.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }

        // Validate last name
        if (employee.getLastName() == null || employee.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }

        // Validate email format
        if (employee.getEmail() == null || employee.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (!employee.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Validate department
        if (employee.getDepartment() == null || employee.getDepartment().trim().isEmpty()) {
            throw new IllegalArgumentException("Department is required");
        }

        // Validate salary
        if (employee.getSalary() == null || employee.getSalary() < 0) {
            throw new IllegalArgumentException("Salary must be a positive number");
        }
    }

    /**
     * Get count of total employees
     * 
     * @return total number of employees
     */
    @Transactional(readOnly = true)
    public long getTotalEmployeeCount() {
        return employeeRepository.count();
    }
}
