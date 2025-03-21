import '../styles/Equipo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarWeb from './NavbarWeb';

const Equipo = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
            {/* Navbar */}
            <NavbarWeb/>
            <div className="team-page">
                <div className="team-banner">
                    <h2>¿Qué es lo que hace que tu equipo luche por un objetivo común?</h2>
                    <p>Descríbelo en una o dos frases.</p>
                </div>

                <div className="leadership-section">
                    <h3>Liderazgo</h3>
                    <p>¿Quién lidera el equipo? Describe al fundador o a los miembros del equipo que actúen como líderes.</p>
                    <div className="team-section">
                        <img src="https://via.placeholder.com/600x400" alt="Equipo" className="team-image" />
                        <p className="team-caption">Subtítulo de la foto de equipo</p>
                    </div>
                </div>

                <div className="description-section">
                    <h3>Este es nuestro equipo</h3>
                    <p>Escribe una breve descripción del equipo.</p>
                    <div className="team-section">
                        <img src="https://via.placeholder.com/600x400" alt="Equipo" className="team-image" />
                        <p className="team-caption">Subtítulo de la foto de equipo</p>
                    </div>
                </div>

                <div className="team-grid">
                    {Array(6).fill().map((_, index) => (
                        <div key={index} className="team-member">
                            <div className="member-image"></div>
                            <p>[Nombre]</p>
                        </div>
                    ))}
                </div>

                <div className="team-join">
                    <h3>Únete al equipo</h3>
                    <p>Describe brevemente qué cualidades deben tener tus compañeros.</p>
                    <button className="join-button">Enviar solicitud</button>
                </div>

                <div className="team-footer">
                    <p>info@viaoptima.es | Calle Juan de Quesada 22 Las Palmas G.C. | 659 02 16 03</p>
                </div>
            </div>
        </div>
    );
};

export default Equipo;
