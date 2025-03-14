import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import "../styles/Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({'role': 'Profesor'});
  const [err, setErr] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
      let value = e.target.value;
      if (e.target.type === "password") {
          value = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
      }
      setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch("http://localhost:5000/api/addUser", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData) // ✅ Enviar datos correctamente
          });
          const data = await response.json();

          if (data.success) {
              login();
              navigate(`/tabla`);
          } else {
              switch (data.error) {
                  case 1062:
                      setErr("Este NIF ya ha sido registrado");
                      break;
                  case 1048:
                      setErr("Complete todos los campos");
                      break;
                  case 79:
                      setErr("Las contraseñas no coinciden");
                      break;
                  default:
                      setErr("Error desconocido");
              }
          }
      } catch (err) {
          setErr(err.message);
      }
  };

  return (
      <div className='signup-container'>
          <form className="user-form" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <p style={{ color: "red" }}>{err}</p>
              <div className="form-group">
                  <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="password" name="pass" placeholder="Nueva Contraseña" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <input type="password" name="confirmpass" placeholder="Confirmar Contraseña" onChange={handleChange} required />
              </div>
              <div className="form-group">
                  <select name="role" onChange={handleChange}>
                      <option value="profesor">Profesor</option>
                      <option value="alumno">Alumno</option>
                      <option value="empresa">Empresa</option>
                  </select>
              </div>
              <button type="submit">Añadir Usuario</button>
          </form>
          <p>
              ¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link>
          </p>
      </div>
  );
}
