import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Servicio.css";
import categoriasData from "./data/servicios.json";
import Navbar from "./Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";


const Servicios = () => {
  const [desplegados, setDesplegados] = useState([]);
  const [categorias, setCategorias] = useState(categoriasData);
  const [categoriasOriginal] = useState([...categoriasData]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [gruposVisibles, setGruposVisibles] = useState({});
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [modoCompacto, setModoCompacto] = useState(false);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("Todos");
  const navigate = useNavigate();

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

  const ordenarPorGrupo = () => {
    setOrdenAscendente(!ordenAscendente);
    setCategorias((prevCategorias) => {
      const gruposOrdenados = Object.entries(
        prevCategorias.reduce((acc, categoria) => {
          const grupo = "• " + (categoria.grupo || "Otros");
          if (!acc[grupo]) acc[grupo] = [];
          acc[grupo].push(categoria);
          return acc;
        }, {})
      );
      
      gruposOrdenados.sort((a, b) => ordenAscendente ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]));

      return gruposOrdenados.flatMap(([_, categoriasGrupo]) => 
        categoriasGrupo.sort((a, b) => a.titulo.localeCompare(b.titulo))
      );
    });
  };

  const restaurarOrden = () => {
    setCategorias([...categoriasOriginal]);
  };

  const expandirTodos = () => {
    const nuevosGruposVisibles = {};
    categorias.forEach((categoria) => {
      nuevosGruposVisibles["• " + (categoria.grupo || "Otros")] = true;
    });
    setGruposVisibles(nuevosGruposVisibles);
  };

  const colapsarTodos = () => {
    setGruposVisibles({});
  };

  const toggleModoCompacto = () => {
    setModoCompacto(!modoCompacto);
  };

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-4">
        En esta sección, podrá conocer nuestras principales áreas de
        especialización y los servicios que ofrecemos en cada una.
        <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      <button className="go-button" type="button" onClick={() => navigate("/seleccionar-servicios")}>
       Seleccionar servicios <i className="bi bi-clipboard"></i>
      </button>

      <div className="dropdown-container">
        <div className="dropdown">
          <div
            className="title pointerCursor"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            Seleccione una opción ▾<i className="fa fa-angle-right"></i>
          </div>
          <div className={`menu pointerCursor ${menuAbierto ? "" : "hide"}`}>
            <div className="option" onClick={ordenarPorGrupo}>• Ordenar alfabéticamente</div>
            <div className="option" onClick={restaurarOrden}>• Restaurar orden original</div>
            <div className="option" onClick={expandirTodos}>• Expandir todos los grupos</div>
            <div className="option" onClick={colapsarTodos}>• Colapsar todos los grupos</div>
            <div className="option" onClick={toggleModoCompacto}>{modoCompacto ? "• Modo expandido" : "• Modo compacto"}</div>
            <div className="option" onClick={() => navigate('/seleccionar-servicios')}>• Seleccionar servicios</div>
          </div>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(
          categorias.reduce((acc, categoria) => {
            const grupo = "• " + (categoria.grupo || "Otros");
            if (!acc[grupo]) acc[grupo] = [];
            acc[grupo].push(categoria);
            return acc;
          }, {})
        ).map(([grupo, categoriasGrupo], index) => (
          <div key={index} className="w-full">
            <div className="grupo-header" onClick={() => toggleGrupo(grupo)}>
              <h2>{grupo}</h2>
              <span className="grupo-icon">
                {gruposVisibles[grupo] ? "▴" : "▾"}
              </span>
            </div>
            {gruposVisibles[grupo] &&
              categoriasGrupo.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((categoria, idx) => (
                <div key={idx} className="text-center mt-4">
                  {!modoCompacto && (
                    <img
                      src={categoria.imagen}
                      alt={categoria.titulo}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-4">
                    {categoria.titulo}
                  </h2>
                  {!modoCompacto && <p className="mt-2 text-gray-600">{categoria.descripcion}</p>}
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
        ))}
      </div>
    </div>
  );
};

export default Servicios;
