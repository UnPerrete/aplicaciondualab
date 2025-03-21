import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"; // Cambia esta ruta según tu estructura
import '../styles/NavbarWeb.css'; // Opcional: archivo CSS separado

const NavbarWeb = () => {
  return (
    <div className="navbar1">
      <div className="logo">
        <img src={logo} alt="Vía Óptima Dualab" className="logo-img" />
        <h1>Vía Óptima Dualab</h1>
      </div>
      <nav className="nav-links1">
        <Link to="/">Inicio</Link>
        <Link to="/">Servicios</Link>
        <Link to="/proyect">Proyectos</Link>
        <Link to="/formacion">Formación</Link>
        <Link to="/">Recursos</Link>
        <Link to="/contact">Contáctenos</Link>
        <Link to="/">Equipo</Link>
      </nav>
    </div>
  );
};

export default NavbarWeb;