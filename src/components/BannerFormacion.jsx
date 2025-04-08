import React from 'react';
import '../styles/BannerFormacion.css';
import backgroundImage from '../assets/logos/Formacion.png'; // Asegúrate que la imagen esté en esa ruta

const BannerFormacion = () => {
  return (
    <div className="banner-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Overlays geométricos */}
      <div className="overlay-left"></div>
      <div className="overlay-right"></div>

      {/* Contenido de texto */}
      <div className="text-content">
        <div className="top-text">
          Formación Dual aplicada a <br /> microproyectos y empresas
        </div>
        <div className="bottom-text">
          Conectando Alumnos,<br />
          Centros, Empresas y Expertos
        </div>
      </div>
    </div>
  );
};

export default BannerFormacion;
