import React, { useState } from "react";

import "../styles/Servicio.css";
import categoriasData from "./data/servicios.json";
import Navbar  from "./Navbar";
const Servicios = () => {

  const [desplegados, setDesplegados] = useState([]);
  const [categorias, setCategorias] = useState(categoriasData);
  const [categoriasOriginal] = useState([...categoriasData]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [ordenPorGrupo, setOrdenPorGrupo] = useState(false);
  const [gruposVisibles, setGruposVisibles] = useState({});

  const toggleDesplegable = (index) => {
    setDesplegados((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const toggleGrupo = (grupo) => {
    setGruposVisibles((prev) => ({
      ...prev,
      [grupo]: !prev[grupo],
    }));
  };

  const ordenarPorTitulo = () => {
    const categoriasOrdenadas = [...categorias].sort((a, b) =>
      a.titulo.localeCompare(b.titulo)
    );
    setCategorias(categoriasOrdenadas);
    setOrdenPorGrupo(false);
  };

  const restaurarOrden = () => {
    setCategorias([...categoriasOriginal]);
    setOrdenPorGrupo(false);
  };

  const ordenarPorGrupo = () => {
    setOrdenPorGrupo(true);
  };

  return (
    <div className="p-6">
      <Navbar/>
      {/* Título */}

      <h1 className="text-3xl font-bold text-center mb-4">
        En esta sección, podrá conocer nuestras principales áreas de
        especialización y los servicios que ofrecemos en cada una.
        <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      {/* Menú desplegable alineado a la izquierda */}
      <div className="dropdown-container">
        <div className="dropdown">
          <div
            className="title pointerCursor"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            Seleccione una opción ▾<i className="fa fa-angle-right"></i>
          </div>

          <div className={`menu pointerCursor ${menuAbierto ? "" : "hide"}`}>
            <div className="option" onClick={ordenarPorTitulo}>• Ordenar alfabéticamente</div>
            <div className="option" onClick={ordenarPorGrupo}>• Ordenar por grupo</div>
            <div className="option" onClick={restaurarOrden}>• Volver al orden original</div>
          </div>
        </div>
      </div>

      {/* Renderizado de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ordenPorGrupo ? (
          Object.entries(
            categorias.reduce((acc, categoria) => {
              const grupo = "• " + categoria.grupo || "Otros";
              if (!acc[grupo]) acc[grupo] = [];
              acc[grupo].push(categoria);
              return acc;
            }, {})
          ).map(([grupo, categoriasGrupo], index) => (
            <div key={index} className="w-full">
              {/* Encabezado del grupo con botón para expandir/colapsar */}
              <div
                className="grupo-header"
                onClick={() => toggleGrupo(grupo)}
              >
                <h2>{grupo}</h2>
                <span className="grupo-icon">
                  {gruposVisibles[grupo] ? "▴" : "▾"}
                </span>
              </div>

              {/* Contenido del grupo (categorías) */}
              {gruposVisibles[grupo] &&
                categoriasGrupo.map((categoria, idx) => (
                  <div key={idx} className="text-center mt-4">
                    <img
                      src={categoria.imagen}
                      alt={categoria.titulo}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <h2 className="text-xl font-semibold mt-4">
                      {categoria.titulo}
                    </h2>
                    <p className="mt-2 text-gray-600">{categoria.descripcion}</p>
                    <button
                      className="mt-2 text-blue-500 flex items-center justify-center"
                      onClick={() => toggleDesplegable(idx)}
                    >
                      {desplegados.includes(idx) ? "Servicios ▴" : "Servicios ▾"}
                    </button>
                    {desplegados.includes(idx) && (
                      <ul className="mt-2 text-gray-700 text-left mx-auto w-4/5">
                        {categoria.servicios.map((servicio, i) => (
                          <li key={i} className="text-sm">{servicio}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          ))
        ) : (
          categorias.map((categoria, index) => (
            <div key={index} className="text-center">
              <img
                src={categoria.imagen}
                alt={categoria.titulo}
                className="w-full h-64 object-cover rounded-lg"
              />
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
          ))
        )}
      </div>
    </div>
  );
};

export default Servicios;

