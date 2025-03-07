import './App.css'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { TablaEmpresas } from './components/TablaEmpresas'
import Crud from './components/Crud';
import PrivateRoute from './context/PrivateRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    // <AuthProvider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/tabla" element={<PrivateRoute><TablaEmpresas /></PrivateRoute>} />
    //   </Routes>
    // </BrowserRouter>
    // </AuthProvider>
    <>
      <Crud/>
    </>
  )
}

export default App
