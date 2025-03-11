import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import "../styles/Login.css";

export default function Signup() {
    const [formData, setFormData] = useState({'role': 'Profesor'});
    const [err, setErr] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

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

                  const data = await response.json();
                  console.log(data.success)
                  if (data.success) {
                    login();
                    navigate(`/tabla`);
                  } else {
                    setErr("Credenciales incorrectas");
                  }

            }catch (err){
                setErr(err)
            }
        }

  return (
    <div className='login-container'>
        <form className="user-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="NIF">NIF:</label>
            <input type="text" name="nif" placeholder="NIF" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input type="password" name="pass" placeholder="Nueva Contraseña" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input type="password" name="confirmpass" placeholder="Nueva Contraseña" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select name="role" onChange={handleChange}>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
                <option value="empresa">Empresa</option>
            </select>
          </div>
          <button type="submit">Añadir Usuario</button>
        </form>
        <p>
            ¿Ya tienes Cuenta? <Link to="/">Inicia sesion aquí</Link>
        </p>
    </div>
  )
}
