import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../styles/SeleccionarServicios.css";
import categoriasData from "./data/servicios.json";
import logo from "../assets/logo.png";

const SeleccionarServicios = () => {
  const [tipoSolicitante, setTipoSolicitante] = useState("");
  const [formData, setFormData] = useState({});
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]);
  const [titulosSeleccionados, setTitulosSeleccionados] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    if (!tipoSolicitante || Object.keys(formData).length === 0) {
      alert("Por favor, complete los datos del solicitante antes de generar el PDF.");
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const footerHeight = 30;
    //let y = 20;
    let y = 20;

    // Agregar imagen
    doc.addImage(logo, "PNG", 5, 5, 15, 15);
    //Encabezado
    doc.setFontSize(14);
    doc.setFont("courier", "italic");
    doc.text("Via Optima Dualab", 20, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("• Datos del Solicitante - "+tipoSolicitante, 20, y + 10);
    y += 10;

    if (tipoSolicitante === "Profesor") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombre || "No rellenó"}`, 20, y + 10);
      doc.text(`Apellidos: ${formData.apellidos || "No rellenó"}`, 110, y + 10); //20, y + 10
      doc.text(`DNI: ${formData.dni || "No rellenó"}`, 20, y + 20);
      doc.text(`Centro Educativo: ${formData.centro || "No rellenó"}`, 20, y + 30);
      doc.text(`Departamento: ${formData.departamento || "No rellenó"}`, 110, y + 30);
      doc.text(`Teléfono: ${formData.telefono || "No rellenó"}`, 20, y + 40);
      doc.text(`Correo: ${formData.correo || "No rellenó"}`, 110, y + 40);
      y += 60;
    } else if (tipoSolicitante === "Empresa") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombreEmpresa || "No rellenó"}`, 20, y + 10);
      doc.text(`CIF/NIF: ${formData.cif || "No rellenó"}`, 20, y + 20);
      doc.text(`Tipo de empresa: ${formData.tipoEmpresa || "No rellenó"}`, 110, y + 20);
      doc.text(`Dirección: ${formData.direccion || "No rellenó"}`, 20, y + 30);
      doc.text(`Código Postal: ${formData.codigoPostal || "No rellenó"}`, 110, y + 30);
      doc.text(`Provincia: ${formData.provincia || "No rellenó"}`, 20, y + 40);
      doc.text(`Ciudad: ${formData.ciudad || "No rellenó"}`, 110, y + 40);
      doc.text(`País: ${formData.pais || "No rellenó"}`, 20, y + 50);
      doc.text(`Teléfono: ${formData.telefonoEmpresa || "No rellenó"}`, 110, y + 50);
      doc.text(`Correo: ${formData.correoEmpresa || "No rellenó"}`, 20, y + 60);
      doc.text(`Página Web: ${formData.paginaWeb || "No rellenó"}`, 20, y + 70);
      y += 80;
    }

    // Agregar línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, y, 190, y);
    y += 10;

    doc.setFontSize(16);
    doc.text("• Resumen de Servicios Seleccionados", 20, y);
    y += 10;

    gruposSeleccionados.forEach((grupo) => {
      doc.setFontSize(14);
      doc.text(`-> Grupo: ${grupo}`, 25, y);
      y += 10;

      categoriasData
        .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
        .forEach((categoria) => {
          if (y + 15 > pageHeight - footerHeight) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(12);
          doc.text(`- ${categoria.titulo}`, 30, y);
          y += 6;

          categoria.servicios.forEach((servicio) => {
            const cantidad = parseInt(serviciosSeleccionados[servicio] || 0, 10);
            if (cantidad > 0) {
              if (y + 10 > pageHeight - footerHeight) {
                doc.addPage();
                y = 20;
              }
              doc.setFontSize(10);
              doc.text(`* ${servicio}:`, 40, y);
              doc.text(`${cantidad} personas`, 180, y, { align: "right" });
              y += 5;
            }
          });
          y += 5;
        });
    });

    const addFooter = () => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const footerY = pageHeight - 35;
        doc.setLineWidth(0.5);
        doc.line(0, footerY, 250, footerY); // Línea separadora
        doc.setFontSize(10);
        doc.text("• Contacto:", 15, footerY + 10);
        doc.text("Correo: viaoptimadualab@gmail.com", 20, footerY + 15);
        doc.text("Tel: +34 691 01 19 93", 20, footerY + 20);
        doc.text("• Dirección:", 115, footerY + 10);
        doc.text("Calle Sao Paulo, 6. Las Palmas de Gran Canaria", 120, footerY + 15);
        doc.text("País: España", 120, footerY + 20);
        doc.text(`© ${new Date().getFullYear()} Via Optima Dualab. Todos los derechos reservados.`, 55, footerY + 30);
      }
    };

    addFooter();
    
    if(tipoSolicitante === "Profesor"){
      doc.save("Servicios_Seleccionados_"+tipoSolicitante+"_"+formData.nombre+".pdf");
    } else{
      doc.save("Servicios_Seleccionados_"+tipoSolicitante+"_"+formData.nombreEmpresa+".pdf");
    }
    //doc.save("Servicios_Seleccionados_"+tipoSolicitante+"_"+formData.nombreEmpresa || formData.nombre+".pdf");
  };

  const previewPDF = () => {
    if (!tipoSolicitante || Object.keys(formData).length === 0) {
      alert("Por favor, complete los datos del solicitante antes de generar el PDF.");
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const footerHeight = 30;
    //let y = 20;
    let y = 20;

    // Agregar imagen
    doc.addImage(logo, "PNG", 5, 5, 15, 15);
    //Encabezado
    doc.setFontSize(14);
    doc.setFont("courier", "italic");
    doc.text("Via Optima Dualab", 20, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("• Datos del Solicitante - "+tipoSolicitante, 20, y + 10);
    y += 10;

    if (tipoSolicitante === "Profesor") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombre || "No rellenó"}`, 20, y + 10);
      doc.text(`Apellidos: ${formData.apellidos || "No rellenó"}`, 110, y + 10); //20, y + 10
      doc.text(`DNI: ${formData.dni || "No rellenó"}`, 20, y + 20);
      doc.text(`Centro Educativo: ${formData.centro || "No rellenó"}`, 20, y + 30);
      doc.text(`Departamento: ${formData.departamento || "No rellenó"}`, 110, y + 30);
      doc.text(`Teléfono: ${formData.telefono || "No rellenó"}`, 20, y + 40);
      doc.text(`Correo: ${formData.correo || "No rellenó"}`, 110, y + 40);
      y += 60;
    } else if (tipoSolicitante === "Empresa") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombreEmpresa || "No rellenó"}`, 20, y + 10);
      doc.text(`CIF/NIF: ${formData.cif || "No rellenó"}`, 20, y + 20);
      doc.text(`Tipo de empresa: ${formData.tipoEmpresa || "No rellenó"}`, 110, y + 20);
      doc.text(`Dirección: ${formData.direccion || "No rellenó"}`, 20, y + 30);
      doc.text(`Código Postal: ${formData.codigoPostal || "No rellenó"}`, 110, y + 30);
      doc.text(`Provincia: ${formData.provincia || "No rellenó"}`, 20, y + 40);
      doc.text(`Ciudad: ${formData.ciudad || "No rellenó"}`, 110, y + 40);
      doc.text(`País: ${formData.pais || "No rellenó"}`, 20, y + 50);
      doc.text(`Teléfono: ${formData.telefonoEmpresa || "No rellenó"}`, 110, y + 50);
      doc.text(`Correo: ${formData.correoEmpresa || "No rellenó"}`, 20, y + 60);
      doc.text(`Página Web: ${formData.paginaWeb || "No rellenó"}`, 20, y + 70);
      y += 80;
    }

    // Agregar línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, y, 190, y);
    y += 10;

    doc.setFontSize(16);
    doc.text("• Resumen de Servicios Seleccionados", 20, y);
    y += 10;

    gruposSeleccionados.forEach((grupo) => {
      doc.setFontSize(14);
      doc.text(`-> Grupo: ${grupo}`, 25, y);
      y += 10;

      categoriasData
        .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
        .forEach((categoria) => {
          if (y + 15 > pageHeight - footerHeight) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(12);
          doc.text(`- ${categoria.titulo}`, 30, y);
          y += 6;

          categoria.servicios.forEach((servicio) => {
            const cantidad = parseInt(serviciosSeleccionados[servicio] || 0, 10);
            if (cantidad > 0) {
              if (y + 10 > pageHeight - footerHeight) {
                doc.addPage();
                y = 20;
              }
              doc.setFontSize(10);
              doc.text(`* ${servicio}:`, 40, y);
              doc.text(`${cantidad} personas`, 180, y, { align: "right" });
              y += 5;
            }
          });
          y += 5;
        });
    });

    const addFooter = () => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const footerY = pageHeight - 35;
        doc.setLineWidth(0.5);
        doc.line(0, footerY, 250, footerY); // Línea separadora
        doc.setFontSize(10);
        doc.text("• Contacto:", 15, footerY + 10);
        doc.text("Correo: viaoptimadualab@gmail.com", 20, footerY + 15);
        doc.text("Tel: +34 691 01 19 93", 20, footerY + 20);
        doc.text("• Dirección:", 115, footerY + 10);
        doc.text("Calle Sao Paulo, 6. Las Palmas de Gran Canaria", 120, footerY + 15);
        doc.text("País: España", 120, footerY + 20);
        doc.text(`© ${new Date().getFullYear()} Via Optima Dualab. Todos los derechos reservados.`, 55, footerY + 30);
      }
    };

    addFooter();

    // Mostrar vista previa antes de descargar
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
    /*const pdfBlob = doc.output("bloburl");
    window.open(pdfBlob, "_blank");*/
  }

  return (
    <div className="seleccionar-servicios-container">
      <h2>Datos del solicitante</h2>
      <label htmlFor="tipoSolicitante">Seleccione tipo de solicitante:</label>
      <select id="tipoSolicitante" value={tipoSolicitante} onChange={(e) => setTipoSolicitante(e.target.value)}>
        <option value="">-- Seleccione --</option>
        <option value="Profesor">Profesor</option>
        <option value="Empresa">Empresa</option>
      </select>

      {tipoSolicitante === "Profesor" && (
        <div className="formulario-profesor">
          <label>Nombre: <input type="text" name="nombre" onChange={handleInputChange} /></label>
          <label>Apellidos: <input type="text" name="apellidos" onChange={handleInputChange} /></label>
          <label>DNI: <input type="text" name="dni" onChange={handleInputChange} /></label>
          <label>Centro Educativo: <input type="text" name="centro" onChange={handleInputChange} /></label>
          <label>Departamento: <input type="text" name="departamento" onChange={handleInputChange} /></label>
          <label>Teléfono: <input type="tel" name="telefono" onChange={handleInputChange} /></label>
          <label>Correo: <input type="email" name="correo" onChange={handleInputChange} /></label>
        </div>
      )}

      {tipoSolicitante === "Empresa" && (
        <div className="formulario-empresa">
          <label>Nombre: <input type="text" name="nombreEmpresa" onChange={handleInputChange} /></label>
          <label>CIF/NIF/Número de Identificación Fiscal: <input type="text" name="cif" onChange={handleInputChange} /></label>
          <label>Tipo de empresa: <input type="text" name="tipoEmpresa" onChange={handleInputChange} /></label>
          <label>Dirección: <input type="text" name="direccion" onChange={handleInputChange} /></label>
          <label>Código Postal: <input type="text" name="codigoPostal" onChange={handleInputChange} /></label>
          <label>Provincia: <input type="text" name="provincia" onChange={handleInputChange} /></label>
          <label>Ciudad: <input type="text" name="ciudad" onChange={handleInputChange} /></label>
          <label>País: <input type="text" name="pais" onChange={handleInputChange} /></label>
          <label>Teléfono: <input type="tel" name="telefonoEmpresa" onChange={handleInputChange} /></label>
          <label>Correo: <input type="email" name="correoEmpresa" onChange={handleInputChange} /></label>
          <label>Página Web: <input type="url" name="paginaWeb" onChange={handleInputChange} /></label>
        </div>
      )}
      <h2>Selecciona los servicios que deseas</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="grupo">➤ Seleccione uno o más grupos:</label>
        <select id="grupo" multiple value={gruposSeleccionados} onChange={handleGrupoChange}>
          <option value="">---- Ninguno ----</option>
          {grupos.map((grupo) => (
            <option key={grupo} value={grupo}>{grupo}</option>
          ))}
        </select>

        {gruposSeleccionados.length > 0 && (
          <>
            <label htmlFor="titulo">➤ Seleccione uno o más títulos:</label>
            <select id="titulo" multiple value={titulosSeleccionados} onChange={handleTituloChange}>
              <option value="">---- Ninguno ----</option>
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
            <h3>➤ Seleccione los servicios y la cantidad de personas:</h3>
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
                          <label>◼ {servicio}</label>
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
        <button className="preview" type="button" onClick={previewPDF}>Vista previa del PDF</button>
        <button type="button" onClick={() => navigate("/servicio")} className="back-button">Volver a Servicios</button>
      </form>
    </div>
  );
};

export default SeleccionarServicios;