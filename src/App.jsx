import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Servicios from './components/Servicios'
import SeleccionarServicios from './components/SeleccionarServicio'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tabla" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
        {/* <Route path="/servicio" element={<PrivateRoute><Servicios /></PrivateRoute>} /> */}
        <Route path="/register" element={<Signup />} />
        <Route path="/servicio" element={<Servicios />} />
        <Route path="/seleccionar-servicios" element={<SeleccionarServicios />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
