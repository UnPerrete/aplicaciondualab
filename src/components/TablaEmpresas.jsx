import { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import { Link } from "react-router-dom";
import Proyectos from "./Proyectos";
import "../styles/Tabla.css";

export const TablaEmpresas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [mostrarProyectos, setMostrarProyectos] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const municipios = [
    "Seleccionar municipio...",
    "Agaete", "Artenara", "Arucas", "Sta. Mª de Guía", "San Bartolomé de Tirajana",
    "La Aldea", "Moya", "Gáldar", "Las Palmas G.C.", "Firgas", "San Mateo",
    "Valsequillo", "Sta. Brígida", "Valleseco", "Teror"
  ];


  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then((response) => {
        setOriginalData(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al cargar los datos." + error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;


    const handleChangeMunicipios = (e) => {
      const municipioSeleccionado = e.target.value;
      setData(municipioSeleccionado && municipioSeleccionado !== "Seleccionar municipio..."
        ? originalData.filter((row) => row.Municipio === municipioSeleccionado)
        : originalData);
    }

  return (
    <div>
      <Navbar />
      <h1>Empresas</h1>

      {/* Contenedor del select */}
      <div className="filtro-municipio">
        <label htmlFor="municipio">Filtrar por municipio: </label>
        <select
          id="municipio"
          onChange={handleChangeMunicipios}
        >
          {municipios.map((muni, index) => (
            <option key={index} value={index === 0 ? "" : muni}>{muni}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Municipio</th>
            <th>Nombre Comercial</th>
            <th>Sector</th>
            <th>Actividad</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <>
              <tr key={row.ID}>
                <td>{row.Municipio}</td>
                <td>{row.Web && row.Web.trim() !== "" ? <Link to={row.Web}>{row.NombreComercial}</Link> : row.NombreComercial}</td>
                <td>{row.Sector}</td>
                <td>{row.Actividad}</td>
                <td>{row.Calle + ", " + row.Nº}</td>
                <td><button onClick={ () => {
                  setMostrarProyectos(!mostrarProyectos);
                  if (selectedRow === row.ID) {
                    setSelectedRow(null);
                  } else {
                    setSelectedRow(row.ID);
                  }
                }}>{selectedRow === row.ID ? "▴" : "▾"}</button></td>
              </tr>
              {selectedRow === row.ID && (<tr><Proyectos ID={row.ID} /></tr>)}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
