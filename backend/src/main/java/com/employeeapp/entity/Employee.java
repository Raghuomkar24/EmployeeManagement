package com.employeeapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Employee Entity Class
 * Represents an employee record in the database
 * 
 * This class uses Lombok annotations to automatically generate:
 * - Getters and Setters (@Data)
 * - Constructor with all arguments (@AllArgsConstructor)
 * - Constructor with no arguments (@NoArgsConstructor)
 * - toString(), equals(), and hashCode() methods
 * 
 * @author Employee Management Team
 * @version 1.0.0
 */
@Entity
@Table(name = "employee", indexes = {
    @Index(name = "idx_email", columnList = "email"),
    @Index(name = "idx_department", columnList = "department")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    /**
     * Unique identifier for the employee
     * Auto-generated using AUTO_INCREMENT
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * First name of the employee
     * Not null field
     */
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    /**
     * Last name of the employee
     * Not null field
     */
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    /**
     * Email address of the employee
     * Unique constraint - no two employees can have the same email
     */
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    /**
     * Department of the employee
     * Not null field
     */
    @Column(name = "department", nullable = false, length = 100)
    private String department;

    /**
     * Salary of the employee
     * Decimal value with 2 decimal places
     * Must be >= 0
     */
    @Column(name = "salary", nullable = false)
    private Double salary;

    /**
     * Timestamp when the record was created
     * Automatically set by the database
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp when the record was last updated
     * Automatically updated by the database
     */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Set creation timestamp before saving to database
     * Called automatically by JPA before insert
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Update timestamp before updating record
     * Called automatically by JPA before update
     */
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Get full name of the employee
     * 
     * @return combined first name and last name
     */
    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
