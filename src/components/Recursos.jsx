import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import NavbarWeb from "./NavbarWeb";
import '../styles/Recursos.css';
import FooterSonia from './FooterSonia';
import ArrowUp from './ui/ArrowUp';
import InfoB from './ui/Info';
import { Link } from 'react-router-dom';

const Recursos = () => {

    const [projects, setProjects] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/listFinishedProjects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/data");
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchProjects();
        fetchCompanies();
    }, []);

    return (
        <div>
            <NavbarWeb />

            {/* Banner Principal */}
            <div className="main-banner5">
                <div className="overlay"></div>
                <h2>Recursos</h2>
            </div>

            {/* Nuevo Apartado */}
            <div className="section-text">
                <h1>Creación de Entornos de Aprendizaje</h1>
                <p>Creemos entornos y experiencias de aprendizaje contemporáneos para apoyar el aprendizaje, el crecimiento y la innovación para las intervenciones futuras.</p>
            </div>

            <div className="section-container">
                <h1>GUÍAS</h1>
                <div className="section-text">
                    <h3>Máquina SPML</h3>
                    <p>Máquina portátil de código abierto para tareas múltiples, inspirada en mini máquinas CNC.</p>
                    <Link to="/descargar/spml">Descargar Guía</Link>
                </div>
            </div>

            <div className="section-container">
                <h1>MANUALES</h1>
                <div className="section-text">
                    <h3>Detección Ciudadana</h3>
                    <p>Herramientas para crear tecnología que aborde problemas ambientales utilizando recursos accesibles y sostenibles.</p>
                    <Link to="/descargar/deteccion">Descargar Manual</Link>
                </div>
            </div>

            <div className="section-container">
                <h1>TÍTULOS FP</h1>
                <div className="section-text">
                    <h3>Ciclos Formativos de Grado Básico, Medio y Superior en Canarias</h3>
                    <p>A través del siguiente enlace podrá consultar la información sobre los distintos tipos de ciclos y sus grados en Canarias.</p>
                    <Link to="https://www.gobiernodecanarias.org/educacion/web/formacion_profesional/ensenanzas/titulos/">Ver títulos</Link>
                </div>
            </div>

            <div className="section-container">
                <h1>PROYECTOS COMPLETADOS</h1>
                <div className="card-gridd" style={{ maxWidth: '1600px', margin: 'auto' }}>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <Card key={index} className="cardd">
                                <img src={project.imagen || ""} alt={project.nombre} className="cardd-img" />
                                <CardContent>
                                    <h3>{project.nombre}</h3>
                                    <p>{project.descripcion}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p>No hay proyectos disponibles.</p>
                    )}
                </div>
            </div>

            <div className="section-container">
                <h1>BASES DE DATOS DE EMPRESAS</h1>
                {companies.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Comercial</th>
                                <th>Sector</th>
                                <th>Actividad</th>
                                <th>Municipio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.slice(0, 5).map((company) => (
                                <tr key={company.ID}>
                                    <td>{company.NombreComercial}</td>
                                    <td>{company.Sector}</td>
                                    <td>{company.Actividad}</td>
                                    <td>{company.Municipio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
                <Link to="/tablaempresa">Ver todas las empresas</Link>
            </div>

            <ArrowUp/>
            <InfoB/>
            <FooterSonia />
        </div>
    );
};

export default Recursos;
