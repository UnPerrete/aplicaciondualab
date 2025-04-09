import React from 'react';
import '../styles/Mapa360.css';
import centroMapa from '../assets/centro.png'; // Asegúrate de tener esta imagen en esa ruta
import profe from '../assets/profesorado.png';
import move from '../assets/360.png';
import dina from '../assets/dinamizadores.png';
import alu from '../assets/alumnado.png'; 
import em from '../assets/empresa.png';
import tuto from '../assets/tutores.png';
import exp from '../assets/expertos.png';
import circ from '../assets/circ.png';

const Mapa = () => {
    return (
      <section className="mapa360-section">
        <h2 className="titulo">Mapa 360° Agentes Intervinientes</h2>
   
        <img src={circ} alt="Circulo-central" className="circulo-central" />
        <img src={centroMapa} alt="Microproyectos" className="imagen-central" />
        <img src={move} alt="Movimiento360" className="move-360" />
        <p className='micro'>MICROPOYECTOS</p>
  
        <div className="hex-grid">
          <div className="hex-wrapper alumno">
          <div className="hex"><img src={alu} alt="Alumnado" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Alumnado</h3>
              <p>Investigación y Creación<br/>Formación y Capacitación<br/>Formación Dual</p>
            </div>
          </div>
  
          <div className="hex-wrapper empresa">
            <div className="hex"><img src={em} alt="Empresa" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Empresa</h3>
              <p>Microproyectos<br/>Necesidades<br/>Implementación</p>
            </div>
          </div>
  
          <div className="hex-wrapper tutores">
            <div className="hex"><img src={tuto} alt="Tutores" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Tutores</h3>
              <p>Seguimiento y<br/>Acompañamiento<br/>Empresa-Alumno</p>
            </div>
          </div>
  
          <div className="hex-wrapper expertos">
            <div className="hex"><img src={exp} alt="Expertos" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Expertos</h3>
              <p>Formación Específica<br/>Masterclass<br/>Orientación Profesional</p>
            </div>
          </div>
  
          <div className="hex-wrapper dinamizadores">
            <div className="hex"><img src={dina} alt="Dinamizadores" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Dinamizadores</h3>
              <p>Diseño Proyectos<br/>Selección de Empresas<br/>Seguimiento y Acompañamiento</p>
            </div>
          </div>
  
          <div className="hex-wrapper profesorado">
            <div className="hex"><img src={profe} alt="Profesorado" className="avatar" /></div>
            <div className="texto-hex">
              <h3>Profesorado</h3>
              <p>Seguimiento<br/>Formación<br/>Capacitación</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Mapa;