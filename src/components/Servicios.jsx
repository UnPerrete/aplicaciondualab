import React, { useState } from "react"; // Importa React y el hook useState
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación entre páginas
import "../styles/Servicio.css"; // Importa los estilos CSS para el componente
import categoriasData from "./data/servicios.json"; // Importa los datos de servicios desde un archivo JSON
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa los iconos de Bootstrap
import NavbarWeb from "./NavbarWeb";
import ArrowUp from "./ui/ArrowUp";

const Servicios = () => {
  const [desplegados, setDesplegados] = useState([]); // Estado para almacenar los elementos desplegados
  const [categorias, setCategorias] = useState(categoriasData); // Estado para almacenar las categorías de servicios
  const [categoriasOriginal] = useState([...categoriasData]); // Estado que almacena la copia original de las categorías
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para controlar la visibilidad del menú
  const [gruposVisibles, setGruposVisibles] = useState({}); // Estado para manejar qué grupos están visibles
  const [ordenAscendente, setOrdenAscendente] = useState(true); // Estado para determinar el orden de los grupos (ascendente o descendente)
  const [modoCompacto, setModoCompacto] = useState(false); // Estado para alternar entre modo compacto y expandido
  const navigate = useNavigate(); // Hook para navegar entre páginas

  // Función para alternar la visibilidad de una categoría desplegable
  const toggleDesplegable = (index) => {
    setDesplegados((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // Si ya está desplegado, lo oculta
        : [...prev, index] // Si no está desplegado, lo muestra
    );
  };

  // Función para alternar la visibilidad de un grupo
  const toggleGrupo = (grupo) => {
    setGruposVisibles((prev) => ({
      ...prev,
      [grupo]: !prev[grupo], // Invierte el estado de visibilidad del grupo
    }));
  };

  // Función para cerrar el menú desplegable
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Función para ordenar las categorías por grupo en orden ascendente o descendente
  const ordenarPorGrupo = () => {
    setOrdenAscendente(!ordenAscendente); // Alterna el orden ascendente/descendente
    setCategorias(() => {
      const copiaCategorias = [...categoriasOriginal]; // Copia las categorías originales
      return copiaCategorias.sort((a, b) => 
        ordenAscendente ? a.grupo.localeCompare(b.grupo) : b.grupo.localeCompare(a.grupo)
      ); // Ordena alfabéticamente en función de ordenAscendente
    });
    cerrarMenu(); // Cierra el menú después de ordenar
  };

  // Función para alternar entre modo compacto y expandido
  const toggleModoCompacto = () => {
    setModoCompacto(!modoCompacto); // Alterna el estado de modo compacto
    cerrarMenu(); // Cierra el menú
  };

  return (
    <div className="p-6"> {/* Contenedor principal con padding */}
      <NavbarWeb /> {/* Navbar para la navegación */}
      <h1 className="text-3xl font-bold text-center mb-4"> 
        En esta sección, podrá conocer nuestras principales áreas de
        especialización y los servicios que ofrecemos en cada una.
        <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      <button className="go-button" type="button" onClick={() => navigate("/seleccionar-servicios")}>
       Seleccionar servicios <i className="bi bi-clipboard"></i> {/* Botón para navegar a la selección de servicios */}
      </button>

      <div className="dropdown-container"> {/* Contenedor del menú desplegable */}
        <div className="dropdown">
          <div
            className="title pointerCursor"
            onClick={() => setMenuAbierto(!menuAbierto)} // Alterna la visibilidad del menú
          >
            Seleccione una opción<i className={menuAbierto ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i> 
          </div>
          <div className={`menu pointerCursor ${menuAbierto ? "" : "hide"}`}> {/* Muestra u oculta el menú */}
            <div className="option" onClick={ordenarPorGrupo}>• Ordenar alfabéticamente</div>
            <div className="option" onClick={() => { setCategorias([...categoriasOriginal]); cerrarMenu(); }}>• Restaurar orden original</div>
            <div className="option" onClick={() => { setGruposVisibles({}); cerrarMenu(); }}>• Colapsar todos los grupos</div>
            <div className="option" onClick={() => { setGruposVisibles(Object.fromEntries(categorias.map(cat => [cat.grupo, true]))); cerrarMenu(); }}>• Expandir todos los grupos</div>
            <div className="option" onClick={toggleModoCompacto}>{modoCompacto ? "• Modo expandido" : "• Modo compacto"}</div>
            <div className="option" onClick={() => { navigate('/seleccionar-servicios'); cerrarMenu(); }}>• Seleccionar servicios</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Contenedor en formato grid para los grupos de servicios */}
        {Object.entries(
          categorias.reduce((acc, categoria) => {
            const grupo = categoria.grupo || "Otros"; // Si no tiene grupo, se asigna a "Otros"
            if (!acc[grupo]) acc[grupo] = [];
            acc[grupo].push(categoria);
            return acc;
          }, {})
        ).map(([grupo, categoriasGrupo]) => (
          <div key={grupo} className="w-full"> {/* Contenedor de cada grupo */}
            <div className="grupo-header" onClick={() => toggleGrupo(grupo)}> {/* Encabezado del grupo con función de colapso */}
              <h2>{grupo}</h2>
              <span className="grupo-icon">
                {gruposVisibles[grupo] ? "▴" : "▾"} {/* Icono de colapso/expansión */}
              </span>
            </div>
            {gruposVisibles[grupo] &&
              categoriasGrupo.map((categoria) => (
                <div key={categoria.titulo} className={`text-center mt-4 ${modoCompacto ? 'compacto' : ''}`}>
                  {!modoCompacto && ( 
                    <img
                      src={categoria.imagen} // Imagen de la categoría
                      alt={categoria.titulo}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-4">
                    {categoria.titulo} {/* Título de la categoría */}
                  </h2>
                  {!modoCompacto && <p className="mt-2 text-gray-600">{categoria.descripcion}</p>} {/* Descripción de la categoría */}
                  <button
                    className="mt-2 text-blue-500 flex items-center justify-center"
                    onClick={() => toggleDesplegable(categoria.titulo)} // Alterna la visibilidad de los servicios
                  >
                    {desplegados.includes(categoria.titulo) ? "Servicios ▴" : "Servicios ▾"}
                  </button>
                  {desplegados.includes(categoria.titulo) && (
                    <ul className="mt-2 text-gray-700 text-left mx-auto w-4/5">
                      {categoria.servicios.map((servicio) => (
                        <li key={servicio} className="text-sm">{servicio}</li> // Lista de servicios de la categoría
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
      <ArrowUp/>
    </div>
  );
};

export default Servicios; // Exporta el componente para su uso en otras partes de la aplicación
