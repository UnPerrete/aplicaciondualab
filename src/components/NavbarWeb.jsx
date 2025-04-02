import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/NavbarWeb.css';
import { useAuth } from "../context/AuthProvider";

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrollingUp(window.scrollY < lastScrollY)
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <div className={`navbar1 ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="logo">
                <Link to="/"><img src={logo} alt="Vía Óptima Dualab" className="logo-img" /></Link>
            </div>

            {/* Ícono del menú responsive */}
            <div className="menu-icon" onClick={toggleMenu}>
                <i className="bi bi-grid"></i>
            </div>

            <div className="nav-wrapper">
            <nav className={`nav-links1 ${menuOpen ? 'active' : ''}`}>
                <Link to="/">Inicio</Link>
                <li
                    className="dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <Link to="/servicio" className="dropdown-toggle">Retos</Link>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/centrosfp" onClick={closeMenu}>Centros FP</Link>
                            <Link to="/" onClick={closeMenu}>Empresas</Link>
                            <Link to="/administraciones" onClick={closeMenu}>Administraciones</Link>
                        </div>
                    )}
                </li>
                <Link to="/proyect">Proyectos</Link>
                <Link to="/formacion">Formación</Link>
                <Link to="/recursos">Recursos</Link>
                <Link to="/contact">Contáctenos</Link>
                <Link to="/equipo">Equipo</Link>
                <span className="nav-icons-inline">
                    <Link to="/perfil"><i className="bi bi-person-fill"></i></Link>
                    <i className="bi bi-search" onClick={toggleSearch}></i>
                    {searchOpen && (
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}
                </span>
            </nav>
            </div>
        </div>
    );
};

export default NavbarWeb;