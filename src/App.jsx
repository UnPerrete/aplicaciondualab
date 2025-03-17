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
import ProyectoInfo from './components/ProyectoInfo'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TablaEmpresas />} />
        <Route path="/servicio" element={<Servicios />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/servicio" element={<Servicios />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/seleccionar-servicios" element={<SeleccionarServicios />} />
        <Route path="/seleccionar-servicios" element={<PrivateRoute><SeleccionarServicios /></PrivateRoute>} />
        <Route path="/info-proyecto/:id" element={<PrivateRoute><ProyectoInfo></ProyectoInfo></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
