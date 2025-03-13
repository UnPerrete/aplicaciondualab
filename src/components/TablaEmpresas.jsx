import { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Tabla.css"


export const TablaEmpresas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data") // Asegúrate de que esta URL es la correcta para tu backend
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

  return (
    <div>
      <Navbar/>
      <h1>Empresas</h1>
      <div>
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
              <tr key={row.ID}>
                <td>{row.Municipio}</td>
                <td><Link to={row.Web}>{row.NombreComercial}</Link></td>
                <td>{row.Sector}</td>
                <td>{row.Actividad}</td>
                <td>{row.Calle + ", " + row.Nº}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
