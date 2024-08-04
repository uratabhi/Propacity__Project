import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <Link className="navbar-brand ms-5" to="/dashboard">
        File Management System
      </Link>
      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2">
          <Link className="btn btn-primary btn-sm" to="/dashboard">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
