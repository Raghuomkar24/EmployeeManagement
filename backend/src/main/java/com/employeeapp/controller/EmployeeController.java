package com.employeeapp.controller;

import com.employeeapp.entity.Employee;
import com.employeeapp.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Employee REST Controller
 * Handles HTTP requests for employee management operations
 * 
 * Base path: /api/employees
 * All endpoints handle CRUD operations for employees
 * 
 * Response Format:
 * - Success: Returns the requested data with appropriate HTTP status code
 * - Error: Returns error message with appropriate HTTP status code
 * 
 * @author Employee Management Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"})
@Slf4j
public class EmployeeController {

    /**
     * Employee service for business logic
     * Injected automatically by Spring
     */
    private final EmployeeService employeeService;

    /**
     * Get all employees
     * 
     * GET /api/employees
     * 
     * @return ResponseEntity with list of all employees and HTTP 200 OK
     */
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        log.info("Received request to get all employees");
        List<Employee> employees = employeeService.getAllEmployees();
        log.debug("Successfully fetched {} employees", employees.size());
        return ResponseEntity.ok(employees);
    }

    /**
     * Get a specific employee by ID
     * 
     * GET /api/employees/{id}
     * 
     * @param id the employee ID
     * @return ResponseEntity with employee data and HTTP 200 OK
     * @throws IllegalArgumentException if employee not found (returns 404)
     */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    /**
     * Search employees by name
     * 
     * GET /api/employees/search?q=searchTerm
     * Searches both first name and last name
     * 
     * @param searchTerm the name to search for
     * @return ResponseEntity with list of matching employees
     */
    @GetMapping("/search/name")
    public ResponseEntity<List<Employee>> searchByName(@RequestParam String searchTerm) {
        List<Employee> employees = employeeService.searchEmployeesByName(searchTerm);
        return ResponseEntity.ok(employees);
    }

    /**
     * Get employees by department
     * 
     * GET /api/employees/department/{department}
     * 
     * @param department the department name
     * @return ResponseEntity with list of employees in that department
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable String department) {
        List<Employee> employees = employeeService.getEmployeesByDepartment(department);
        return ResponseEntity.ok(employees);
    }

    /**
     * Create a new employee
     * 
     * POST /api/employees
     * Request body should contain employee details (firstName, lastName, email, department, salary)
     * 
     * @param employee the employee object to create
     * @return ResponseEntity with created employee and HTTP 201 CREATED
     * @throws IllegalArgumentException if email already exists or validation fails (returns 400)
     */
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    /**
     * Update an existing employee
     * 
     * PUT /api/employees/{id}
     * Request body should contain updated employee details
     * 
     * @param id the ID of the employee to update
     * @param employeeDetails the updated employee details
     * @return ResponseEntity with updated employee and HTTP 200 OK
     * @throws IllegalArgumentException if employee not found or validation fails (returns 400)
     */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Integer id,
            @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    /**
     * Delete an employee
     * 
     * DELETE /api/employees/{id}
     * 
     * @param id the ID of the employee to delete
     * @return ResponseEntity with success message and HTTP 200 OK
     * @throws IllegalArgumentException if employee not found (returns 404)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable Integer id) {
        employeeService.deleteEmployee(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Employee deleted successfully");
        return ResponseEntity.ok(response);
    }

    /**
     * Get total employee count
     * 
     * GET /api/employees/stats/count
     * 
     * @return ResponseEntity with total employee count
     */
    @GetMapping("/stats/count")
    public ResponseEntity<Map<String, Long>> getEmployeeCount() {
        long count = employeeService.getTotalEmployeeCount();
        Map<String, Long> response = new HashMap<>();
        response.put("totalEmployees", count);
        return ResponseEntity.ok(response);
    }

    /**
     * Exception handler for IllegalArgumentException
     * Returns 400 Bad Request with error message
     * 
     * @param ex the exception
     * @return ResponseEntity with error message and HTTP 400 BAD REQUEST
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.warn("Validation failed: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * General exception handler
     * Returns 500 Internal Server Error with error message
     * 
     * @param ex the exception
     * @return ResponseEntity with error message and HTTP 500 INTERNAL SERVER ERROR
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        log.error("An unexpected error occurred during request processing", ex);
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "An error occurred: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
