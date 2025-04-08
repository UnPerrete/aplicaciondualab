import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import eyeIcon from "../assets/eye.svg";  // Ruta de la imagen del ojo abierto
import eyeClosed from "../assets/eye-closed.svg"; // Ruta de la imagen del ojo cerrado

const Login = () => {
  // Estado para el rol de usuario (por defecto es 'profesor')
  const [role, setRole] = useState("profesor");
  // Estado para los datos del formulario de login (NIF, contraseña, etc.)
  const [formData, setFormData] = useState({});
  // Estado para manejar errores de login (como credenciales incorrectas)
  const [error, setError] = useState(null);
  // Estado para manejar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estado para controlar si estamos en modo de recuperación de contraseña
  const [isRecovering, setIsRecovering] = useState(false);
  // Estado para controlar si estamos en el modo de restablecimiento de contraseña
  const [isResetting, setIsResetting] = useState(false);

  const { login } = useAuth();  // Hook para acceder a las funciones de autenticación
  const navigate = useNavigate();  // Hook para navegar entre rutas de la app

  // Maneja los cambios en los campos del formulario (NIF, contraseña)
  const handleChange = (e) => {
    let value = e.target.value;
    // Si es la contraseña, la hasheamos antes de guardarla
    if (e.target.name === "password" && !isRecovering && !isResetting) {
      const hashedPass = CryptoJS.MD5(e.target.value).toString(CryptoJS.enc.Hex);
      value = hashedPass;  // Hasheamos la contraseña antes de almacenarla
    }
    setFormData({ ...formData, [e.target.name]: value });  // Actualizamos el estado de formData
  };

  // Enviar formulario de inicio de sesión (login)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto del formulario
    setError(null);  // Limpiamos el mensaje de error antes de realizar la petición

    try {
      // Enviamos una petición POST a la API para hacer login
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, ...formData })  // Enviamos el rol y los datos del formulario
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);  // Si la respuesta no es correcta, lanzamos un error
      }

      const data = await response.json();  // Parseamos la respuesta como JSON

      if (data.success) {
        login(data.user);  // Llamamos a la función login para autenticar al usuario
        navigate(`/servicio`);  // Navegamos a la página de servicio
      } else {
        setError("Credenciales incorrectas");  // Si no es exitoso, mostramos un error
      }
    } catch (error) {
      console.error(error);  // En caso de error, lo mostramos en la consola
      setError("Error de conexión con el servidor o credenciales incorrectas");
    }
  };

  // Enviar formulario de recuperación de contraseña
  const handleRecover = async (e) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto del formulario
    setError(null);  // Limpiamos el mensaje de error antes de realizar la petición

    try {
      // Enviamos una petición POST a la API para solicitar la recuperación de contraseña
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif: formData.nif })  // Enviamos el NIF para verificar si existe
      });

      const data = await response.json();  // Parseamos la respuesta como JSON

      if (data.message === "NIF Confirmado") {
        setIsResetting(true);  // Si el NIF es confirmado, cambiamos el estado a "restablecimiento de contraseña"
      } else {
        setError("NIF no encontrado");  // Si el NIF no se encuentra, mostramos un error
      }
    } catch (error) {
      setError("Error de conexión con el servidor");  // En caso de error, mostramos un mensaje de error
    }
  };

  // Enviar formulario de restablecimiento de contraseña
  const handleReset = async (e) => {
    e.preventDefault();  // Prevenimos el comportamiento por defecto del formulario
    setError(null);  // Limpiamos el mensaje de error antes de realizar la petición

    // Hasheamos la nueva contraseña antes de enviarla al servidor
    const hashedNewPassword = CryptoJS.MD5(formData.newPassword).toString(CryptoJS.enc.Hex);

    try {
      // Enviamos una petición POST a la API para restablecer la contraseña
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif: formData.nif, newPassword: hashedNewPassword })  // Enviamos el NIF y la nueva contraseña
      });

      const data = await response.json();  // Parseamos la respuesta como JSON

      if (data.message === "Contraseña restablecida con éxito") {
        setIsResetting(false);  // Si la contraseña se restablece correctamente, cambiamos el estado
        setIsRecovering(false);  // Terminamos el proceso de recuperación
        alert("Contraseña actualizada correctamente");  // Mostramos una alerta de éxito
      } else {
        setError("Error al restablecer la contraseña");  // Si hay un error, mostramos un mensaje
      }
    } catch (error) {
      setError("Error de conexión con el servidor");  // En caso de error, mostramos un mensaje de error
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
              <option value="empresa">Empresa</option>
            </select>
          </>
        )}

        {role === "empresa" ? <input type="text" className= "login-input" name="nombre_comercial" placeholder="Nombre comercial" onChange={handleChange} required /> : <input type="text" className= "login-input" name="nif" placeholder="NIF" onChange={handleChange} required />}


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
