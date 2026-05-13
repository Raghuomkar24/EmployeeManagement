import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

/**
 * Navbar Component
 * Navigation bar for the application
 * Links to different pages: Home, Employee List, Add Employee
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-people"></i> Employee Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employees">
                All Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary text-white ms-2" to="/add-employee">
                + Add Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
