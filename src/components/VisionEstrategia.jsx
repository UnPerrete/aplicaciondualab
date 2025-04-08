import React from 'react';
import '../styles/VisionEstrategia.css';

const VisionEstrategia = () => {
  return (
    <section className="vision-section">
      <div className="vision-header">
        <h2>Visión, Estrategia y Acción</h2>
        <p>
          Integrando la digitalización y la sostenibilidad en el desarrollo profesional de los alumnos.<br/>
          Creando y alcanzando estándares de competencias y aptitudes profesionales certificadas.
        </p>
      </div>
      <div className="vision-columns">
        <div className="vision-item">
          <div className="vision-block digital hexagon">
            <div className="icon-placeholder">💻📱</div>
            <h3>Digitalización</h3>
            <p>Aprendizaje y uso de herramientas digitales</p>
          </div>
          {/* <button className="vision-button">Soy un Centro</button> */}
        </div>

        <div className="vision-item">
          <div className="vision-block sostenibilidad hexagon">
            <div className="icon-placeholder">🌍🏙️🌿</div>
            <h3>Sostenibilidad</h3>
            <p>Implementación de acciones y soluciones sostenibles</p>
          </div>
          <button className="vision-button">Más información</button>
        </div>

        <div className="vision-item">
          <div className="vision-block softskills hexagon">
            <div className="icon-placeholder">💬💡🤝</div>
            <h3>Soft Skills</h3>
            <p>Competencias y cualificaciones profesionales certificadas.</p>
          </div>
          {/* <button className="vision-button">Soy Empresa</button> */}
        </div>
      </div>
    </section>
  );
};

export default VisionEstrategia;
