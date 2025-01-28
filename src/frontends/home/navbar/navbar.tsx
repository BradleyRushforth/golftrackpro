import React from "react";
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Virtwine
        </a>
        <div className="d-flex">
          <a className="nav-link" href="/plans">
            Plans
          </a>
          <a className="nav-link" href="/about">
            About
          </a>
          <a className="nav-link" href="/contact">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
