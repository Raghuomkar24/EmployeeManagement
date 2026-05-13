-- Employee Management Database Schema
-- This script creates the database and employee table

-- Create database
CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

-- Drop existing table if it exists
DROP TABLE IF EXISTS employee;

-- Create Employee table
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the employee',
    first_name VARCHAR(100) NOT NULL COMMENT 'First name of the employee',
    last_name VARCHAR(100) NOT NULL COMMENT 'Last name of the employee',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'Email address of the employee',
    department VARCHAR(100) NOT NULL COMMENT 'Department of the employee',
    salary DECIMAL(10, 2) NOT NULL COMMENT 'Salary of the employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record update timestamp',
    CONSTRAINT salary_check CHECK (salary >= 0),
    INDEX idx_email (email),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Employee information table';

-- Insert sample data
INSERT INTO employee (first_name, last_name, email, department, salary) VALUES
('John', 'Doe', 'john.doe@example.com', 'IT', 75000.00),
('Jane', 'Smith', 'jane.smith@example.com', 'HR', 65000.00),
('Michael', 'Johnson', 'michael.johnson@example.com', 'Finance', 70000.00),
('Sarah', 'Williams', 'sarah.williams@example.com', 'IT', 72000.00),
('Robert', 'Brown', 'robert.brown@example.com', 'Sales', 60000.00),
('Emily', 'Davis', 'emily.davis@example.com', 'Marketing', 62000.00);

-- Show the table structure
DESCRIBE employee;

-- Display the data
SELECT * FROM employee;
