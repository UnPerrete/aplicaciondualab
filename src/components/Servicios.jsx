import React, { useState } from "react";
import '../styles/Servicios.css';
import categorias from "./data/servicios.json"


const Inicio = () => {
  const [desplegados, setDesplegados] = useState([]);

  const toggleDesplegable = (index) => {
    setDesplegados((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // Cierra la lista si ya está abierta
        : [...prev, index] // Agrega la lista si no está abierta
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        En esta sección, podrá conocer nuestras principales áreas de especialización y los servicios que ofrecemos en cada una.
        Cada apartado incluye un desplegable con más detalles sobre los servicios disponibles. <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categorias.map((categoria, index) => (
          <div key={index} className="text-center">
            <img src={categoria.imagen} alt={categoria.titulo} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">{categoria.titulo}</h2>
            <p className="mt-2 text-gray-600">{categoria.descripcion}</p>
            <button
              className="mt-2 text-blue-500 flex items-center justify-center"
              onClick={() => toggleDesplegable(index)}
            >
              {desplegados.includes(index) ? "Servicios ▴" : "Servicios ▾"}
            </button>
            {desplegados.includes(index) && (
              <ul className="mt-2 text-gray-700 text-left mx-auto w-4/5">
                {categoria.servicios.map((servicio, i) => (
                  <li key={i} className="text-sm">{servicio}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
