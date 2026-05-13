import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';
import './App.css';

/**
 * Main Application Component
 * Sets up routing and layout for the entire application
 * 
 * Routes:
 * / - Home page
 * /employees - Employee list page
 * /add-employee - Add new employee page
 * /edit-employee/:id - Edit employee page
 * /employee-details/:id - View employee details
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Employee List */}
            <Route path="/employees" element={<EmployeeList />} />

            {/* Add Employee */}
            <Route path="/add-employee" element={<EmployeeForm isEditMode={false} />} />

            {/* Edit Employee */}
            <Route path="/edit-employee/:id" element={<EmployeeForm isEditMode={true} />} />

            {/* Employee Details */}
            <Route path="/employee-details/:id" element={<EmployeeDetails />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/**
 * 404 Not Found Component
 */
const NotFound = () => (
  <div className="not-found-container">
    <div className="container">
      <div className="text-center py-5">
        <h1 className="display-4">404</h1>
        <p className="lead">Page Not Found</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  </div>
);

export default App;
