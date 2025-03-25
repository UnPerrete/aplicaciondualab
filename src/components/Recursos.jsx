import React, { useEffect, useState } from 'react';
import NavbarWeb from "./NavbarWeb";
import '../styles/Recursos.css';
import FooterWeb from './FooterWeb';
import ArrowUp from './ui/ArrowUp';

const Recursos = () => {
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
                <p>Creemos entornos y experiencias de aprendizaje contemporáneos para apoyar el aprendizaje, el crecimiento y la innovación para las intervenciones para lograr objetivos y comprensión para los desafíos futuros.</p>
            </div>

            {/* Sección Guías */}
            <div className="section-container">
                <div className="section-image">
                    {/* <img src={GuiaImage} alt="Guías" /> */}
                    <h1>GUÍAS</h1>
                </div>
                <div className="section-text">
                    <h3>Máquina SPML</h3>
                    <p>La Máquina SPML (Simple Personal Mini Lab o Six Pack Mobile Lab) es una máquina portátil de código abierto diseñada por Fab Lab Barcelona. Este dispositivo multi-herramienta permite realizar tareas durante el confinamiento por COVID-19 con un costo aproximado de 60 €. Inspirado en mini máquinas CNC creadas a partir de reproductores de DVD reciclados.</p>
                </div>
            </div>

            {/* Sección Manuales */}
            <div className="section-container">
                <div className="section-image">
                    {/* <img src={ManualImage} alt="Manuales" /> */}
                    <h1>MANUALES</h1>
                </div>
                <div className="section-text">
                    <h3>Detección Ciudadana: Un Conjunto de Herramientas</h3>
                    <p>Estas herramientas permiten a las comunidades locales usar hardware y software de código abierto para crear tecnología que aborde problemas ambientales relacionados con aire, agua, suelo y contaminación acústica. Desarrolladas para fomentar la innovación desde la base, utilizando recursos accesibles y sostenibles.</p>
                </div>
            </div>

            <hr className="section-divider" />
            <ArrowUp/>
            <div>
                <FooterWeb />
            </div>
            
        </div>
    );
};

export default Recursos;
