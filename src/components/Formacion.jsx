import React, { useEffect, useState } from 'react';
import NavbarWeb from "./NavbarWeb";
import '../styles/Formacion.css';
import FooterWeb from './FooterWeb';

const Formacion = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
          <NavbarWeb/>
    
          {/* Banner Principal similar a Proyectos */}
          <div className="main-banner2">
            <div className="overlay"></div>
            <h2>Formación</h2>
          </div>
    
          {/* Texto introductorio personalizado para Formación */}
          <div className="intro-text">
            <p>
            Creamos entornos y experiencias de aprendizaje contemporáneos para apoyar el aprendizaje, el crecimiento y 
            la innovación para las intervenciones para lograr objetivos y comprensión para los desafíos futuros.
            </p>
          </div>
    
          <div className="section-container">
          <img
            src="https://cfp.ucm.es/formacionprofesorado/sites/default/files/2024-08/Evaluaci%C3%B3n%20educativa%20Instrumentos%20y%20procedimientos_0.png"
            alt="Profesorado" className= "section-image"
          />
          <div className="section-text">
            <h2>PROFESORADO</h2>
            <h3>Desafíe la forma en que funcionan las cosas hoy, diseñe para el mañana.</h3>
          </div>

          <div className="text-box">
            <p>
                Convertir ideas en prototipos, plataformas, acciones e intervenciones para transformar 
                el estado actual de la sociedad. A través de la fabricación digital, la biología sintética, 
                la inteligencia artificial (IA), el diseño de hardware, el pensamiento computacional, 
                la cadena de bloques y más, el Máster en Diseño para Futuros Emergentes (MDEF) 
                se dedica a ampliar el impacto de las prácticas de los creadores. Vuelva a imaginar cómo el 
                diseño puede ser central para promulgar un cambio de paradigma hacia futuros plurales preferidos. 
                Máster multidisciplinar organizado por el Instituto de Arquitectura Avanzada de Cataluña (IAAC) y 
                ELISAVA Escuela Técnica Superior de Diseño e Ingeniería de Barcelona, en colaboración con el 
                Fab Lab Barcelona y la Fab Academy.
            </p>
          </div>
        </div>

        <div className="section-container">
          <img
            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
            alt="Academia Makemakers" className= "section-image"
          />
          <div className="section-text">
            <h2>ACADEMIA MAKEMAKERS</h2>
            <h3>Una experiencia de aprendizaje práctica y un maestro en creación rápida de prototipos.</h3>
          </div>

          <div className="text-box">
            <p>
            Fab Academy es un programa de fabricación digital dirigido por Neil Gershenfeld del Center For Bits and Atoms del MIT y 
            basado en el curso de creación rápida de prototipos del MIT: Cómo hacer (casi) cualquier cosa. 
            Fab Academy se enfoca en la fabricación personal: prototipos de sus ideas en productos.
            </p>
          </div>

                <div className="imagen-container">
                    <div className="section-image">
                        <img
                            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
                            alt="Proyecto Tecnológico" className= "section-image"
                        />
                        <h1 className="section-title highlighted">Proyecto Tecnológico</h1>
                    </div>

                    <div className="section-image">
                        <img
                            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
                            alt="Talleres" className= "section-image"
                        />
                        <h1 className="section-title">Talleres</h1>
                    </div>

                    <div className="section-image">
                        <img
                            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
                            alt="Desarrollo" className= "section-image"
                        />
                        <h1 className="section-title">Desarrollo</h1>
                    </div>

                    <div className="section-image">
                        <img
                            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
                            alt="Recursos" className= "section-image"
                        />
                        <h1 className="section-title">Recursos</h1>
                    </div>
                </div>

        </div>

        <div className="section-container">
          <img
            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
            alt="Ecoacademy" className= "section-image"
          />
          <div className="section-text">
            <h2>ECOCADEMY</h2>
            <h3>La intersección de textiles, fabricación digital y biología.</h3>
          </div>

          <div className="text-box">
            <p>
            El Posgrado de Fabricademy es un programa intensivo de 6 meses en la intersección de la fabricación digital, 
            los textiles y la biología. El programa explora la interrelación humano-tecnología-medio ambiente a través de las 
            nociones de encarnación, materialidad, ecodiseño, biodiseño, rendimiento, textiles inteligentes y fabricación digital.
            </p>
          </div>
        </div>

        <div className="section-container">
          <img
            src="https://img.freepik.com/vector-premium/concepto-banner-iconos-negocios-creativos-banner-web-idea-proyecto-arte-inicio-innovacion_121070-1043.jpg"
            alt="Jornadas de puertas abiertas" className= "section-image"
          />
          <div className="section-text">
            <h2>JORNADAS DE PUERTAS ABIERTAS</h2>
            <h3>¿Quieres visitarnos?</h3>
            <h3>¡Tours, jornadas de puertas abiertas y otras posibilidades!</h3>
          </div>

          <div className="text-box">
            <p>
            El Posgrado de Fabricademy es un programa intensivo de 6 meses en la intersección de la fabricación digital, 
            los textiles y la biología. El programa explora la interrelación humano-tecnología-medio ambiente a través de las nociones de encarnación, materialidad, ecodiseño, biodiseño, rendimiento, textiles inteligentes y fabricación digital.
            </p>
          </div>
        </div>
    
          <FooterWeb/>
        </div>
      );
};

export default Formacion;