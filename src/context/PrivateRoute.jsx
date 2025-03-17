import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Evita redirigir antes de que se cargue el usuario
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
