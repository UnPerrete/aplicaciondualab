import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Asegúrate de tener este hook de autenticación

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Realiza la redirección si el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // Redirige a la página de login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  // Si está autenticado, renderiza el contenido de la ruta protegida
  return isAuthenticated ? children : null;
};

export default PrivateRoute;
