import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "../styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Navbar />
        <div className="profile-container">
          <h2>Hola {user.nombre || "invitado"}</h2>

          <div className="profile-info">
            <p><strong>Nombre:</strong> {user.nombre || "No disponible"}</p>
            <p><strong>Apellido:</strong> {user.apellido || "No disponible"}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <p><strong>NIF:</strong> {user.nif}</p>
            <p><strong>Email:</strong> {user.email || "No disponible"}</p>
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate("/edit-profile")}>Editar perfil</button>
            <button onClick={() => { logout(); navigate("/login"); }}>Cerrar sesión</button>
          </div>
        </div>
    </>
  );
};

export default Profile;





