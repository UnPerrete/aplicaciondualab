import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import eyeIcon from "../assets/eye.svg";  // Ruta de la imagen del ojo abierto
import eyeClosed from "../assets/eye-closed.svg"; // Ruta de la imagen del ojo cerrado

const Login = () => {
  const [role, setRole] = useState("profesor");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la contraseña
  const [isRecovering, setIsRecovering] = useState(false); // Estado para el modo de recuperación de contraseña
  const [isResetting, setIsResetting] = useState(false); // Estado para el modo de restablecimiento de contraseña
  const { login } = useAuth();
  const navigate = useNavigate();

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "password" && !isRecovering && !isResetting) {
      const hashedPass = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
      value = hashedPass;  // Hashear la contraseña antes de guardarla en el estado
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Enviar formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...formData })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Datos del usuario", data.user); // Verifica los datos que recibes del backend
        login(data.user);  // Solo necesitamos esta línea
        navigate(`/servicio`); // Redirigir a la página de servicio
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      setError("Error de conexión con el servidor o credenciales incorrectas");
    }
  };

  // Enviar formulario de recuperación de contraseña
  const handleRecover = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif: formData.nif })
      });
      
      const data = await response.json();
      
      if (data.message === "NIF Confirmado") {
        setIsResetting(true);
      } else {
        setError("NIF no encontrado");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  // Enviar formulario de restablecimiento de contraseña
  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
  
    // Cifrar la nueva contraseña antes de enviarla
    const hashedNewPassword = CryptoJS.MD5(formData.newPassword).toString(CryptoJS.enc.Hex);
  
    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif: formData.nif, newPassword: hashedNewPassword })  // Enviar la nueva contraseña cifrada
      });
      
      const data = await response.json();
      
      if (data.message === "Contraseña restablecida con éxito") {
        setIsResetting(false);
        setIsRecovering(false);
        alert("Contraseña actualizada correctamente");
      } else {
        setError("Error al restablecer la contraseña");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>{isRecovering ? (isResetting ? "Restablecer Contraseña" : "Recuperar Contraseña") : "Login"}</h2>
      <form onSubmit={isRecovering ? (isResetting ? handleReset : handleRecover) : handleSubmit}>
        {!isRecovering && (
          <>
            {/* Selector de rol */}
            <label>Rol:</label>
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="profesor">Profesor</option>
              <option value="alumno">Alumno</option>
              <option value="empresa">Empresa</option>
            </select>
          </>
        )}

        <input type="text" name="nif" placeholder="NIF" onChange={handleChange} required />

        {!isRecovering && (
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? eyeIcon : eyeClosed}
              alt="Mostrar contraseña"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        )}

        {isResetting && (
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Nueva Contraseña"
              onChange={handleChange}
              required
            />
            <img
              src={showPassword ? eyeIcon : eyeClosed}
              alt="Mostrar contraseña"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        )}

        <button type="submit">{isRecovering ? (isResetting ? "Restablecer Contraseña" : "Recuperar Contraseña") : "Iniciar sesión"}</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        {isRecovering ? (
          <span onClick={() => { setIsRecovering(false); setIsResetting(false); }} className="forgot-password">Volver al login</span>
        ) : (
          <>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            <br />
            <span onClick={() => setIsRecovering(true)} className="forgot-password">¿Olvidaste tu contraseña?</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;
