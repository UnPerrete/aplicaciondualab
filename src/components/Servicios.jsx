import React, { useState } from "react"; // Importa React y el hook useState
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import "../styles/Servicio.css"; // Importa los estilos del componente
import categoriasData from "./data/servicios.json"; // Importa los datos de servicios desde un archivo JSON
import Navbar from "./Navbar"; // Importa el componente Navbar
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa los iconos de Bootstrap

const Servicios = () => {
  const [desplegados, setDesplegados] = useState([]); // Estado para controlar qué categorías están desplegadas
  const [categorias, setCategorias] = useState(categoriasData); // Estado que almacena las categorías de servicios
  const [categoriasOriginal] = useState([...categoriasData]); // Copia original de las categorías
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar si el menú está abierto
  const [gruposVisibles, setGruposVisibles] = useState({}); // Estado para controlar qué grupos están visibles
  const [ordenAscendente, setOrdenAscendente] = useState(true); // Estado para controlar el orden de los grupos
  const [modoCompacto, setModoCompacto] = useState(false); // Estado para cambiar entre modo compacto y expandido
  const navigate = useNavigate(); // Hook para la navegación entre páginas

  // Función para alternar si una categoría está desplegada o no
  const toggleDesplegable = (index) => {
    setDesplegados((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  // Función para alternar la visibilidad de un grupo de servicios
  const toggleGrupo = (grupo) => {
    setGruposVisibles((prev) => ({
      ...prev,
      [grupo]: !prev[grupo],
    }));
  };

  // Función para cerrar el menú desplegable
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Función para ordenar las categorías alfabéticamente por grupo
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

  // Función para cambiar entre modo compacto y expandido
  const toggleModoCompacto = () => {
    setModoCompacto(!modoCompacto);
    cerrarMenu();
  };

  return (
    <div className="p-6"> {/* Contenedor principal con padding */}
      <Navbar /> {/* Componente de navegación */}
      <h1 className="text-3xl font-bold text-center mb-4"> {/* Título principal */}
        En esta sección, podrá conocer nuestras principales áreas de
        especialización y los servicios que ofrecemos en cada una.
        <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      <button className="go-button" type="button" onClick={() => navigate("/seleccionar-servicios")}>
       Seleccionar servicios <i className="bi bi-clipboard"></i>
      </button>

      {/* Menú desplegable de opciones */}
      <div className="dropdown-container">
        <div className="dropdown">
          <div className="title pointerCursor" onClick={() => setMenuAbierto(!menuAbierto)}>
            Seleccione una opción<i className={menuAbierto ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
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

      {/* Renderiza los grupos de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(
          categorias.reduce((acc, categoria) => {
            const grupo = categoria.grupo || "Otros";
            if (!acc[grupo]) acc[grupo] = [];
            acc[grupo].push(categoria);
            return acc;
          }, {})
        ).map(([grupo, categoriasGrupo]) => (
          <div key={grupo} className="w-full"> {/* Contenedor de grupo */}
            <div className="grupo-header" onClick={() => toggleGrupo(grupo)}> {/* Encabezado del grupo */}
              <h2>{grupo}</h2>
              <span className="grupo-icon">{gruposVisibles[grupo] ? "▴" : "▾"}</span>
            </div>
            {gruposVisibles[grupo] &&
              categoriasGrupo.map((categoria) => (
                <div key={categoria.titulo} className={`text-center mt-4 ${modoCompacto ? 'compacto' : ''}`}> {/* Contenedor de cada servicio */}
                  {!modoCompacto && (
                    <img src={categoria.imagen} alt={categoria.titulo} className="w-full h-64 object-cover rounded-lg" />
                  )}
                  <h2 className="text-xl font-semibold mt-4">{categoria.titulo}</h2>
                  {!modoCompacto && <p className="mt-2 text-gray-600">{categoria.descripcion}</p>}
                  <button className="mt-2 text-blue-500 flex items-center justify-center" onClick={() => toggleDesplegable(categoria.titulo)}>
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

export default Servicios; // Exporta el componente para su uso en la aplicación
