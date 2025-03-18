// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useAuth } from '../context/AuthProvider';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Empresas</Link></li>
        <li><Link to="/servicio">Servicios</Link></li>
      </ul>
      <ul className="navbar-nav ms-auto">
        <li><Link to="/perfil"><FaUser size={22}/></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
