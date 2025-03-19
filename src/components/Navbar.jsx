// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useAuth } from '../context/AuthProvider';
import '../styles/Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={scrolled ? "navbar active-scroll" : "navbar"}>
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
