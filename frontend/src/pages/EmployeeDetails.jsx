import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import employeeAPI from '../services/employeeAPI';
import '../styles/EmployeeDetails.css';

/**
 * Employee Details Component
 * Displays complete information of a single employee
 * Features: View details, Edit, Delete, Back to list
 */
const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getEmployeeById(id);
      setEmployee(response.data);
    } catch (err) {
      setError('Failed to load employee details. Please try again.');
      console.error('Error fetching employee:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      try {
        await employeeAPI.deleteEmployee(id);
        navigate('/employees');
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
        console.error('Error deleting employee:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="employee-details-container">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employee-details-container">
        <div className="container">
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
            ></button>
          </div>
          <Link to="/employees" className="btn btn-primary">
            Back to Employee List
          </Link>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="employee-details-container">
        <div className="container">
          <div className="alert alert-warning">
            Employee not found
          </div>
          <Link to="/employees" className="btn btn-primary">
            Back to Employee List
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="employee-details-container">
      <div className="container">
        <Link to="/employees" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Employees
        </Link>

        <div className="details-card">
          <div className="details-header">
            <div className="employee-avatar">
              {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
            </div>
            <div className="employee-header-info">
              <h1 className="employee-name">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="employee-email">{employee.email}</p>
            </div>
          </div>

          <div className="details-body">
            <div className="details-grid">
              <div className="detail-item">
                <label className="detail-label">Employee ID</label>
                <div className="detail-value">
                  <span className="badge bg-primary">{employee.id}</span>
                </div>
              </div>

              <div className="detail-item">
                <label className="detail-label">First Name</label>
                <div className="detail-value">{employee.firstName}</div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Last Name</label>
                <div className="detail-value">{employee.lastName}</div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Email</label>
                <div className="detail-value">
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Department</label>
                <div className="detail-value">
                  <span className="badge bg-info text-dark">{employee.department}</span>
                </div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Salary</label>
                <div className="detail-value salary-value">
                  ₹ {employee.salary.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Created At</label>
                <div className="detail-value">{formatDate(employee.createdAt)}</div>
              </div>

              <div className="detail-item">
                <label className="detail-label">Last Updated</label>
                <div className="detail-value">{formatDate(employee.updatedAt)}</div>
              </div>
            </div>
          </div>

          <div className="details-footer">
            <Link to={`/edit-employee/${employee.id}`} className="btn btn-warning btn-lg">
              <i className="bi bi-pencil"></i> Edit Employee
            </Link>
            <button
              onClick={handleDeleteEmployee}
              className="btn btn-danger btn-lg"
            >
              <i className="bi bi-trash"></i> Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
