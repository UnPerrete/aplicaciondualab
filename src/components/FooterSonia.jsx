import React from 'react';
import '../styles/FooterSonia.css';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/logo.png';

const FooterSonia = () => {
  return (
    <footer className="footerS">
      {/* Franja superior degradada */}
      <div className="footer-topS" />

      {/* Contenido principal del footer */}
      <div className="footer-contentS">
        <div className="footer-columnS logo-address-wrap">
          <div className="logoS">
            <img src={logo} alt="DuaLab Logo" className="logo-imgS" />
          </div>
          <p className="addressS">
            C/Sao Paulo 6, 1º, 35008,<br />
            Las Palmas de G.C.
          </p>
        </div>

        <div className="footer-columnS">
          <ul>
            <li>Retos</li>
            <li>Proyectos</li>
            <li>El Equipo</li>
            <li>Formación</li>
          </ul>
        </div>

        <div className="footer-columnS">
          <ul>
            <li>Empresas</li>
            <li>Centros</li>
            <li>Alumnos</li>
            <li>Recursos</li>
          </ul>
        </div>

        <div className="footer-columnS contactS">
          <h4>Contacto</h4>
          <p>Teléfono: +34 659 02 16 03</p>
          <p>Email: info@viaoptima.es</p>
          <div className="social-iconsS">
            <FaInstagram />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Pie inferior con links legales */}
      <div className="footer-bottomS">
        <p>Aviso Legal</p>
        <p>Política de Privacidad</p>
        <p>Política de Cookies</p>
      </div>
    </footer>
  );
};

export default FooterSonia;
