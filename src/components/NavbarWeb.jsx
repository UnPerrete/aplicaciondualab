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

                <nav className="nav-links1">
                    <Link to="/">Inicio</Link>
                    <Link to="/servicio" >Retos</Link>
                    <div className="dropdown nav-link-dropdown">
                        <p className="dropdown-toggle-text">Explorar <i
                             className={`bi ${dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-arrow`}
                            onClick={(e) => {
                                e.stopPropagation(); // evita que el clic afecte al Link
                                setDropdownOpen(!dropdownOpen);
                            }}
                        ></i></p>
                        
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/centrosfp">Centros FP</Link>
                                <Link to="/administraciones">Administraciones</Link>
                                <Link to="/proyect">Proyectos</Link>
                                <Link to="/formacion">Formación</Link>
                                <Link to="/recursos">Recursos</Link>
                            </div>
                        )}
                    </div>
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
    );
};

export default NavbarWeb;