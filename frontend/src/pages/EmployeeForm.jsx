import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeAPI from '../services/employeeAPI';
import '../styles/EmployeeForm.css';

/**
 * Employee Form Component
 * Used for both creating and editing employees
 * Features: Form validation, error handling, auto-fill for edit mode
 */
const EmployeeForm = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const departments = ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'Legal', 'Other'];

  useEffect(() => {
    if (isEditMode && id) {
      fetchEmployee();
    }
  }, [isEditMode, id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getEmployeeById(id);
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        department: response.data.department,
        salary: response.data.salary
      });
    } catch (error) {
      setSubmitError('Failed to load employee data');
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Department Validation
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    // Salary Validation
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) < 0) {
      newErrors.salary = 'Salary must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      if (isEditMode) {
        await employeeAPI.updateEmployee(id, formData);
        setSubmitSuccess('Employee updated successfully!');
        setTimeout(() => {
          navigate(`/employee-details/${id}`);
        }, 1500);
      } else {
        await employeeAPI.createEmployee(formData);
        setSubmitSuccess('Employee created successfully!');
        setTimeout(() => {
          navigate('/employees');
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred while saving the employee';
      setSubmitError(errorMessage);
      console.error('Error saving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(isEditMode ? `/employee-details/${id}` : '/employees');
  };

  if (loading && isEditMode) {
    return (
      <div className="employee-form-container">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-form-container">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h1>

          {submitError && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {submitError}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSubmitError('')}
              ></button>
            </div>
          )}

          {submitSuccess && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {submitSuccess}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSubmitSuccess('')}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <div className="invalid-feedback d-block">{errors.firstName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <div className="invalid-feedback d-block">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="department" className="form-label">
                  Department <span className="required">*</span>
                </label>
                <select
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback d-block">{errors.department}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="salary" className="form-label">
                  Salary <span className="required">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.salary && (
                  <div className="invalid-feedback d-block">{errors.salary}</div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditMode ? 'Update Employee' : 'Create Employee'}
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
