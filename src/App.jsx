import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servicios from './components/Servicios'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tabla" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
        {/* <Route path="" element={<Servicios />} /> */}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
