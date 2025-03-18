import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Servicios from './components/Servicios'
import Profile from './components/Profile'
import SeleccionarServicios from './components/SeleccionarServicio'
import Proyectos from './components/Proyectos'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
        <Route path="/servicio" element={<PrivateRoute><Servicios /></PrivateRoute>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/seleccionar-servicios" element={<PrivateRoute><SeleccionarServicios /></PrivateRoute>} />
        <Route path="/info-proyecto/:id" element={<PrivateRoute><Proyectos></Proyectos></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
