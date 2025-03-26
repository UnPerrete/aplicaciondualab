import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import '../styles/NavbarWeb.css';

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollingUp(window.scrollY < lastScrollY);
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <div className={`navbar1 ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="logo">
                <Link to="/" onClick={closeMenu}>
                    <img src={logo} alt="Vía Óptima Dualab" className="logo-img" />
                </Link>
            </div>

            {/* Menú hamburguesa */}
            <div className="menu-icon" onClick={toggleMenu}>
                <i className="bi bi-grid-3x3-gap"></i>
            </div>

            <nav className={`nav-links1 ${menuOpen ? 'active' : ''}`}>
                <Link to="/" onClick={closeMenu}>Inicio</Link>

                <div 
                    className="dropdown"
                    onMouseEnter={() => !menuOpen && setDropdownOpen(true)} 
                    onMouseLeave={() => !menuOpen && setDropdownOpen(false)}
                >
                    <div className="dropdown-toggle" onClick={() => {
                        if (isMobile) {
                            toggleDropdown(); // despliega submenú en móvil
                        } else {
                            setDropdownOpen(true); // comportamiento normal en desktop
                        }
                    }}>
                        <Link to="/servicio" onClick={closeMenu}>Servicios</Link>
                    </div>


                    {(dropdownOpen || menuOpen) && (
                        <div className="dropdown-menu">
                            <Link to="/centrosfp" onClick={closeMenu}>Centros FP</Link>
                            <Link to="/" onClick={closeMenu}>Empresas</Link>
                            <Link to="/administraciones" onClick={closeMenu}>Administraciones</Link>
                        </div>
                    )}
                </div>

                <Link to="/proyect" onClick={closeMenu}>Proyectos</Link>
                <Link to="/formacion" onClick={closeMenu}>Formación</Link>
                <Link to="/recursos" onClick={closeMenu}>Recursos</Link>
                <Link to="/contact" onClick={closeMenu}>Contáctenos</Link>
                <Link to="/equipo" onClick={closeMenu}>Equipo</Link>
            </nav>
        </div>
    );
};

export default NavbarWeb;