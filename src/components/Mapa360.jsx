import React from 'react';
import '../styles/Mapa360.css';
import centroMapa from '../assets/centroMapa.png'; // Asegúrate de tener esta imagen en esa ruta

const Mapa = () => {
  return (
    <section className="mapa360-section">
      <h2 className="titulo">Mapa 360° Agentes Intervinientes</h2>
      <div className="hexagono-central">
        <img src={centroMapa} alt="Microproyectos" className="imagen-central" />
        <p className="texto-central">MICROPROYECTOS</p>
      </div>

      <div className="hex-grid">
        <div className="hex alumno">
          <h3>Alumnado</h3>
          <p>Investigación y Creación<br/>Formación y Capacitación<br/>Formación Dual</p>
        </div>

        <div className="hex empresa">
          <h3>Empresa</h3>
          <p>Microproyectos<br/>Necesidades<br/>Implementación</p>
        </div>

        <div className="hex tutores">
          <h3>Tutores</h3>
          <p>Seguimiento y<br/>Acompañamiento<br/>Empresa-Alumno</p>
        </div>

        <div className="hex expertos">
          <h3>Expertos</h3>
          <p>Formación Específica<br/>Masterclass<br/>Orientación Profesional</p>
        </div>

        <div className="hex dinamizadores">
          <h3>Dinamizadores</h3>
          <p>Diseño Proyectos<br/>Selección de Empresas<br/>Seguimiento y Acompañamiento</p>
        </div>

        <div className="hex profesorado">
          <h3>Profesorado</h3>
          <p>Seguimiento<br/>Formación<br/>Capacitación</p>
        </div>
      </div>
    </section>
  );
};

export default Mapa;