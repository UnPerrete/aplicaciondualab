import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import '../styles/Investigacion.css';// './Investigacion.css';
import logo from "../assets/logo.png";

const Proyecto = () => {
  return (
    //<div className="bg-gray-100 min-h-screen">
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
    {/* <div className="bg-gray-100 min-h-screen w-full"> */}
      {/* Header con logo y menú de navegación */}
      <div className="navbar1">
        <div className="logo">
          <img src={logo} alt="Vía Óptima FAB LAB" className="logo-img"/>
          {/* <img src="../assets/logo.png" alt="Vía Óptima FAB LAB" className="logo-img"/> */}
          <h1>Vía Óptima Dualab</h1>
        </div>
        <nav className="nav-links1">
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
          <a href="#" className="active">Proyectos</a>
          <a href="#">Formación</a>
          <a href="#">Recursos</a>
          <a href="#">Colaboraciones</a>
          <a href="#">Equipo</a>
        </nav>
      </div>

      {/* Imagen principal con título */}
      <div className="main-banner">
        <div className="overlay"></div>
        <h2>Proyectos</h2>
      </div>

      {/* Texto introductorio */}
      <div className="intro-text">
        <p>
          Colaboramos en la investigación con organizaciones afines para fomentar una cultura de innovación dinámica, auténtica, humana y sostenible.
        </p>
      </div>

      {/* Sección de investigación */}
      <div className="card-grid">
        {[
          {title: 'ECOLOGÍA CÍVICA', image: '/images/ecologia.jpg', description: 'Acercar los sistemas ecológicos y la biodiversidad a los ciudadanos a través de exploraciones abiertas de alimentos, energía y biología.'},
          {title: 'DISEÑO DISTRIBUIDO', image: '/images/diseno.jpg', description: 'Un nuevo enfoque de diseño que utiliza conectividad global para mover datos, en lugar de productos.'},
          {title: 'FUTURO EMERGENTE', image: '/images/futuro.jpg', description: 'Explorar contextos emergentes, romper hábitos e identificar oportunidades en situaciones sociopolíticas actuales y futuras.'},
          {title: 'APRENDIZAJE FUTURO', image: '/images/aprendizaje.jpg', description: 'Desarrollar herramientas y tecnologías que traduzcan entornos urbanos en datos tangibles.'},
          {title: 'AGRICULTURA Y TECNOLOGÍA', image: '/images/agricultura.jpg', description: 'Innovación tecnológica aplicada al desarrollo agrícola sostenible.'},
          {title: 'CIUDADES PRODUCTIVAS', image: '/images/ciudades.jpg', description: 'Transformar ciudades mediante procesos productivos más eficientes y amigables con el medio ambiente.'},
          {title: 'FABLAB', image: '/images/fablab.jpg', description: 'Desarrollar herramientas y tecnologías que traduzcan entornos urbanos en datos tangibles.'},
          {title: 'CREACIÓN DE SENTIDO', image: '/images/creacion.jpg', description: 'Innovación en la manera en que se perciben y comprenden las dinámicas sociales y productivas.'},
          {title: 'ARTESANÍA', image: '/images/artesania.jpg', description: 'Rescate y modernización de técnicas artesanales para adaptarlas al presente.'},
        ].map((item, index) => (
          <Card key={index} className="card">
            <img src={item.image} alt={item.title} className="card-img" />
            <CardContent>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>info@viaoptima.es | Calle Juan de Quesada 22 Las Palmas G.C. | 659 02 16 03</p>
      </div>
    </div>
  );
};

export default Proyecto;
