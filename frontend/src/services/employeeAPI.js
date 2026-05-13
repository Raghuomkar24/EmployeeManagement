import axios from 'axios';

/**
 * API Service
 * Centralized API communication with the backend
 * 
 * Configuration:
 * - Base URL: http://localhost:8080/api
 * - Timeout: 5000ms
 * - Default headers: Content-Type: application/json
 */

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor
 * Add any auth tokens or custom headers before each request
 */
axiosInstance.interceptors.request.use(
  config => {
    // You can add JWT token or other auth headers here
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle common response scenarios
 */
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response from server:', error.request);
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Employee API Service
 */
const employeeAPI = {
  /**
   * Get all employees
   * @returns {Promise} Array of employees
   */
  getAllEmployees: () => {
    return axiosInstance.get('/employees');
  },

  /**
   * Get employee by ID
   * @param {number} id - Employee ID
   * @returns {Promise} Employee object
   */
  getEmployeeById: (id) => {
    return axiosInstance.get(`/employees/${id}`);
  },

  /**
   * Search employees by name
   * @param {string} searchTerm - Name to search
   * @returns {Promise} Array of matching employees
   */
  searchEmployees: (searchTerm) => {
    return axiosInstance.get(`/employees/search/name?searchTerm=${searchTerm}`);
  },

  /**
   * Get employees by department
   * @param {string} department - Department name
   * @returns {Promise} Array of employees in that department
   */
  getEmployeesByDepartment: (department) => {
    return axiosInstance.get(`/employees/department/${department}`);
  },

  /**
   * Create new employee
   * @param {Object} employeeData - Employee object with firstName, lastName, email, department, salary
   * @returns {Promise} Created employee object
   */
  createEmployee: (employeeData) => {
    return axiosInstance.post('/employees', employeeData);
  },

  /**
   * Update employee
   * @param {number} id - Employee ID
   * @param {Object} employeeData - Updated employee data
   * @returns {Promise} Updated employee object
   */
  updateEmployee: (id, employeeData) => {
    return axiosInstance.put(`/employees/${id}`, employeeData);
  },

  /**
   * Delete employee
   * @param {number} id - Employee ID
   * @returns {Promise} Success message
   */
  deleteEmployee: (id) => {
    return axiosInstance.delete(`/employees/${id}`);
  },

  /**
   * Get total employee count
   * @returns {Promise} Total count of employees
   */
  getEmployeeCount: () => {
    return axiosInstance.get('/employees/stats/count');
  }
};

export default employeeAPI;
