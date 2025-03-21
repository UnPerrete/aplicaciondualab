import React from 'react';
import '../styles/CentrosFP.css';
import NavbarWeb from './NavbarWeb';
import FooterWeb from './FooterWeb';

const Administraciones = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
            {/* Navbar */}
            <NavbarWeb/>

            {/* Banner Principal */}
            <div className="main-banner3">
                <h2>ADMINISTRACIONES</h2>
            </div>

            {/* Introducción */}
            <div className="intro-text2">
                <h1>Packs de consultoría y asesoramiento para las ciudades del futuro</h1>
                <p>Únete al programa de Fab Lab Barcelona para participar en programas de consultoría y asesoramiento. Todos los programas personalizados se centran en las preguntas exploratorias y los objetivos de política de su institución gubernamental. A las sesiones asisten líderes de la Iniciativa Global Fab City.</p>
            </div>

            {/* ¿Qué ofrecemos? */}
            <div className="section-title2">
                <h2>¿QUÉ OFRECEMOS?</h2>
            </div>

            {/* Programas de Asesoramiento */}
            <div className="contact-content2">
                <div className="card">
                    {/* <img src="https://www.shutterstock.com/image-photo/customer-service-care-patron-protection-600nw-420395281.jpg" alt="Programa de Asesoramiento" className="card-img" /> */}
                </div>
                <div className="contact-info2">
                    <h3>Programas de Asesoramiento</h3>
                    <p>Los programas de Fab Lab Barcelona están diseñados para ayudar a los gobiernos locales a comprender: qué son los Fab Labs y cómo funcionan para poder implementar su propio proyecto Fab Lab dentro del marco estratégico de Fab City Global Initiative. La Iniciativa Global Fab City se dedica a comprender cómo fomentar un cambio del paradigma industrial de Product-in Trash-out y apoyar el regreso de la fabricación a las ciudades con el apoyo de un modelo urbano de Data-in Data-out. Esta iniciativa acoge una red de 34 ciudades y un colectivo , regida por la Fundación Fab. Fab City Global Initiative está trabajando para hacer que las ciudades y los ciudadanos sean productivos localmente y estén conectados globalmente.</p>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Footer */}
            <FooterWeb/>
        </div>
    );
};

export default Administraciones;