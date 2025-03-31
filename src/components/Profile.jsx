import React, { useState, useEffect } from "react"; // Importa React, useState y useEffect para gestionar el estado y efectos secundarios
import { useAuth } from "../context/AuthProvider"; // Importa el hook para acceder al contexto de autenticación
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir al usuario
import "../styles/Profile.css"; // Importa los estilos de CSS específicos para el perfil
import NavbarWeb from "./NavbarWeb";
import ArrowUp from "./ui/ArrowUp";
import InfoB from './ui/Info';

const Profile = () => {
    // Extrae el estado y las funciones necesarias del contexto de autenticación
    const { user, isAuthenticated, setUser, logout, loading } = useAuth();
    const navigate = useNavigate(); // Hook para navegar a otras páginas
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si está en modo de edición o no
    const [formData, setFormData] = useState(() => {
      if (user?.role === "Empresa") {
        return {
          nombrecomercial: user?.nombrecomercial || "",
          razonsocial: user?.razonsocial || "",
          sector: user?.sector || "",
          actividad: user?.actividad || "",
          calle: user?.calle || "",
          nº: user?.nº || "",
          cp: user?.cp || "",
          municipio: user?.municipio || "",
          email: user?.email || "",
          telefono: user?.telefono || "",
          web: user?.web || "",
        };
      } else {
        return {
          nombre: user?.nombre || "",
          apellido: user?.apellido || "",
          nacimiento: user?.nacimiento || "",
          role: user?.role || "",
          nif: user?.nif || "",
          gmail: user?.gmail || "",
          telefono: user?.telefono || "",
          poblacion: user?.poblacion || "",
          zona: user?.zona || "",
        };
      }
    }); // Estado para almacenar los datos del formulario, inicializados con los datos del usuario
  

  // Verifica el estado de carga y redirige si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (!user) {
    return <p>Usuario no encontrado o cargando...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(name, value);  // Verificar qué valores se están modificando
  };
  

  const handleSave = async () => {
    let formattedData = { ...formData };
  
    if (formattedData.nacimiento) {
      const fecha = new Date(formattedData.nacimiento);
      formattedData.nacimiento = fecha.toISOString().split("T")[0]; // Convierte a 'YYYY-MM-DD'
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/edit-profile/${user.nif}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Perfil actualizado correctamente");
  
        // 🔥 Actualiza el usuario en el contexto global
        setUser((prevUser) => ({
          ...prevUser,
          ...formattedData, // Fusiona los nuevos datos con los existentes
        }));
      } else {
        console.error("Error:", data);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error de conexión con el servidor");
    }
  };
  
  

  return (
    <>
    <div>
      <NavbarWeb /> {/* Muestra la barra de navegación */}
    </div>
      <div style={{ marginTop: "80px" }}></div>
      <div className="profile-container">
        <h2>Hola {user.nombre}</h2>

        {/* Con esto editas los datos del usuario */}
        {isEditing ? (
          <div className="profile-info">
            <label>
              <strong>Nombre:</strong>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label>
              <strong>Apellido:</strong>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
            </label>
            <label>
              <strong>Fecha de Nacimiento:</strong>
              <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} />
            </label>
            <label>
              <strong>NIF:</strong>
              <input type="text" name="nif" value={formData.nif} onChange={handleChange} />
            </label>
            <label>
              <strong>Gmail:</strong>
              <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} />
            </label>
            <label>
              <strong>Teléfono:</strong>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
            </label>
            <label>
              <strong>Población:</strong>
              <input type="text" name="poblacion" value={formData.poblacion} onChange={handleChange} />
            </label>
            <label>
              <strong>Zona:</strong>
              <input type="text" name="zona" value={formData.zona} onChange={handleChange} />
            </label>
            <label>
              <strong>Rol:</strong>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
                <option value="empresa">Empresa</option>
              </select>
            </label>
            <div className="profile-actions">
              <button onClick={handleSave}>Guardar cambios</button>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="profile-info"> {/* Muestra por pantalla los datos del perfil */}
            <p><strong>Nombre:</strong> {user.nombre || "No disponible"}</p>
            <p><strong>Apellido:</strong> {user.apellido || "No disponible"}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user.nacimiento ? new Date(user.nacimiento).toLocaleDateString('es-ES') : "No disponible"}</p>
            <p><strong>NIF:</strong> {user.nif}</p>
            <p><strong>Correo Electrónico:</strong> {user.gmail || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {user.telefono || "No disponible"}</p>
            <p><strong>Población:</strong> {user.poblacion || "No disponible"}</p>
            <p><strong>Zona:</strong> {user.zona || "No disponible"}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            {user.role == "Alumno" && (<p><strong>Profesor:</strong> {user.profesor}</p>)}
          </div>
        )}

        {user.role === "Empresa" && (
          <div className="profile-info">
            <h3>Datos de la Empresa</h3>
            <p><strong>Nombre Comercial:</strong> {user.nombrecomercial || "No disponible"}</p>
            <p><strong>Razón Social:</strong> {user.razonsocial || "No disponible"}</p>
            <p><strong>Sector:</strong> {user.sector || "No disponible"}</p>
            <p><strong>Actividad:</strong> {user.actividad || "No disponible"}</p>
            <p><strong>Dirección:</strong> {user.calle || "No disponible"} Nº {user.nº || "-"}</p>
            <p><strong>CP:</strong> {user.cp || "No disponible"}</p>
            <p><strong>Municipio:</strong> {user.municipio || "No disponible"}</p>
            <p><strong>Email Empresa:</strong> {user.email || "No disponible"}</p>
            <p><strong>Web:</strong> {user.web || "No disponible"}</p>
            <p><strong>Teléfono Empresa:</strong> {user.telefono || "No disponible"}</p>
          </div>
        )}

        {/* Estos botones solo se muestran cuando no estás en modo de edición */}
        {!isEditing && (
          <div className="profile-actions">
            <button onClick={() => setIsEditing(true)}>Editar perfil</button>
            <button onClick={() => { logout(); navigate("/login"); }}>Cerrar sesión</button>
          </div>
        )}
      </div>
      <InfoB/>
      <ArrowUp/>
    </>
  );
};

export default Profile;







