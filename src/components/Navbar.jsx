// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Empresas</Link></li>
        <li><Link to="/servicio">Servicios</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
