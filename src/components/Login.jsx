import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import "../styles/Login.css"

const Login = () => {
  const [role, setRole] = useState("profesor");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        {/* Campos dinámicos */}
        {role === "profesor" && (
          <>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </>
        )}
        {role === "alumno" && (
          <>
            <input type="text" name="dni" placeholder="DNI" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </>
        )}
        {role === "empresa" && (
          <>
            <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </>
        )}
        
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
