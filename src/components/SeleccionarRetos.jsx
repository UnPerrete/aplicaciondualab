import React, { useState } from "react"; // Importa React y el hook useState para manejar estados
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación entre páginas
import { jsPDF } from "jspdf"; // Importa la librería jsPDF para generar PDFs
import "../styles/SeleccionarServicios.css"; // Importa los estilos CSS para el componente
import categoriasData from "./data/servicios.json"; // Importa los datos de servicios desde un archivo JSON
import { useAuth } from '../context/AuthProvider'; // Hook para manejar la autenticación
import logo from "../assets/logo.png"; // Importa el logo para incluir en el PDF
import InfoB from './ui/Info';

const SeleccionarServicios = () => {
  const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario
  const [gruposSeleccionados, setGruposSeleccionados] = useState([]); // Estado para almacenar los grupos seleccionados
  const [titulosSeleccionados, setTitulosSeleccionados] = useState([]); // Estado para almacenar los títulos seleccionados
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState({}); // Estado para almacenar los servicios seleccionados
  const [nuevoServicio, setNuevoServicio] = useState({}); // Estado para almacenar los nuevos servicios añadidos
  const [inputsNuevosServicios, setInputsNuevosServicios] = useState({}); // Estado para manejar los inputs de los nuevos servicios
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook para la navegación entre páginas
  const tipoSolicitante = user.role; // Estado para almacenar el tipo de solicitante

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(user);
  };

  // Extrae los nombres de los grupos desde los datos de categorías y los ordena alfabéticamente
  const grupos = [...new Set(categoriasData.map((categoria) => categoria.grupo))].sort();

  // Maneja la adición de nuevos servicios y su cantidad
  const handleNuevoServicioChange = (titulo, index, field, value) => {
    setNuevoServicio((prev) => {
      const nuevos = { ...prev };
      if (!nuevos[titulo]) nuevos[titulo] = []; // Si no existe la categoría, la inicializa
      if (!nuevos[titulo][index]) nuevos[titulo][index] = { nombre: "", cantidad: 0 }; // Inicializa el nuevo servicio

      nuevos[titulo][index] = {
        ...nuevos[titulo][index],
        [field]: value, // Actualiza el campo correspondiente (nombre o cantidad)
      };

      return nuevos;
    });
  };

  // Maneja la eliminación de un nuevo servicio
  const handleRemoveNuevoServicio = (titulo, index) => {
    setNuevoServicio((prev) => {
      const nuevos = { ...prev };
      if (nuevos[titulo]) {
        nuevos[titulo] = nuevos[titulo].filter((_, i) => i !== index); // Filtra eliminando el servicio específico
        if (nuevos[titulo].length === 0) delete nuevos[titulo]; // Si no quedan más servicios, elimina la categoría
      }
      return nuevos;
    });

    setInputsNuevosServicios((prev) => {
      const nuevos = { ...prev };
      if (nuevos[titulo]) {
        nuevos[titulo] = nuevos[titulo].filter((_, i) => i !== index); // Filtra eliminando la entrada de input correspondiente
        if (nuevos[titulo].length === 0) delete nuevos[titulo]; // Si no quedan más inputs, elimina la categoría
      }
      return nuevos;
    });
  };

  // Maneja la selección de grupos
  const handleGrupoChange = (event) => {
    const grupo = event.target.value;
    setGruposSeleccionados((prev) =>
      prev.includes(grupo) ? prev.filter((g) => g !== grupo) : [...prev, grupo]
    );
  };

  // Filtra los títulos disponibles en función de los grupos seleccionados
  const titulosDisponibles = categoriasData
    .filter((categoria) => gruposSeleccionados.includes(categoria.grupo))
    .sort((a, b) => a.grupo.localeCompare(b.grupo) || a.titulo.localeCompare(b.titulo));

  // Maneja la selección de títulos
  const handleTituloChange = (event) => {
    const titulo = event.target.value;
    setTitulosSeleccionados((prev) =>
      prev.includes(titulo) ? prev.filter((t) => t !== titulo) : [...prev, titulo]
    );
  };

  // Maneja la cantidad de personas seleccionadas para cada servicio
  const handleServicioChange = (servicio, cantidad) => {
    setServiciosSeleccionados((prev) => ({
      ...prev,
      [servicio]: cantidad,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que el campo "nombre" no esté vacío
    if (tipoSolicitante != "Profesor" && tipoSolicitante != "empresa" && formData.nombreProfesional.trim() == "") {
      return;
    }

    handleConfirmar();
  };


  const handleConfirmar = async () => {
    // Verifica si el tipo de solicitante está definido y si el formulario tiene datos
    if (tipoSolicitante != "Profesor" && tipoSolicitante != "empresa" && Object.keys(formData).length === 0) {
      alert("Por favor, complete los datos del solicitante antes de generar el PDF.");
      return;
    }


    const nombreSolicitante =
      tipoSolicitante === "Profesor" ? user.nombre :
        tipoSolicitante === "empresa" ? user.nombrecomercial :
          formData.nombreProfesional;

    const serviciosSeleccionadosJSON = {};

    gruposSeleccionados.forEach((grupo) => {
      categoriasData
        .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
        .forEach((categoria) => {
          categoria.servicios.forEach((servicio) => {
            const cantidad = parseInt(serviciosSeleccionados[servicio] || 0, 10);
            if (cantidad > 0) {
              serviciosSeleccionadosJSON[servicio] = cantidad;
            }
          });

          if (nuevoServicio[categoria.titulo] && nuevoServicio[categoria.titulo].length > 0) {
            nuevoServicio[categoria.titulo].forEach((servicio) => {
              if (parseInt(servicio.cantidad, 10) > 0) {
                serviciosSeleccionadosJSON[servicio.nombre] = servicio.cantidad;
              }
            });
          }
        });
    });

    const numeroPersonas = Object.values(serviciosSeleccionadosJSON).reduce((sum, val) => sum + val, 0);

    const data = {
      nombreSolicitante,
      tipoSolicitante,
      serviciosSeleccionados: serviciosSeleccionadosJSON,
      numeroPersonas
    };

    try {
      const response = await fetch("http://localhost:5000/api/guardar-servicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Datos guardados correctamente en la base de datos.");
        handleGeneratePDF();
      } else {
        alert("Error al guardar los datos en la base de datos.");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };


  const handleGeneratePDF = () => {
    // Verifica si el tipo de solicitante está definido y si el formulario tiene datos
    if (tipoSolicitante != "Profesor" && tipoSolicitante != "empresa" && Object.keys(formData).length === 0) {
      alert("Por favor, complete los datos del solicitante antes de generar el PDF.");
      return;
    }


    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const footerHeight = 30;
    let y = 20;

    // Agregar imagen del logo en la esquina superior izquierda
    doc.addImage(logo, "PNG", 5, 5, 15, 15);

    //Encabezado
    doc.setFontSize(14);
    doc.setFont("courier", "italic");
    doc.text("Via Optima Dualab", 20, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("• Datos del Solicitante - " + tipoSolicitante, 20, y + 10);
    y += 10;

    // Agregar información según el tipo de solicitante
    if (user.role == "Profesor") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${user.nombre}`, 20, y + 10);
      doc.text(`Apellidos: ${user.apellido}`, 110, y + 10);
      doc.text(`DNI: ${user.nif}`, 20, y + 20);
      doc.text(`Email: ${user.gmail != null ? user.gmail : "N/A"}`, 20, y + 30);
      doc.text(`Teléfono: ${user.telefono != null ? user.telefono : "N/A"}`, 110, y + 30);
      y += 60;
    } else if (user.role === "empresa") {
      doc.setFontSize(12);
      doc.text(`Zona comercial: ${user.idzca != null ? user.idzca : "N/A"}`, 20, y + 10);
      doc.text(`Nombre: ${user.nombrecomercial != null ? user.nombrecomercial : "N/A"}`, 20, y + 20);
      doc.text(`Razon Social: ${user.razonsocial != null ? user.razonsocial : "N/A"}`, 110, y + 20);
      doc.text(`Sector: ${user.sector != null ? user.sector : "N/A"}`, 20, y + 30);
      doc.text(`Actividad: ${user.actividad != null ? user.actividad : "N/A"}`, 110, y + 30);
      doc.text(`Calle: ${user.calle != null ? user.calle : "N/A"}`, 20, y + 40);
      doc.text(`Nº: ${user.nº != null ? user.nº : "N/A"}`, 110, y + 40);
      doc.text(`Código postal: ${user.cp != null ? user.cp : "N/A"}`, 20, y + 50);
      doc.text(`Correo: ${user.email != null ? user.email : "N/A"}`, 110, y + 50);
      doc.text(`Web: ${user.web != null ? user.web : "N/A"}`, 20, y + 60);
      y += 80;
    } else {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombreProfesional || "No rellenó"}`, 20, y + 10);
      doc.text(`Apellidos: ${formData.apellidosProfesional || "No rellenó"}`, 110, y + 10);
      doc.text(`DNI: ${formData.dniProfesional || "No rellenó"}`, 20, y + 20);
      doc.text(`Teléfono: ${formData.telefonoProfesional || "No rellenó"}`, 20, y + 30);
      doc.text(`Correo: ${formData.correoProfesional || "No rellenó"}`, 110, y + 30);
      y += 50;

    }

    // Agregar línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, y, 190, y);
    y += 10;

    // Sección de servicios seleccionados
    doc.setFontSize(16);
    doc.text("• Resumen de Retos Seleccionados", 20, y);
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

          if (nuevoServicio[categoria.titulo] && nuevoServicio[categoria.titulo].length > 0) {
            doc.text('-- Nuevos retos --', 40, y);
            y += 5;
            nuevoServicio[categoria.titulo].forEach((servicio) => {
              if (parseInt(servicio.cantidad, 10) > 0) {
                doc.setFontSize(10);
                doc.text(`* ${servicio.nombre}:`, 40, y);
                doc.text(`${servicio.cantidad} personas`, 180, y, { align: "right" });
                y += 5;
              }
            });
          }

          y += 5;
        });
    });

    // Agregar pie de página
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
        doc.text("Tel: +34 659 02 16 03", 20, footerY + 20);
        doc.text("• Dirección:", 115, footerY + 10);
        doc.text("Calle Sao Paulo, 6. Las Palmas de Gran Canaria", 120, footerY + 15);
        doc.text("País: España", 120, footerY + 20);
        doc.text(`© ${new Date().getFullYear()} Via Optima Dualab. Todos los derechos reservados.`, 55, footerY + 30);
      }
    };

    addFooter();

    // Guardar el PDF con el nombre correspondiente
    if (tipoSolicitante === "Profesor") {
      doc.save("Retos_Seleccionados_" + user.nombre + ".pdf");
    } else if ((tipoSolicitante === "empresa")) {
      doc.save("Retos_Seleccionados_" + user.nombrecomercial + ".pdf");
    } else {
      doc.save("Retos_Seleccionados_" + formData.nombreProfesional + ".pdf");
    }
  };

  const previewPDF = () => {
    // Verifica si el tipo de solicitante está definido y si el formulario tiene datos
    if (tipoSolicitante != "Profesor" && tipoSolicitante != "empresa" && Object.keys(formData).length === 0) {
      alert("Por favor, complete los datos del solicitante antes de generar el PDF.");
      return;
    }

    const doc = new jsPDF(); // Crea un nuevo documento PDF
    const pageHeight = doc.internal.pageSize.height; // Obtiene la altura de la página
    const footerHeight = 30; // Define la altura del pie de página
    let y = 20; // Posición inicial en el eje Y

    // Agregar imagen al PDF (logo)
    doc.addImage(logo, "PNG", 5, 5, 15, 15);

    // Configurar encabezado del documento
    doc.setFontSize(14);
    doc.setFont("courier", "italic");
    doc.text("Via Optima Dualab", 20, 15);

    // Agregar título de la sección de datos del solicitante
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("• Datos del Solicitante - " + tipoSolicitante, 20, y + 10);
    y += 10;

    // Agregar información según el tipo de solicitante
    if (user.role == "Profesor") {
      doc.setFontSize(12);
      doc.text(`Nombre: ${user.nombre}`, 20, y + 10);
      doc.text(`Apellidos: ${user.apellido}`, 110, y + 10);
      doc.text(`DNI: ${user.nif}`, 20, y + 20);
      doc.text(`Email: ${user.gmail != null ? user.gmail : "N/A"}`, 20, y + 30);
      doc.text(`Teléfono: ${user.telefono != null ? user.telefono : "N/A"}`, 110, y + 30);
      y += 60;
    } else if (user.role === "empresa") {
      doc.setFontSize(12);
      doc.text(`Zona comercial: ${user.idzca != null ? user.idzca : "N/A"}`, 20, y + 10);
      doc.text(`Nombre: ${user.nombrecomercial != null ? user.idzca : "N/A"}`, 20, y + 20);
      doc.text(`Razon Social: ${user.razonsocial != null ? user.idzca : "N/A"}`, 110, y + 20);
      doc.text(`Sector: ${user.sector != null ? user.sector : "N/A"}`, 20, y + 30);
      doc.text(`Actividad: ${user.actividad != null ? user.actividad : "N/A"}`, 110, y + 30);
      doc.text(`Calle: ${user.calle != null ? user.calle : "N/A"}`, 20, y + 40);
      doc.text(`Nº: ${user.nº != null ? user.nº : "N/A"}`, 110, y + 40);
      doc.text(`Código postal: ${user.cp != null ? user.cp : "N/A"}`, 20, y + 50);
      doc.text(`Correo: ${user.email != null ? user.email : "N/A"}`, 110, y + 50);
      doc.text(`Web: ${user.web != null ? user.web : "N/A"}`, 20, y + 60);
      y += 80;
    } else {
      doc.setFontSize(12);
      doc.text(`Nombre: ${formData.nombreProfesional || "No rellenó"}`, 20, y + 10);
      doc.text(`Apellidos: ${formData.apellidosProfesional || "No rellenó"}`, 110, y + 10);
      doc.text(`DNI: ${formData.dniProfesional || "No rellenó"}`, 20, y + 20);
      doc.text(`Teléfono: ${formData.telefonoProfesional || "No rellenó"}`, 20, y + 30);
      doc.text(`Correo: ${formData.correoProfesional || "No rellenó"}`, 110, y + 30);
      y += 50;

    }

    // Agregar línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, y, 190, y);
    y += 10;

    // Agregar sección de resumen de servicios seleccionados
    doc.setFontSize(16);
    doc.text("• Resumen de Retos Seleccionados", 20, y);
    y += 10;

    // Iterar sobre los grupos seleccionados
    gruposSeleccionados.forEach((grupo) => {
      doc.setFontSize(14);
      doc.text(`-> Grupo: ${grupo}`, 25, y);
      y += 10;

      // Filtrar las categorías y servicios seleccionados dentro del grupo
      categoriasData
        .filter((categoria) => categoria.grupo === grupo && titulosSeleccionados.includes(categoria.titulo))
        .forEach((categoria) => {
          // Verifica si se debe agregar una nueva página
          if (y + 15 > pageHeight - footerHeight) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(12);
          doc.text(`- ${categoria.titulo}`, 30, y);
          y += 6;

          // Iterar sobre los servicios seleccionados en la categoría
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

          // Agregar nuevos servicios requeridos
          if (nuevoServicio[categoria.titulo] && nuevoServicio[categoria.titulo].length > 0) {
            doc.text('-- Nuevos retos requeridos --', 40, y);
            y += 5;
            nuevoServicio[categoria.titulo].forEach((servicio) => {
              if (parseInt(servicio.cantidad, 10) > 0) {
                doc.setFontSize(10);
                doc.text(`* ${servicio.nombre}:`, 40, y);
                doc.text(`${servicio.cantidad} personas`, 180, y, { align: "right" });
                y += 5;
              }
            });
          }

          y += 5;
        });
    });

    // Función para agregar el pie de página
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

    addFooter(); // Llamar a la función para agregar pie de página

    // Generar la vista previa del PDF en el navegador
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="seleccionar-servicios-container"> {/* Contenedor principal */}
      <h2>Datos del solicitante</h2> {/* Título de la sección de datos del solicitante */}
      <form onSubmit={handleSubmit}> {/* Formulario sin envío por defecto */}

      {tipoSolicitante != "Profesor" && tipoSolicitante != "empresa" && ( /* Renderiza el formulario si el solicitante es un Profesor */
        <div className="formulario-profesor"> {/* Contenedor del formulario de Profesional */}
          <label>Nombre: <input type="text" name="nombreProfesional" onChange={handleInputChange} required/></label>
          <label>Apellidos: <input type="text" name="apellidosProfesional" onChange={handleInputChange} /></label>
          <label>DNI: <input type="text" name="dniProfesional" onChange={handleInputChange} /></label>
          <label>Teléfono: <input type="tel" name="telefonoProfesional" onChange={handleInputChange} /></label>
          <label>Correo: <input type="email" name="correoProfesional" onChange={handleInputChange} /></label>
        </div>
      )}


      <h2>Selecciona los retos que deseas</h2> {/* Título de la sección de selección de servicios */}
      
        <label htmlFor="grupo">➤ Seleccione uno o más grupos:</label>
        <select id="grupo" multiple value={gruposSeleccionados} onChange={handleGrupoChange}> {/* Selector de grupos */}
          <option value="">---- Ninguno ----</option>
          {grupos.map((grupo) => (
            <option key={grupo} value={grupo}>{grupo}</option> /* Opciones de grupos */
          ))}
        </select>

        {gruposSeleccionados.length > 0 && ( /* Renderiza si hay grupos seleccionados */
          <>
            <label htmlFor="titulo">➤ Seleccione uno o más títulos:</label>
            <select id="titulo" multiple value={titulosSeleccionados} onChange={handleTituloChange}> {/* Selector de títulos */}
              <option value="">---- Ninguno ----</option>
              {gruposSeleccionados.flatMap((grupo) => ([
                <option key={`grupo-${grupo}`} disabled>-- {grupo} --</option>,
                ...titulosDisponibles
                  .filter((categoria) => categoria.grupo === grupo)
                  .map((categoria) => (
                    <option key={categoria.titulo} value={categoria.titulo}>{categoria.titulo}</option>
                  ))
              ]))}
            </select>
          </>
        )}
        {titulosSeleccionados.length > 0 && (
          <div>
            <h3>➤ Seleccione los retos y la cantidad de personas:</h3> {/* Subtítulo */}
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
                      <div className="nuevo-servicio">
                        {inputsNuevosServicios[categoria.titulo]?.map((_, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              placeholder="Añadir nuevo servicio"
                              onChange={(e) => handleNuevoServicioChange(categoria.titulo, index, "nombre", e.target.value.trim())}
                            />
                            <input
                              type="number"
                              min="0"
                              placeholder="Nº personas"
                              onChange={(e) => handleNuevoServicioChange(categoria.titulo, index, "cantidad", e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveNuevoServicio(categoria.titulo, index)}>-</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => setInputsNuevosServicios((prev) => ({
                          ...prev,
                          [categoria.titulo]: [...(prev[categoria.titulo] || []), '']
                        }))}>+ Nuevo reto +</button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
        {/*&& handleGeneratePDF va en el segundo boton*/}
        {/* <button className="confirm" type="button" onClick={handleGeneratePDF}>Descargar PDF</button> Botón para generar PDF */}
        <button className="confirm" type="submit">Confirmar (enviar a BD) y Descargar PDF</button> {/* Botón para enviar datos a la BD generar PDF */}
        <button className="preview" type="button" onClick={previewPDF}>Vista previa del PDF</button> {/* Botón para previsualizar PDF */}
        <button type="button" onClick={() => navigate("/servicio")} className="back-button">Volver a Retos</button> {/* Botón para volver a la página de servicios */}
      </form>
      <InfoB/>
    </div>
  );
}
export default SeleccionarServicios;
