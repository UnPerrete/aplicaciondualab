import React from 'react';
import '../styles/CentrosFP.css';
import NavbarWeb from './NavbarWeb';
import FooterWeb from './FooterWeb';

const CentrosFP = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
            {/* Navbar */}
            <NavbarWeb/>

            {/* Banner Principal */}
            <div className="main-banner3">
                <h2>CENTROS DE F.P.</h2>
            </div>

            {/* Introducción */}
            <div className="intro-text2">
                <h1>Formas atractivas de modelos educativos y de aprendizaje</h1>
                <p>Los proyectos personalizados se centran en desarrollar y explorar las preguntas y los objetivos educativos de su institución educativa. A las sesiones asisten líderes de nuestra Unidad de Aprendizaje Futuro interna.</p>
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
                    <p>Los cambios significativos en las innovaciones digitales y tecnológicas en las sociedades, políticas y economías europeas, junto con los cambios demográficos y del mercado laboral, están poniendo los sistemas de enseñanza-aprendizaje en primera línea como métodos educativos para adaptarse a las nuevas realidades.</p>
                    <p>Únete al programa de Fab Lab Barcelona para:</p>
                    <ul>
                        <li>Recibe sesiones de formación para tus profesores en herramientas y técnicas innovadoras en el FabLab.</li>
                        <li>Entiende y fomenta la cultura Maker dentro de tu institución.</li>
                        <li>Diseña itinerarios formativos para aprender nuevas herramientas para llevar a tu aula y desarrollar proyectos de investigación.</li>
                    </ul>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Experiencias de aprendizaje inmersivo */}
            <div className="contact-content2">
                <div className="card">
                    {/* <img src="https://www.shutterstock.com/image-photo/customer-service-care-patron-protection-600nw-420395281.jpg" alt="Experiencia de aprendizaje inmersivo" className="card-img" /> */}
                </div>
                <div className="contact-info2">
                    <h3>Experiencias de aprendizaje inmersivo</h3>
                    <p>Comience con un breve curso personalizado para involucrar a los estudiantes y profesores en nuevas formas de aprendizaje y modelos educativos. Desarrollamos y enseñamos metodologías creativas contemporáneas en un entorno innovador para explorar escenarios educativos emergentes.</p>
                    <p>Los programas de Fab Lab Barcelona capacitan a los participantes con herramientas de alfabetización digital para fomentar su comprensión de las tecnologías avanzadas.</p>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Footer */}
            <FooterWeb/>
        </div>
    );
};

export default CentrosFP;
