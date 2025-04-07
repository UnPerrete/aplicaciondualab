import '../styles/Equipo.css';
import React from 'react';
import NavbarWeb from './NavbarWeb';
import FooterSonia from './FooterSonia';
import ArrowUp from './ui/ArrowUp';
import InfoB from './ui/Info';

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
                        <img src="../src/assets/lider.png" alt="Equipo" className="team-image" />
                        <p className="team-caption">Un objetivo fundamental</p>
                    </div>
                </div>

                <div className="description-section">
                    <h3>Este es nuestro equipo</h3>
                    <p>Un equipo humilde, trabajador, pobres con dinero, autodidacta.</p>
                    <div className="team-section">
                        <img src="../src/assets/equipo.png" alt="Equipo" className="team-image" />
                        <p className="team-caption">Pedazo de equipo</p>
                    </div>
                </div>

                <div className="team-grid">
                {Array(6).fill().map((_, index) => (
                    <div key={index} className="team-member">
                    <div className="member-image">
                        {index === 0 && (
                        <img src="../src/assets/PERRO.jpg" alt="Foto del miembro del equipo" className="member-image"/>
                        )}
                        {index === 1 && (
                        <img src="../src/assets/Calvoo.jpg" alt="Foto del miembro del equipo" className="member-image"/>
                        )}
                    </div>
                    <p>{index === 0 ? 'Obama' : index === 1 ? 'Gonzalo' : '[Nombre]'}</p>
                    </div>
                ))}
                </div>

                <div className="team-join">
                    <h3>Únete al equipo</h3>
                    <p>Describe brevemente qué cualidades deben tener tus compañeros.</p>
                    <button className="join-button">Enviar solicitud</button>
                </div>
            </div>
            <ArrowUp/>
            <InfoB/>
            <FooterSonia/>
        </div>
    );
};

export default Equipo;
