import React from 'react';
import '../styles/VisionEstrategia.css';
import digi from '../assets/digitalizacion.png';
import sos from '../assets/sostenibilidad.png';
import soft from '../assets/softskills.png';

const VisionEstrategia = () => {
  return (
    <section className="vision-section">
      <div className="vision-header">
        <h2>Visión, Estrategia y Acción</h2>
        <p>
          Integrando la digitalización y la sostenibilidad en el desarrollo profesional de los alumnos.<br />
          Creando y alcanzando estándares de competencias y aptitudes profesionales certificadas.
        </p>
      </div>
      <div className="vision-columns">

        <div className="vision-item">
          <div className="vision-icon-wrapper">
            <img
              src={digi}
              alt="Icono Digitalización"
              className="vision-icon"
            />
          </div>
          <div className="vision-block digital hexagon">
            <h3>Digitalización</h3>
            <p>Aprendizaje y uso de herramientas digitales</p>
          </div>
        </div>

        <div className="vision-item">
          <div className="vision-icon-wrapper">
            <img
              src={sos}
              alt="Icono Sostenibilidad"
              className="vision-icon"
            />
          </div>
          <div className="vision-block sostenibilidad hexagon">
            <h3>Sostenibilidad</h3>
            <p>Implementación de acciones y soluciones sostenibles</p>
          </div>
          <button className="vision-button">Más información</button>
        </div>

        <div className="vision-item">
          <div className="vision-icon-wrapper">
            <img
              src={soft}
              alt="Icono Soft Skills"
              className="vision-icon"
            />
          </div>
          <div className="vision-block softskills hexagon">
            <h3>Soft Skills</h3>
            <p>Competencias y cualificaciones profesionales certificadas.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionEstrategia;

