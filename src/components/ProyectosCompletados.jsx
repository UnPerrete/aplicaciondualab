import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import '../styles/Investigacion.css';
import logo from "../assets/logo.png";
import Contactenos from './Contactenos';
import { Link } from 'react-router-dom';

const Proyecto = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/listFinishedProjects");
      const responseJson = await response.json();
      setData(responseJson);
    }
    fetchData();
  });

  return (
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
    {/* <div className="bg-gray-100 min-h-screen w-full"> */}
      {/* Header con logo y menú de navegación */}
      <div className="navbar1">
        <div className="logo">
          <img src={logo} alt="Vía Óptima FAB LAB" className="logo-img"/>
          <h1>Vía Óptima Dualab</h1>
        </div>
        <nav className="nav-links1">
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
          <a href="#" className="active">Proyectos</a>
          <a href="#">Formación</a>
          <a href="#">Recursos</a>
          <Link to="/contact">Contáctenos</Link>{/* <a href="#">Contáctenos</a> */}
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
        {data.map((item, index) => (
          <Card key={index} className="card">
            <img src={""} alt={item.nombre} className="card-img" />
            <CardContent>
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
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
