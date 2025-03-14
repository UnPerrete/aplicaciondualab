// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Empresas</Link></li>
        <li><Link to="/servicio">Servicios</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <button onClick={() => logout()}>Log Out</button>

      </ul>
    </nav>
  );
}

export default Navbar;
