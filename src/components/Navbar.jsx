import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-custom shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
          <img src={logoLight} alt="Logo" width="50" height="50" className="me-4" />
          <span>Photo Album Manager</span>
        </Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link active fw-semibold" to="/">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
