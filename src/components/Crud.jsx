import React, { useState } from 'react';
import CryptoJS from "crypto-js";

const Crud = () => {
  const [activeForm, setActiveForm] = useState('');
  const [formData, setFormData] = useState({'role': 'alumno'});
  const [err, setErr] = useState(null);


  const handleFormSelect = (form) => {
    setActiveForm(form);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "password"){
      const hashedPass = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
      value = hashedPass
    }
    setFormData({ ...formData, [e.target.name]: value })
  };



    const handleSubmit = async () => {
        try{
            await fetch("http://localhost:5000/api/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({formData})
              });
        }catch (err){
            setErr(err)
        }
    }

  return (
    <div className="crud-container">
      <h2>Gestión de Datos</h2>
      <h2>{err}</h2>
      <div className="form-selection">
        <button onClick={() => handleFormSelect('user')}>Añadir Usuario</button>
        <button onClick={() => handleFormSelect('company')}>Añadir Empresa</button>
        <button onClick={() => handleFormSelect('project')}>Añadir Proyecto</button>
      </div>

      {/* Formulario para añadir Usuario */}
      {activeForm === 'user' && (
        <form className="user-form" onSubmit={handleSubmit}>
          <h3>Añadir Usuario</h3>
          <div className="form-group">
            <label htmlFor="NIF">NIF:</label>
            <input type="text" name="nif" placeholder="NIF" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" placeholder="Nueva Contraseña" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Role</label>
            <select name="role" onChange={handleChange}>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
                <option value="empresa">Empresa</option>
            </select>
          </div>
          <button type="submit">Añadir Usuario</button>
        </form>
      )}

      {/* Formulario para añadir Empresa */}
      {activeForm === 'company' && (
        <form className="company-form">
          <h3>Añadir Empresa</h3>
          <div className="form-group">
            <label htmlFor="companyName">Nombre de la Empresa:</label>
            <input type="text" id="companyName" placeholder="Nombre de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Ubicación:</label>
            <input type="text" id="companyLocation" placeholder="Ubicación de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Telefono:</label>
            <input type="text" id="companyLocation" placeholder="Telefono de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Email:</label>
            <input type="text" id="companyLocation" placeholder="Email de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Pagina Web:</label>
            <input type="text" id="companyLocation" placeholder="Pagina web de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Encargado:</label>
            <input type="text" id="companyLocation" placeholder="Encargado de la empresa" />
          </div>
          <div className="form-group">
            <label htmlFor="companyLocation">Puesto:</label>
            <input type="text" id="companyLocation" placeholder="Puesto del encargado de la empresa" />
          </div>
          <button type="submit">Añadir Empresa</button>
        </form>
      )}

      {/* Formulario para añadir Proyecto */}
      {activeForm === 'project' && (
        <form className="project-form">
          <h3>Añadir Proyecto</h3>
          <div className="form-group">
            <label htmlFor="projectName">Bloque:</label>
            <input type="text" id="projectName" placeholder="Nombre del proyecto" />
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Descripción:</label>
            <textarea id="projectDescription" placeholder="Descripción del proyecto"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Tareas a realizar:</label>
            <textarea id="projectDescription" placeholder="Tareas del proyecto"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Ejemplos:</label>
            <textarea id="projectDescription" placeholder="Ejemplos del proyecto"></textarea>
          </div>
          <button type="submit">Añadir Proyecto</button>
        </form>
      )}
    </div>
  );
};

// Exportación por defecto
export default Crud;
