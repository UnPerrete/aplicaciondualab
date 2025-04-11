import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/dualabIcon.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/NavbarWeb.css';
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from 'react-i18next';
import i18n from './ui/I18n';

const NavbarWeb = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paisDropdownOpen, setPaisDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollingUp(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      setPaisDropdownOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className={`navbar-container ${scrollingUp ? 'navbar-visible' : 'navbar-hidden'}`}>
          <div className="navbar-top">
            <div className="navbar-top-contact">
              <span><i className="bi bi-telephone-fill"></i> +34 659 02 16 03</span>
            </div>
            <div className="navbar-top-social">
              <span className="email">info@dualab.es</span>
            </div>
            <div className="navbar-top-access">
              <Link to="/perfil">
                <i className="bi bi-person-circle"></i> {user?.nombre || user?.nombrecomercial || t('acceder')}
              </Link>
            </div>
          </div>

          <div className="navbar-bottom">
            <div className="logo">
              <Link to="/"><img src={logo} alt="Dualab" className="logo-img" /></Link>
            </div>

            <nav className={`nav-links1 ${mobileMenuOpen ? 'open' : ''}`}>
              <Link to="/">{t('inicio')}</Link>
              <Link to="/servicio">{t('retos')}</Link>

              <div className="dropdown nav-link-dropdown">
                <p className="dropdown-toggle-text">
                  {t('explorar')} <i
                    className={`bi ${dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-arrow`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  ></i>
                </p>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/centrosfp">{t('centrosfp')}</Link>
                    <Link to="/administraciones">{t('administraciones')}</Link>
                    <Link to="/proyect">{t('proyectos')}</Link>
                    <Link to="/formacion">{t('formacion')}</Link>
                    <Link to="/recursos">{t('recursos')}</Link>
                    <Link to="/empresa">{t('empresas')}</Link>
                  </div>
                )}
              </div>

              <Link to="/equipo">{t('equipo')}</Link>
              <Link to="/contact">{t('contacto')}</Link>

              {/* Dropdown para selector de idioma */}
              <div className="dropdown nav-link-dropdown">
                <p className="dropdown-toggle-text" onClick={(e) => {
                  e.stopPropagation();
                  setPaisDropdownOpen(!paisDropdownOpen);
                }}>
                  <i className="bi bi-geo-alt" style={{ marginRight: '6px' }}></i> {i18n.language.toUpperCase()}
                  <i className={`bi ${paisDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-arrow`}></i>
                </p>

                {paisDropdownOpen && (
                  <div className="dropdown-menuB">
                    <span onClick={() => i18n.changeLanguage('es')}>ES {t('español')}</span>
                    <span onClick={() => i18n.changeLanguage('en')}>EN {t('ingles')}</span>
                  </div>
                )}
              </div>
            </nav>

            <div className="nav-icons-inline">
              <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <i className="bi bi-list"></i>
              </button>
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
        <div className="navbar-spacer"></div>
    </>
  );
};

export default NavbarWeb;
