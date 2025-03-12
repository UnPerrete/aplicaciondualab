import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Crud from './components/Signup';
import Servicios from './components/Servicios'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/tabla" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
        <Route path="/" element={<Servicios />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
