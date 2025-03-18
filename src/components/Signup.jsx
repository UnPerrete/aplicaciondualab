import React, { useState } from 'react';
import CryptoJS from "crypto-js"; // Librería para encriptar la contraseña
import { Link } from "react-router-dom"; // Para la navegación entre páginas
import { useNavigate } from "react-router-dom"; // Para redireccionar al usuario después del registro
import { useAuth } from '../context/AuthProvider'; // Hook para manejar la autenticación
import "../styles/Signup.css"; // Estilos para el formulario de registro

export default function Signup() {
  // Estado local para manejar los datos del formulario, con "Profesor" como valor predeterminado para el rol
  const [formData, setFormData] = useState({'role': 'Profesor'}); 
  const [err, setErr] = useState(null); // Estado para manejar errores en el formulario
  const { login } = useAuth(); // Método para manejar el inicio de sesión después del registro
  const navigate = useNavigate(); // Hook de React Router para redirigir a otras páginas

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
      let value = e.target.value;
      // Si el campo es de tipo "password", se encripta usando MD5
      if (e.target.type === "password") {
          value = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
      }
      setFormData({ ...formData, [e.target.name]: value }); // Se actualiza el estado con los nuevos valores
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
      e.preventDefault(); // Evita el comportamiento predeterminado del formulario
      try {
          const response = await fetch("http://localhost:5000/api/addUser", { // Se envían los datos al backend
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData) // Se convierten los datos a JSON antes de enviarlos
          });
          const data = await response.json(); // Se obtiene la respuesta del servidor

          if (data.success) { // Si el registro fue exitoso
              login(); // Se inicia sesión automáticamente
              navigate(`/login`); // Se redirige a la página de inicio de sesión
          } else {
              // Manejo de errores específicos según el código de error recibido
              switch (data.error) {
                  case 1062:
                      setErr("Este NIF ya ha sido registrado"); // Error de duplicado (NIF ya existente)
                      break;
                  case 1048:
                      setErr("Complete todos los campos"); // Error por campos vacíos
                      break;
                  case 79:
                      setErr("Las contraseñas no coinciden"); // Error si las contraseñas no son iguales
                      break;
                  default:
                      setErr("Error desconocido"); // Si el error no está identificado
              }
          }
      } catch (err) {
          setErr(err.message); // Si ocurre un error de conexión o inesperado
      }
  };

  return (
      <div className='signup-container'>
          <form className="user-form" onSubmit={handleSubmit}> 
              <h2>Sign Up</h2>
              <p style={{ color: "red" }}>{err}</p> {/* Muestra los errores en pantalla si existen */}

              {/* Campos del formulario */}
              <div className="form-group">
                  <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="date" name="nacimiento" placeholder="Fecha de Nacimiento" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="email" name="gmail" placeholder="Gmail" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="tel" name="telefono" placeholder="Telefono" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="poblacion" placeholder="Población" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="zona" placeholder="Zona" onChange={handleChange} required />
              </div>

              {/* Contraseñas (se encriptan antes de enviarse) */}
              <div className="form-group">
                  <input type="password" name="pass" placeholder="Nueva Contraseña" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="password" name="confirmpass" placeholder="Confirmar Contraseña" onChange={handleChange} required />
              </div>

              {/* Selección de rol */}
              <div className="form-group">
                  <select name="role" onChange={handleChange}>
                      <option value="profesor">Profesor</option>
                      <option value="alumno">Alumno</option>
                      <option value="empresa">Empresa</option>
                  </select>
              </div>

              <button type="submit">Añadir Usuario</button> {/* Botón para enviar el formulario */}
          </form>

          {/* Enlace a la página de inicio de sesión si el usuario ya tiene cuenta */}
          <p>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
      </div>
  );
}

