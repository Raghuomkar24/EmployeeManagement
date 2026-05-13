import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeAPI from '../services/employeeAPI';
import '../styles/Home.css';

/**
 * Home Page Component
 * Displays welcome message and quick statistics
 */
const Home = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  const fetchEmployeeCount = async () => {
    try {
      const response = await employeeAPI.getEmployeeCount();
      setTotalEmployees(response.data.totalEmployees);
    } catch (error) {
      console.error('Error fetching employee count:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="hero-title">Welcome to Employee Management</h1>
              <p className="hero-subtitle">
                Manage your organization's employees with ease. Create, update, delete, and manage employee information.
              </p>
              <div className="hero-buttons">
                <Link to="/employees" className="btn btn-primary btn-lg">
                  View All Employees
                </Link>
                <Link to="/add-employee" className="btn btn-success btn-lg ms-2">
                  Add New Employee
                </Link>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="stats-card">
                <div className="stat-number">
                  {loading ? <span className="spinner-border spinner-border-sm"></span> : totalEmployees}
                </div>
                <div className="stat-label">Total Employees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-list"></i>
                </div>
                <h5>View Employees</h5>
                <p>Browse all employees with detailed information including name, email, department, and salary.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-plus-circle"></i>
                </div>
                <h5>Add Employees</h5>
                <p>Create new employee records with all necessary information. Form validation ensures data quality.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-pencil-square"></i>
                </div>
                <h5>Edit Employees</h5>
                <p>Update employee information and keep records current with real-time validation.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-trash"></i>
                </div>
                <h5>Delete Employees</h5>
                <p>Remove employee records with confirmation to prevent accidental data loss.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-start-section">
        <div className="container">
          <h2 className="section-title">Quick Start</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="step-card">
                <div className="step-number">1</div>
                <h5>Go to Employees</h5>
                <p>Click on "All Employees" to view the complete employee list with details.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="step-card">
                <div className="step-number">2</div>
                <h5>Add or Edit</h5>
                <p>Use the "Add Employee" button or click edit on any employee to manage records.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="step-card">
                <div className="step-number">3</div>
                <h5>Manage</h5>
                <p>View details, update information, or delete records using the action buttons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
