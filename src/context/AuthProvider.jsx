import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor para el contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  const login = () => {
    setIsAuthenticated(true);

    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };
  const logout = () => {
    setIsAuthenticated(false);

    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
