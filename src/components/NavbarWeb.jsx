import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Cambia esta ruta según tu estructura
import '../styles/NavbarWeb.css';

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="navbar1">
            <div className="logo">
                <img src={logo} alt="Vía Óptima Dualab" className="logo-img" />
                <h1>Vía Óptima Dualab</h1>
            </div>
            <nav className="nav-links1">
                <Link to="/">Inicio</Link>
                <div 
                    className="dropdown"
                    onMouseEnter={toggleDropdown} 
                    onMouseLeave={toggleDropdown}
                >
                    <span className="dropdown-toggle">Servicios</span>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/centrosfp">• Centros FP</Link>
                            <Link to="/empresas">• Empresas</Link>
                            <Link to="/administraciones">• Administraciones</Link>
                        </div>
                    )}
                </div>
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