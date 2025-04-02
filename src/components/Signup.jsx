import React, { useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import centrosData from "./data/centrosFP.json";
import "../styles/Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({ role: 'Profesor' });
  const [err, setErr] = useState(null);
  const [rol, setRol] = useState('Profesor');
  const [profesores, setProfesores] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const centerData = centrosData.centrosFP


  useEffect(() => {
    fetch("http://localhost:5000/api/listProfesores")
    .then(result => result.json())
    .then(data => setProfesores(data));
  }, []);


  


  const handleChange = (e) => {
    let value = e.target.type === "password" ? CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex) : e.target.value;
    
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleChangeRole = (e) => {
    setRol(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};

    //Comprobar requisitos de la contraseña
    try {

      //Llamada a la API
      const response = await fetch("http://localhost:5000/api/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      data = await response.json();
      if (data.success) {
        login();
        navigate(`/`);
      } else {
        const errors = {
          1062: "Este NIF ya ha sido registrado",
          1048: "Complete todos los campos",
          79: "Las contraseñas no coinciden"
        };
        setErr(errors[data.error] || "Error desconocido");
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className='signup-container'>
      <form className="user-form" onSubmit={handleSubmit}> 
        <h2>Registro de Usuario</h2>

        
    <div className="form-cuadro">
        <fieldset>
            {rol !== "Empresa" && (
              <>
                <legend>Datos Personales</legend>
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
                <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />
                <input type="date" name="nacimiento" placeholder="Fecha de Nacimiento" onChange={handleChange} required />
              </>
            )}
          {rol === "Empresa" && (
            <>
              <legend>Datos de Empresa</legend>
              <input type="text" name="nombre_comercial" placeholder="Nombre Comercial" onChange={handleChange} required />
              </>
            )}
        </fieldset>

        <fieldset>
          <legend>Contacto</legend>
          <input type="email" name="gmail" placeholder="Email" onChange={handleChange} required />
          <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
          <input type="text" name="poblacion" placeholder="Población" onChange={handleChange} required />
          <input type="text" name="zona" placeholder="Zona" onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Seguridad</legend>
          <input type="password" name="pass" placeholder="Nueva Contraseña" onChange={handleChange} required />
          <input type="password" name="confirmpass" placeholder="Confirmar Contraseña" onChange={handleChange} required />
        </fieldset>

        {rol === "Alumno" && (
          <fieldset>
            <legend>Información del Alumno</legend>
            <select name="profesor_id" id="profesor_id" onChange={handleChange}>
              <option value="">Elige un profesor</option>
              {profesores.map( (profe) => (
                <option value={profe.id}>{profe.nombre + " " + profe.apellido}</option>
              ) )}
            </select>
          </fieldset>
        )}

        {rol === "Profesor" && (
          <fieldset>
            <legend>Información del Profesor</legend>
            <select name="instituto" id="insti" onChange={handleChange}>
              {centerData.map( (centro, index) => (
                <option value={centro.nombre}>{centro.nombre}</option>
              ) )}
            </select>
          </fieldset>
        )}

        <fieldset>
          <legend>Rol</legend>
          <select name="role" onChange={handleChangeRole} className="select-rol">
            <option value="Profesor">Profesor</option>
            <option value="Alumno">Alumno</option>
            <option value="Empresa">Empresa</option>
          </select>
        </fieldset>
    </div>
    <p className="error-message">{err}</p>
      <button type="submit" className="registro-button">Registrar Usuario</button>
    </form>

    <p className="login-link">
      ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
    </p>
  </div>
  );
}

