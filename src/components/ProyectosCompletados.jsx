import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import '../styles/ProyectosCompletados.css';
import NavbarWeb from "./NavbarWeb";
import FooterSonia from './FooterSonia';
import ArrowUp from './ui/ArrowUp';
import InfoB from './ui/Info';

const Proyecto = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listFinishedProjects");
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
    {/* Navbar Importado */}
    <NavbarWeb />

      {/* Banner Principal */}
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

      {/* Sección de tarjetas con validación */}
      {/* <div className="card-grid"> */}
      <div className="card-gridd" style={{ maxWidth: '1600px', margin: 'auto' }}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Card key={index} className="cardd">
              <img src={item.imagen || ""} alt={item.nombre} className="cardd-img" />
              <CardContent>
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No hay proyectos disponibles.</p>
        )}
      </div>

      {/* Línea divisoria */}
      <hr className="section-divider" />
        <ArrowUp/>
        <InfoB/>
      {/* Footer */}
      <FooterSonia />
    </div>
  );
};

export default Proyecto;
