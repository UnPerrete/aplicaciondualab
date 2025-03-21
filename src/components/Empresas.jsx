import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CentrosFP.css';
import NavbarWeb from './NavbarWeb';
import FooterWeb from './FooterWeb';

const Empresas = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
            {/* Navbar */}
            <NavbarWeb/>

            {/* Banner Principal */}
            <div className="main-banner3">
                <h2>EMPRESAS</h2>
            </div>

            {/* Botón Ir a Empresas */}
            <Link to="/tablaempresa">
                <button className="boton_empresas">Ver tabla de empresas</button>
            </Link>

            {/* Introducción */}
            <div className="intro-text2">
                <h1>Construyendo una cultura digital sostenible desde dentro</h1>
                <p>Las sesiones de proyectos especializados de Fab Lab Barcelona se concentran en comprender las propuestas de su empresa, descubrir objetivos y desarrollar resultados para estas necesidades. Estas sesiones están seleccionadas para encontrar las mejores respuestas a las preguntas utilizando la mejor gama posible de especialistas talentosos. A las siguientes sesiones asisten líderes en el campo de la fabricación digital, robótica, datos, arquitectura, diseño de productos y más.</p>
            </div>

            {/* ¿Qué ofrecemos? */}
            <div className="section-title2">
                <h2>¿QUÉ OFRECEMOS?</h2>
            </div>

            {/* Programas de Asesoramiento */}
            <div className="contact-content2">
                <div className="card">
                    <img src="https://lh3.googleusercontent.com/rEnS5m_2QC5CEkc_ayMNxhh0jFkiCpYCSJqTgYVvYG9iNPS-tGX8lzx1J_npocn0-Z1ffHsW5Dg_PIrl-1uKEl0oJr-PlQW-CZ6OTme_lp9dRzZNnGNulWB4FzTPnCI4wg=w1280" alt="Programa de Asesoramiento" className="card-img" />
                </div>
                <div className="contact-info2">
                    <h3>Comprender, Diseñar y Prototipar, Especular</h3>
                    <p>El programa de creación de prototipos de Fab Lab Barcelona conecta a las empresas con la investigación de vanguardia en campos prospectivos. Los miembros trabajan directamente con profesores talentosos para:</p>
                    {/* <p>Únete al programa de Fab Lab Barcelona para:</p> */}
                    <ul>
                        <li>Hackatones, sprints de diseño, sesiones de ideación y más.</li>
                        <li>Implementar proyectos innovadores de I+D aplicada y de prototipado rápido.</li>
                        {/* <li>Diseña itinerarios formativos para aprender nuevas herramientas para llevar a tu aula y desarrollar proyectos de investigación.</li> */}
                    </ul>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Experiencias de aprendizaje inmersivo */}
            <div className="contact-content2">
                <div className="card">
                <img src="https://lh3.googleusercontent.com/rEnS5m_2QC5CEkc_ayMNxhh0jFkiCpYCSJqTgYVvYG9iNPS-tGX8lzx1J_npocn0-Z1ffHsW5Dg_PIrl-1uKEl0oJr-PlQW-CZ6OTme_lp9dRzZNnGNulWB4FzTPnCI4wg=w1280" alt="Programa de Asesoramiento" className="card-img" />
                    {/* <img src="https://www.shutterstock.com/image-photo/customer-service-care-patron-protection-600nw-420395281.jpg" alt="Experiencia de aprendizaje inmersivo" className="card-img" /> */}
                </div>
                <div className="contact-info2">
                    <h3>Educación ejecutiva y experiencias de aprendizaje</h3>
                    <p>Únase al Fab Lab Barcelona para conectarse con profesores para seminarios y sesiones de desarrollo profesional centrados en tecnologías emergentes y tendencias de innovación corporativa. Estos programas van desde mesas redondas sobre un tema específico hasta paneles y talleres de exploración de futuros emergentes para equipos de toda su empresa.</p>
                    <p>Comience con un breve programa diseñado a medida para involucrar a los participantes en metodologías creativas contemporáneas en diseño y tecnología críticos. Conocer herramientas innovadoras que permitan la exploración de escenarios futuros emergentes y la búsqueda de nuevas oportunidades y patrones de cambio de lo global a lo local. Los programas de Fab Lab Barcelona ofrecen alfabetización digital, capacitando a los participantes para desarrollar una comprensión del potencial de las tecnologías avanzadas.</p>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Experiencias de aprendizaje inmersivo */}
            <div className="contact-content2">
                <div className="card">
                <img src="https://lh3.googleusercontent.com/rEnS5m_2QC5CEkc_ayMNxhh0jFkiCpYCSJqTgYVvYG9iNPS-tGX8lzx1J_npocn0-Z1ffHsW5Dg_PIrl-1uKEl0oJr-PlQW-CZ6OTme_lp9dRzZNnGNulWB4FzTPnCI4wg=w1280" alt="Programa de Asesoramiento" className="card-img" />
                    {/* <img src="https://www.shutterstock.com/image-photo/customer-service-care-patron-protection-600nw-420395281.jpg" alt="Experiencia de aprendizaje inmersivo" className="card-img" /> */}
                </div>
                <div className="contact-info2">
                    <h3>Red corporativa</h3>
                    <p>A lo largo del año, Fab Lab Barcelona facilita múltiples conferencias, eventos de networking, talleres prácticos y charlas inspiradoras para destacar y ser líderes en investigación, diseño e innovación. Maker Faire Barcelona es una iniciativa coorganizada anualmente por Fab Lab Barcelona y SOKO Tech . Este es un evento de 2 días que incluye más de 100 demostraciones interactivas de prototipos innovadores y nuevas empresas, conferencias magistrales, presentaciones técnicas y talleres prácticos de líderes en tecnología emergente.</p>
                </div>
            </div>

            {/* Línea divisoria */}
            <hr className="section-divider" />

            {/* Footer */}
            <FooterWeb/>
        </div>
    );
};

export default Empresas;
