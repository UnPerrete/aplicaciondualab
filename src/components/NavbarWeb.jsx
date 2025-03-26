import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/NavbarWeb.css';

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrollingUp(window.scrollY < lastScrollY)
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <div className={`navbar1 ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="logo">
                <Link to="/"><img src={logo} alt="Vía Óptima Dualab" className="logo-img" /></Link>
            </div>
            <nav className="nav-links1">
                <Link to="/">Inicio</Link>
                <div 
                    className="dropdown"
                    onMouseEnter={toggleDropdown} 
                    onMouseLeave={toggleDropdown}
                >
                    <Link to="/servicio"><span className="dropdown-toggle">Retos</span></Link>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/centrosfp">Centros FP</Link>
                            <Link to="/">Empresas</Link>
                            <Link to="/administraciones">Administraciones</Link>
                        </div>
                    )}
                </div>
                <Link to="/proyect">Proyectos</Link>
                <Link to="/formacion">Formación</Link>
                <Link to="/recursos">Recursos</Link>
                <Link to="/contact">Contáctenos</Link>
                <Link to="/equipo">Equipo</Link>
                <Link to="/perfil"><i className="bi bi-person-fill"></i></Link>
                <i className="bi bi-search" onClick={toggleSearch}></i>
            </nav>

            {searchOpen && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Busca en este sitio web"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default NavbarWeb;