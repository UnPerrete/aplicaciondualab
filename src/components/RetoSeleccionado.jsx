import React from "react";
import { useParams } from "react-router-dom";
import categoriasData from "./data/provisional.json";
import "../styles/RetoSeleccionado.css"; // (opcional) Crea este archivo CSS para estilos
import NavbarWeb from "./NavbarWeb";
import FooterSonia from './FooterSonia';
import ArrowUp from "./ui/ArrowUp";

const RetoSeleccionado = () => {
    const { servicioId } = useParams();

    // Buscar el servicio y su categoría (ciclo formativo) en todos los datos
    let servicioSeleccionado = null;
    let categoriaPadre = null;

    for (const categoria of categoriasData) {
        servicioSeleccionado = categoria.servicios.find(serv => serv.id.toString() === servicioId);
        if (servicioSeleccionado) {
            categoriaPadre = categoria;
            break;
        }
    }

    if (!servicioSeleccionado || !categoriaPadre) {
        return <div>Servicio no encontrado</div>;
    }

    return (
        <div className="detalle-servicio">
            <NavbarWeb />

            <div className="detalle-container">
                <div className="max-w-4xl">
                    {/* Sección de información del servicio específico */}
                    <h1 className="servicio-title">{servicioSeleccionado.titulo}</h1>
                    <div className="ciclo-section">

                            <div className="ciclo-info">
                            <h1>Ciclo Formativo</h1>
                                <h2 className="ciclo-title">{categoriaPadre.ciclo}</h2>
                                <div className="badge-container">
                                    <span className="badge">{categoriaPadre.familiaprofesional}</span>
                                    <span className="badge badge-green">Nivel: {categoriaPadre.nivel}</span>
                                </div>
                                <p className="ciclo-description">{categoriaPadre.descripcion}</p>
                            </div>
                    </div>

                    <div className="descripcion-card">
                        <h2 className="card-title">Descripción del Reto</h2>
                        <p className="ciclo-description">{servicioSeleccionado.descripcion}</p>
                    </div>

                    <div className="info-card">
                            <h2 className="card-title">Información General</h2>
                            <ul className="info-list">
                                <li><strong>Curso:</strong> {servicioSeleccionado.curso}</li>
                                <li><strong>Bloques:</strong> {servicioSeleccionado.bloques}</li>
                                <li><strong>Duración:</strong> {servicioSeleccionado.duracion} semanas</li>
                                <li><strong>Resultado:</strong> {servicioSeleccionado.resultado}</li>
                                <li><strong>Actividad formativa:</strong> {servicioSeleccionado.actividadformativa}</li>
                            </ul>
                        </div>

                        <div className="info-card">
                            <h2 className="card-title">Fases del Reto</h2>
                            <div className="fases-container">
                                {Object.entries(servicioSeleccionado.fases[0]).map(([faseKey, faseData]) => (
                                    <div key={faseKey} className="fase-item">
                                        <div className="fase-head">
                                        <h3 className="fase-title">{faseData[0].nombre}</h3>
                                        <p className="fase-duration">{faseData[0].temporalizacion} semana(s)</p>
                                        </div>
                                        <p className="ciclo-description">Recursos: {faseData[0].recursos}</p>
                                        <p className="ciclo-description">Tareas:</p>
                                        <ul className="fase-tasks">
                                            {faseData[0].tareas.map((tarea, index) => (
                                                <li key={index}>{tarea}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            </div>

            <ArrowUp />
            <FooterSonia/>
        </div>
    );
};


export default RetoSeleccionado;