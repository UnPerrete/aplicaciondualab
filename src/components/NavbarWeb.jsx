import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/NavbarWeb.css';
import { useAuth } from "../context/AuthProvider";

const NavbarWeb = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrollingUp, setScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrollingUp(window.scrollY < lastScrollY)
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`navbar-container ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="navbar-inner-wrap">
                <div className="navbar-top">
                    <div className="navbar-top-contact">
                        <span><i className="bi bi-telephone-fill"></i> +34 659 02 16 03</span>
                    </div>
                    <div className='navbar-top-social'>
                        <span className="email">info@dualab.es</span>
                    </div>
                    <div className="navbar-top-access">
                        <Link to="/perfil">
                            <i className="bi bi-person-circle"></i> {user?.nombre || user?.nombrecomercial || "Acceder"}
                        </Link>
                    </div>
                </div>

                <div className="navbar-bottom">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="Dualab" className="logo-img" /></Link>
                    </div>

                    <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className="bi bi-list"></i>
                    </button>

                    <nav className={`nav-links1 ${mobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/">Inicio</Link>
                        <div className="dropdown nav-link-dropdown">
                            <Link to="/servicio" className="dropdown-toggle-text">Retos</Link>
                            <i
                                className={`bi ${dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-arrow`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownOpen(!dropdownOpen);
                                }}
                            ></i>
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
                        <Link to="/equipo">El Equipo</Link>
                        <Link to="/contact">Contacto</Link>
                        <span className="pais-selector">🇪🇸 España</span>
                    </nav>

                    <div className="nav-icons-inline">
                        <div className="search-bar">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery === "" && <i className="bi bi-search search-placeholder-icon"></i>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarWeb;
