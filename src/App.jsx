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
import Proyecto from './components/ProyectosCompletados'
import Contactenos from './components/Contactenos'
import Formacion from './components/Formacion'
import CentrosFP from './components/CentroFP'
import Empresas from './components/Empresas'
import Administraciones from './components/Administraciones'
import Equipo from './components/Equipo'
import Recursos from './components/Recursos'

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/proyect" element={<Proyecto />} />
        <Route path="/contact" element={<Contactenos />} />
        <Route path="/formacion" element={<Formacion />} />
        <Route path="/centrosfp" element={<CentrosFP />} />
        <Route path="/" element={<Empresas />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/administraciones" element={<Administraciones />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tablaempresa" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
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
