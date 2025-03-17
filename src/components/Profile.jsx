import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated, setUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    nacimiento: user?.nacimiento || "",
    role: user?.role || "",
    nif: user?.nif || "",
    gmail: user?.gmail || "",
    telefono: user?.telefono || "",
    poblacion: user?.poblacion || "",
    zona: user?.zona || "",
  });

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
    console.log("Datos a enviar:", formData);  // Verifica qué datos estás enviando al servidor
    
    try {
      const response = await fetch(`http://localhost:5000/api/edit-profile/${formData.nif}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          nacimiento: formData.nacimiento,
          poblacion: formData.poblacion,
          role: formData.role,
          gmail: formData.gmail,
          telefono: formData.telefono,
          zona: formData.zona,
        }),
      });
  
      const data = await response.json();
      console.log(data);  // Verifica lo que devuelve la respuesta de la API
  
      if (response.ok) {
        alert("Perfil actualizado con éxito");
        setUser((prevUser) => ({
          ...prevUser,
          ...formData,
        }));
        setIsEditing(false);
      } else {
        alert(data.error || "Error al actualizar el perfil");
      }
    } catch (error) {
      alert("Error de red o servidor al guardar los cambios");
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>Hola {user.nombre}</h2>

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
          <div className="profile-info">
            <p><strong>Nombre:</strong> {user.nombre || "No disponible"}</p>
            <p><strong>Apellido:</strong> {user.apellido || "No disponible"}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user.nacimiento ? new Date(user.nacimiento).toLocaleDateString('es-ES') : "No disponible"}</p>
            <p><strong>NIF:</strong> {user.nif}</p>
            <p><strong>Correo Electrónico:</strong> {user.gmail || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {user.telefono || "No disponible"}</p>
            <p><strong>Población:</strong> {user.poblacion || "No disponible"}</p>
            <p><strong>Zona:</strong> {user.zona || "No disponible"}</p>
            <p><strong>Rol:</strong> {user.role}</p>
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
    </>
  );
};

export default Profile;







