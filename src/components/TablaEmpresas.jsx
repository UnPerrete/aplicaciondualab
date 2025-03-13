import { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Tabla.css";

export const TablaEmpresas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");

  const municipios = [
    "Seleccionar municipio...",
    "Agaete", "Artenara", "Arucas", "Sta. Mª de Guía", "San Bartolomé de Tirajana",
    "La Aldea", "Moya", "Gáldar", "Las Palmas G.C.", "Firgas", "San Mateo",
    "Valsequillo", "Sta. Brígida", "Valleseco", "Teror"
  ];

  const federaciones = [
    "Aega", "Edarte", "COA Arucas", "Proguía", "Acomisaba", "Asempral", "AEMoya", "Fomento Gáldar",
    "Ace Schamann", "Vive Vegueta", "Aedal", "AEPY Guanarteme" ,"Asoesca", "Pymefir", "AESAM San Mateo",
    "Tajinaste Azul", "Sataute Comercial", "AEV Valleseco", "ASE Teror"
  ]

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then((response) => {
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

  const municipiosFiltrados = municipioSeleccionado && municipioSeleccionado !== "Seleccionar municipio..."
    ? data.filter((row) => row.Municipio === municipioSeleccionado)
    : data;

  return (
    <div>
      <Navbar />
      <h1>Empresas</h1>

      {/* Contenedor del select */}
      <div className="filtro-municipio">
        <label htmlFor="municipio">Filtrar por municipio: </label>
        <select
          id="municipio"
          value={municipioSeleccionado}
          onChange={(e) => setMunicipioSeleccionado(e.target.value)}
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
          {municipiosFiltrados.map((row) => (
            <tr key={row.ID}>
              <td>{row.Municipio}</td>
              <td>{row.Web && row.Web.trim() !== "" ? <Link to={row.Web}>{row.NombreComercial}</Link> : row.NombreComercial}</td>
              <td>{row.Sector}</td>
              <td>{row.Actividad}</td>
              <td>{row.Calle + ", " + row.Nº}</td>
              <td>{row.Nº}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
