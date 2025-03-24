import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Cambia esta ruta según tu estructura
import '../styles/NavbarWeb.css';

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY < lastScrollY) {
            setScrollingUp(true); // Si se está desplazando hacia arriba
          } else {
            setScrollingUp(false); // Si se está desplazando hacia abajo
          }
          setLastScrollY(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [lastScrollY]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className={`navbar1 ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="logo">
                <Link to="/"><img src={logo} alt="Vía Óptima Dualab" className="logo-img" /></Link>

            </div>
            <nav className="nav-links1">
                <Link to="/">Inicio</Link>
                <Link to="/servicio">Servicios</Link>
                <Link to="/proyect">Proyectos</Link>
                <Link to="/formacion">Formación</Link>
                <Link to="/">Recursos</Link>
                <Link to="/contact">Contáctenos</Link>
                <Link to="/equipo">Equipo</Link>
                <div 
                    className="dropdown"
                    onMouseEnter={toggleDropdown} 
                    onMouseLeave={toggleDropdown}
                >
                    <span className="dropdown-toggle">Servicios</span>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/centrosfp">• Centros FP</Link>
                            <Link to="/">• Empresas</Link>
                            <Link to="/administraciones">• Administraciones</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavbarWeb;