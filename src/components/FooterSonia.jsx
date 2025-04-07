import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FooterSonia.css';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/logo.png';

const FooterSonia = () => {
  return (
    <footer className="footerS">
      <div className="footer-topS" />

      <div className="footer-contentS">
        <div className="footer-columnS logo-address-wrap">
          <div className="logoS">
            <Link to="/"><img src={logo} alt="DuaLab Logo" className="logo-imgS" /></Link>
          </div>
          <p className="addressS">
            C/Sao Paulo 6, 1º, 35008,<br />
            Las Palmas de G.C.
          </p>
        </div>

        <div className="footer-columnS">
          <ul>
            <li><Link to="/servicio" className="footer-linkS">Retos</Link></li>
            <li><Link to="/proyect" className="footer-linkS">Proyectos</Link></li>
            <li><Link to="/equipo" className="footer-linkS">El Equipo</Link></li>
            <li><Link to="/formacion" className="footer-linkS">Formación</Link></li>
          </ul>
        </div>

        <div className="footer-columnS">
          <ul>
            <li><Link to="/" className="footer-linkS">Empresas</Link></li>
            <li><Link to="/centrosfp" className="footer-linkS">Centros</Link></li>
            <li><Link to="/info-proyecto/0" className="footer-linkS">Alumnos</Link></li>
            <li><Link to="/recursos" className="footer-linkS">Recursos</Link></li>
          </ul>
        </div>

        <div className="footer-columnS ">
          <h4><Link to="/contact" className="footer-linkS">Contacto</Link></h4>
          <p>Teléfono: +34 659 02 16 03</p>
          <p>Email: info@viaoptima.es</p>
        </div>

        <div className="footer-columnS redesS">
          <div className="social-iconsS">
            <FaInstagram />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className="footer-bottomS">
        <p><Link to="/aviso-legal" className="footer-linkS">Aviso Legal</Link></p>
        <p><Link to="/privacidad" className="footer-linkS">Política de Privacidad</Link></p>
        <p><Link to="/cookies" className="footer-linkS">Política de Cookies</Link></p>
      </div>
    </footer>
  );
};

export default FooterSonia;
