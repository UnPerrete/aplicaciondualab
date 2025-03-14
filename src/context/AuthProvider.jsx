import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar la información desde el localStorage cuando la aplicación se monta
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');

    if (savedAuth && savedUser) {
      try {
        setIsAuthenticated(JSON.parse(savedAuth));
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al parsear datos de localStorage:", e);
        // Si hay un error, puedes establecer valores por defecto o limpiar localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Guardar en el localStorage cuando los estados cambian
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  // Función para iniciar sesión
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);


