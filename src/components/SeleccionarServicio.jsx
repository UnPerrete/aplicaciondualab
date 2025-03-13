import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../styles/SeleccionarServicios.css";
import categoriasData from "./data/servicios.json";

const SeleccionarServicios = () => {
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [titulosSeleccionados, setTitulosSeleccionados] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({});
  const navigate = useNavigate();

  const grupos = [...new Set(categoriasData.map((categoria) => categoria.grupo))].sort();
  
  const handleGrupoChange = (event) => {
    const grupo = event.target.value;
    setGruposSeleccionados((prev) =>
      prev.includes(grupo) ? prev.filter((g) => g !== grupo) : [...prev, grupo]
    );
  };

  const titulosDisponibles = categoriasData
    .filter((categoria) => gruposSeleccionados.includes(categoria.grupo))
    .sort((a, b) => a.grupo.localeCompare(b.grupo) || a.titulo.localeCompare(b.titulo));

  const handleTituloChange = (event) => {
    const titulo = event.target.value;
    setTitulosSeleccionados((prev) =>
      prev.includes(titulo) ? prev.filter((t) => t !== titulo) : [...prev, titulo]
    );
  };

  const handleServicioChange = (servicio, cantidad) => {
    setServiciosSeleccionados((prev) => ({
      ...prev,
      [servicio]: cantidad,
    }));
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resumen de Servicios Seleccionados", 20, 20);

    let y = 30;
    gruposSeleccionados.forEach((grupo) => {
      doc.setFontSize(14);
      doc.text(`Grupo: ${grupo}`, 20, y);
      y += 10;

      titulosDisponibles
        .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
        .forEach((categoria) => {
          doc.setFontSize(12);
          doc.text(`- ${categoria.titulo}`, 30, y);
          y += 6;

          categoria.servicios.forEach((servicio) => {
            if (serviciosSeleccionados[servicio]) {
              doc.setFontSize(10);
              doc.text(`   * ${servicio}: ${serviciosSeleccionados[servicio]} persona(s)`, 40, y);
              y += 5;
            }
          });
          y += 5;
        });
    });

    doc.save("Servicios_Seleccionados.pdf");
  };

  return (
    <div className="seleccionar-servicios-container">
      <h2>Seleccionar Servicios</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="grupo">Seleccione uno o más grupos:</label>
        <select id="grupo" multiple value={gruposSeleccionados} onChange={handleGrupoChange}>
          {grupos.map((grupo) => (
            <option key={grupo} value={grupo}>{grupo}</option>
          ))}
        </select>

        {gruposSeleccionados.length > 0 && (
          <>
            <label htmlFor="titulo">Seleccione uno o más títulos:</label>
            <select id="titulo" multiple value={titulosSeleccionados} onChange={handleTituloChange}>
              {gruposSeleccionados.flatMap((grupo) => (
                [
                  <option key={`grupo-${grupo}`} disabled>-- {grupo} --</option>,
                  ...titulosDisponibles
                    .filter((categoria) => categoria.grupo === grupo)
                    .map((categoria) => (
                      <option key={categoria.titulo} value={categoria.titulo}>
                        {categoria.titulo}
                      </option>
                    ))
                ]
              ))}
            </select>
          </>
        )}

        {titulosSeleccionados.length > 0 && (
          <div>
            <h3>Seleccione los servicios y la cantidad de personas:</h3>
            {gruposSeleccionados.map((grupo) => (
              <div key={grupo}>
                <hr />
                <h3>{grupo}</h3>
                {titulosDisponibles
                  .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
                  .map((categoria) => (
                    <div key={categoria.titulo}>
                      <h4>• {categoria.titulo}</h4>
                      {categoria.servicios.map((servicio) => (
                        <div key={servicio} className="servicio-item">
                          <label>{servicio}</label>
                          <input
                            type="number"
                            min="0"
                            value={serviciosSeleccionados[servicio] || 0}
                            onChange={(e) => handleServicioChange(servicio, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        <button className="confirm" type="button" onClick={handleGeneratePDF}>Confirmar y Descargar PDF</button>
        <button type="button" onClick={() => navigate("/servicio")} className="back-button">Volver a Servicios</button>
      </form>
    </div>
  );
};

export default SeleccionarServicios;
