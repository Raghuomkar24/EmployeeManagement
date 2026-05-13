import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeAPI from '../services/employeeAPI';
import '../styles/EmployeeList.css';

/**
 * Employee List Component
 * Displays all employees in a table format
 * Features: View, Edit, Delete, Search
 */
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees based on search term
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees. Please try again later.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await employeeAPI.deleteEmployee(id);
        setSuccessMessage(`${name} has been deleted successfully!`);
        fetchEmployees();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
        console.error('Error deleting employee:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="employee-list-container">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="container">
        <div className="list-header">
          <h1>Employee Directory</h1>
          <Link to="/add-employee" className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Add New Employee
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage('')}
            ></button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Employees Count */}
        <div className="employees-count">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>

        {/* No Employees Message */}
        {filteredEmployees.length === 0 ? (
          <div className="no-data">
            <i className="bi bi-inbox"></i>
            <p>
              {searchTerm ? 'No employees found matching your search.' : 'No employees found. Create one to get started!'}
            </p>
            {!searchTerm && (
              <Link to="/add-employee" className="btn btn-primary">
                Add First Employee
              </Link>
            )}
          </div>
        ) : (
          /* Employees Table */
          <div className="table-responsive">
            <table className="table table-hover employees-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <span className="badge bg-primary">{employee.id}</span>
                    </td>
                    <td className="fw-bold">{employee.firstName} {employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <span className="badge bg-info text-dark">{employee.department}</span>
                    </td>
                    <td className="fw-bold text-success">
                      ₹ {employee.salary.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/employee-details/${employee.id}`}
                          className="btn btn-sm btn-info"
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link
                          to={`/edit-employee/${employee.id}`}
                          className="btn btn-sm btn-warning"
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteEmployee(employee.id, `${employee.firstName} ${employee.lastName}`)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
