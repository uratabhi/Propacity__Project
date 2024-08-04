// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this file and add the CSS from below

const HomePage = () => {
  return (
    <div className="hero-section">
      <div className="content text-center">
        <h1 className="hero-title">Welcome to the File Management System</h1>
        <p className="hero-paragraph">
          Experience seamless file management with our user-friendly interface.
          Whether you need to organize your files or collaborate with others,
          our system offers powerful tools to streamline your workflow.
        </p>
        <p className="hero-paragraph">
          Sign up to get started and enjoy secure and efficient file management
          right at your fingertips. Already have an account? Log in to continue
          where you left off.
        </p>
        <div className="mt-4">
          <Link className="btn btn-primary btn-lg mx-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-success btn-lg mx-2" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
