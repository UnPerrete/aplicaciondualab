import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Tabla.css";
import SearchBar from "./SearchBar";
import NavbarWeb from "./NavbarWeb";
import ArrowUp from "./ui/ArrowUp";
import InfoB from './ui/Info';

export const TablaEmpresas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState(40);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const roleUser = JSON.parse(localStorage.getItem("user")).role;


  const municipios = [
    "Seleccionar municipio...",
    "Agaete", "Artenara", "Arucas", "Sta. Mª de Guía", "San Bartolomé de Tirajana",
    "La Aldea", "Moya", "Gáldar", "Las Palmas G.C.", "Firgas", "San Mateo",
    "Valsequillo", "Sta. Brígida", "Valleseco", "Teror"
  ];

  const sectores = [
    "Seleccionar sector...",
    "Art. y Entretenimiento", "Comercio", "Hostelería", "Servicios", "Educación",
    "Alojamiento", "Industria", "Turismo", "Const. y Act. Inmob.", "Alimentación",
    "Transportes", "Construcción", "Energía", "Asesoría", "Comunicaciones",
    "Interm. Financiera", "Act. Adm. y Serv. Aux.", "Servicios Jurídicos"
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

  useEffect(() => {
    if (!loading && !error) {
      let filteredData = originalData;
      if (selectedMunicipio && selectedMunicipio !== "Seleccionar municipio...") {
        filteredData = filteredData.filter(row => row.Municipio === selectedMunicipio);
      }
      if (selectedSector && selectedSector !== "Seleccionar sector...") {
        filteredData = filteredData.filter(row => row.Sector === selectedSector);
      }
      setData(filteredData);
    }
  }, [selectedMunicipio, selectedSector, originalData, loading, error]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div>
      <NavbarWeb />
      <div style={{ marginTop: "90px" }}>
        <SearchBar onSearch={setData} />
      </div>
      <div className="filtros">
        <label htmlFor="municipio">Filtrar por municipio: </label>
        <select id="municipio" value={selectedMunicipio} onChange={(e) => setSelectedMunicipio(e.target.value)}>
          {municipios.map((muni, index) => (
            <option key={index} value={index === 0 ? "" : muni}>{muni}</option>
          ))}
        </select>
        <label htmlFor="sector">Filtrar por sector: </label>
        <select id="sector" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
          {sectores.map((sec, index) => (
            <option key={index} value={index === 0 ? "" : sec}>{sec}</option>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            index < totalEmpresas && (
              <tr key={row.ID}>
                <td>{row.Municipio}</td>
                <td>{row.Web && row.Web.trim() !== "" ? <Link to={row.Web}>{row.NombreComercial}</Link> : row.NombreComercial}</td>
                <td>{row.Sector}</td>
                <td>{row.Actividad}</td>
                <td>{row.Calle + ", " + row.Nº}</td>
                {roleUser === "Profesor" && row.hasProjects ? (
                  <td><Link to={`/info-proyecto/${row.ID}`}><button><strong>Ver solicitudes</strong></button></Link></td>
                ) : <td></td>}
              </tr>
            )
          ))}
        </tbody>
      </table>
      <p className="link" onClick={() => setTotalEmpresas(totalEmpresas * 2)}>Mostrar más ...</p>
      <InfoB />
      <ArrowUp />
    </div>
  );
};
