import { useEffect, useState } from "react";
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
      <h1>Empresas</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Correo de contacto</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.Empresa}>
                <td>{row.Empresa}</td>
                <td>{row.Dirección}</td>
                <td>{row.Teléfono}</td>
                <td>{row.Correoelectrónico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
