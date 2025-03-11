import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import CryptoJS from "crypto-js";
import "../styles/Login.css"

const Login = () => {
  const [role, setRole] = useState("profesor");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    let value = e.target.value;
        if (e.target.type === "password"){
          const hashedPass = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
          value = hashedPass
        }
        setFormData({ ...formData, [e.target.name]: value })
  };


  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...formData })
      });
      
      const data = await response.json();
      
      if (data.success) {
        login();
        navigate(`/tabla`);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Selector de rol */}
        <label>Rol:</label>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="profesor">Profesor</option>
          <option value="alumno">Alumno</option>
          <option value="empresa">Empresa</option>
        </select>

          <>
            <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </>
        
        
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;