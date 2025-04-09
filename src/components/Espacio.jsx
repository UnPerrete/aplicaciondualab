import React from 'react';
import '../styles/Espacio.css';
import digi from '../assets/CentrosFP.png';
import sos from '../assets/Alum.png';
import soft from '../assets/Empresas.png';

const Espacio = () => {
  return (
    <section className="espacio-section">
      <div className="espacio-header">
        <h2>Un espacio común para todos</h2>
        <p>
          DuaLab es un ecosistema educativo-tecnológico que nace para transformas la manera
          en que diseñamos, gestionamos y compratimos la Formación Dual en las empresas.
        </p>
      </div>
      <div className="espacio-columns">

        <div className="espacio-item">
          <div className="espacio-icon-wrapper">
            <img
              src={digi}
              alt="Icono Digitalización"
              className="espacio-icon"
            />
          </div>
          <div className="espacio-block digital hexagon">
            <h3>Centros FP</h3>
            <p>Asesoramiento y Experiencias de Aprendizaje</p>
          </div>
          <button className="espacio-button">Soy un centro</button>
        </div>

        <div className="espacio-item">
          <div className="espacio-icon-wrapper">
            <img
              src={sos}
              alt="Icono Sostenibilidad"
              className="espacio-icon"
            />
          </div>
          <div className="espacio-block sostenibilidad hexagon">
            <h3>Alumnos</h3>
            <p>Innovación, Integración y Orientación Laboral</p>
          </div>
          <button className="espacio-button">Soy un alumno</button>
        </div>

        <div className="espacio-item">
          <div className="espacio-icon-wrapper">
            <img
              src={soft}
              alt="Icono Soft Skills"
              className="espacio-icon"
            />
          </div>
          <div className="espacio-block softskills hexagon">
            <h3>Empresas</h3>
            <p>Implementación de Proyectos y Gestión del Talento</p>
          </div>
          <button className="espacio-button">Soy empresa</button>
        </div>

      </div>
    </section>
  );
};

export default Espacio;

