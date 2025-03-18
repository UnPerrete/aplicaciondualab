import React, { createContext, useState, useContext, useEffect } from "react";

// Se crea un contexto de autenticación para compartir estado entre componentes
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para almacenar el usuario autenticado
  const [user, setUser] = useState(null);
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para manejar la carga inicial (para evitar parpadeos en la UI)
  const [loading, setLoading] = useState(true);

  // 🟢 useEffect para cargar datos del usuario desde localStorage cuando se monta el componente
  useEffect(() => {
    const savedUser = localStorage.getItem("user"); // Obtiene los datos del usuario desde localStorage

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser); // Intenta parsear los datos del usuario
        setUser(parsedUser); // Almacena el usuario en el estado
        setIsAuthenticated(true); // Marca al usuario como autenticado
      } catch (e) {
        console.error("❌ Error al parsear los datos del localStorage:", e);
        localStorage.removeItem("user"); // Elimina los datos corruptos del almacenamiento
      }
    }

    setLoading(false); // Finaliza la carga inicial una vez procesado el almacenamiento
  }, []);

  // 🟢 useEffect para guardar automáticamente los cambios en el usuario en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Guarda el usuario en localStorage
      setIsAuthenticated(true); // Asegura que el usuario se mantenga autenticado
    }
  }, [user]); // Se ejecuta cada vez que `user` cambia

  // 🟢 Función para iniciar sesión
  const login = (userData) => {
    setUser(userData); // Guarda los datos del usuario en el estado
  };

  // 🟢 Función para cerrar sesión
  const logout = () => {
    setUser(null); // Borra los datos del usuario en el estado
    setIsAuthenticated(false); // Marca al usuario como no autenticado
    localStorage.removeItem("user"); // Elimina los datos del usuario del almacenamiento local
  };

  return (
    // Proveedor de contexto que comparte el estado de autenticación con toda la aplicación
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setUser, loading }}>
      {children} {/* Renderiza los componentes hijos dentro del proveedor */}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación de manera más sencilla
export const useAuth = () => useContext(AuthContext);

