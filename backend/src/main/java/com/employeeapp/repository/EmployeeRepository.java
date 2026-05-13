package com.employeeapp.repository;

import com.employeeapp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Employee Repository Interface
 * Extends JpaRepository to provide CRUD operations and custom queries
 * 
 * Spring Data JPA will automatically implement this interface and provide:
 * - Basic CRUD operations (save, findById, findAll, delete, etc.)
 * - Pagination and sorting support
 * - Custom query methods (defined below)
 * 
 * @author Employee Management Team
 * @version 1.0.0
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    /**
     * Find an employee by email address
     * Email is unique, so this will return at most one employee
     * 
     * @param email the email address to search for
     * @return Optional containing the employee if found, empty otherwise
     */
    Optional<Employee> findByEmail(String email);

    /**
     * Find all employees in a specific department
     * 
     * @param department the department name to search for
     * @return List of employees in the specified department
     */
    List<Employee> findByDepartment(String department);

    /**
     * Find employees with salary greater than or equal to specified amount
     * 
     * @param salary the minimum salary amount
     * @return List of employees with salary >= specified amount
     */
    List<Employee> findBySalaryGreaterThanEqual(Double salary);

    /**
     * Find employees by first name or last name (case-insensitive)
     * Uses JPQL query for more complex search logic
     * 
     * @param firstName the first name to search for
     * @param lastName the last name to search for
     * @return List of employees matching the first or last name
     */
    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Employee> searchByName(@Param("searchTerm") String searchTerm);

    /**
     * Check if an email already exists
     * Useful for validation before creating or updating an employee
     * 
     * @param email the email to check
     * @return true if email exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Check if an email exists and does not belong to a specific employee ID
     * Used when updating an employee to allow keeping the same email
     * 
     * @param email the email to check
     * @param id the employee ID to exclude from the check
     * @return true if email exists for another employee, false otherwise
     */
    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Employee e WHERE e.email = :email AND e.id != :id")
    boolean existsByEmailAndIdNot(@Param("email") String email, @Param("id") Integer id);
}
