import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import Crud from './components/Signup';
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';

function App() {

  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tabla" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>

  )
}

export default App
