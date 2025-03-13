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

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const ordenarPorGrupo = () => {
    setOrdenAscendente(!ordenAscendente);
    setCategorias(() => {
      const copiaCategorias = [...categoriasOriginal];
      return copiaCategorias.sort((a, b) => 
        ordenAscendente ? a.grupo.localeCompare(b.grupo) : b.grupo.localeCompare(a.grupo)
      );
    });
    cerrarMenu();
  };

  const toggleModoCompacto = () => {
    setModoCompacto(!modoCompacto);
    cerrarMenu();
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
            Seleccione una opción<i className="bi bi-chevron-down"></i>
          </div>
          <div className={`menu pointerCursor ${menuAbierto ? "" : "hide"}`}>
            <div className="option" onClick={ordenarPorGrupo}>• Ordenar alfabéticamente</div>
            <div className="option" onClick={() => { setCategorias([...categoriasOriginal]); cerrarMenu(); }}>• Restaurar orden original</div>
            <div className="option" onClick={() => { setGruposVisibles({}); cerrarMenu(); }}>• Colapsar todos los grupos</div>
            <div className="option" onClick={() => { setGruposVisibles(Object.fromEntries(categorias.map(cat => [cat.grupo, true]))); cerrarMenu(); }}>• Expandir todos los grupos</div>
            <div className="option" onClick={toggleModoCompacto}>{modoCompacto ? "• Modo expandido" : "• Modo compacto"}</div>
            <div className="option" onClick={() => { navigate('/seleccionar-servicios'); cerrarMenu(); }}>• Seleccionar servicios</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(
          categorias.reduce((acc, categoria) => {
            const grupo = categoria.grupo || "Otros";
            if (!acc[grupo]) acc[grupo] = [];
            acc[grupo].push(categoria);
            return acc;
          }, {})
        ).map(([grupo, categoriasGrupo]) => (
          <div key={grupo} className="w-full">
            <div className="grupo-header" onClick={() => toggleGrupo(grupo)}>
              <h2>{grupo}</h2>
              <span className="grupo-icon">
                {gruposVisibles[grupo] ? "▴" : "▾"}
              </span>
            </div>
            {gruposVisibles[grupo] &&
              categoriasGrupo.map((categoria) => (
                <div key={categoria.titulo} className={`text-center mt-4 ${modoCompacto ? 'compacto' : ''}`}>
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
                    onClick={() => toggleDesplegable(categoria.titulo)}
                  >
                    {desplegados.includes(categoria.titulo) ? "Servicios ▴" : "Servicios ▾"}
                  </button>
                  {desplegados.includes(categoria.titulo) && (
                    <ul className="mt-2 text-gray-700 text-left mx-auto w-4/5">
                      {categoria.servicios.map((servicio) => (
                        <li key={servicio} className="text-sm">{servicio}</li>
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
