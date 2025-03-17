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
    role: user?.role || "",
    nif: user?.nif || "",
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
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/edit-profile/${formData.nif}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          role: formData.role,
        }),
      });

      const data = await response.json();

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
              <strong>Rol:</strong>
              <input type="text" name="role" value={formData.role} onChange={handleChange} />
            </label>
            <label>
              <strong>NIF:</strong>
              <input type="text" name="nif" value={formData.nif} onChange={handleChange} />
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
            <p><strong>Rol:</strong> {user.role}</p>
            <p><strong>NIF:</strong> {user.nif}</p>
          </div>
        )}

        <div className="profile-actions">
          <button onClick={() => setIsEditing(true)}>Editar perfil</button>
          <button onClick={() => { logout(); navigate("/login"); }}>Cerrar sesión</button>
        </div>
      </div>
    </>
  );
};

export default Profile;







