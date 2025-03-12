import { useEffect, useState } from "react";
import Navbar from './Navbar';
import axios from "axios";
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
        console.log(response.data)
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
              <th>ID ZCA</th>
              <th>Municipio</th>
              <th>Nombre Comercial</th>
              <th>Razon Social</th>
              <th>Sector</th>
              <th>Actividad</th>
              <th>Calle</th>
              <th>Numero de la Calle</th>
              <th>Codigo Postal</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Web</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.ID}>
                <td>{row.IdZCA}</td>
                <td>{row.Municipio}</td>
                <td>{row.NombreComercial}</td>
                <td>{row.RazonSocial}</td>
                <td>{row.Sector}</td>
                <td>{row.Actividad}</td>
                <td>{row.Calle}</td>
                <td>{row.Nº}</td>
                <td>{row.CP}</td>
                <td>{row.Telefono}</td>
                <td>{row.Email}</td>
                <td>{row.Web}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
