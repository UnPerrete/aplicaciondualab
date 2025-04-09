import React from "react";
import '../styles/InfoPag.css';
import mesa from "../assets/mesa.png";
import exp from "../assets/explicando.png";
import sen from "../assets/sentao.png";
import top from "../assets/top.png";

export default function InfoPag() {
  return (
    <div>
      <img src={top} alt="Top banner" className="top-banner" />

      <section className="section">
        <div>
          <img src={mesa} alt="Mesa de trabajo" className="mesa" />
        </div>
        <div className="section-text">
          <h2>Creación y diseño de Microproyectos</h2>
          <p>
            El programa de formación en prácticas está basado en la participación en microproyectos diseñados a partir del diagnóstico de necesidades reales del tejido empresarial canario.
          </p>
          <p>
            Con la cooperación y colaboración de tutores expertos y las empresas para desarrollar microproyectos y acciones reales, implementables y medibles.
          </p>
          <p>
            Permitiendo documentar, compartir y medir el resultado de las acciones realizadas y objetivos alcanzados.
          </p>
          <p>
            Incluyendo planes formativos, tutorizaciones y el uso de recursos y herramientas del entorno empresarial.
          </p>
          <button className="button">Más Información</button>
        </div>
      </section>

      <section className="section">
        <div className="section-text">
          <h2>Prácticas Aula + Empresa con ABR</h2>
          <p>El programa de prácticas rompe el modelo tradicional.</p>
          <p>
            El alumnado asume <strong>retos reales</strong> propuestos por las empresas, con acompañamiento docente y tutores empresariales.
          </p>
          <p>
            Desarrollando <strong>competencias clave</strong>, resolviendo problemas y necesidades reales del tejido empresarial y creando soluciones de impacto.
          </p>
          <button className="button">Más Información</button>
        </div>
        <div>
          <img src={exp} alt="Explicando en pantalla" />
        </div>
      </section>

      <section className="section">
        <div>
          <img src={sen} alt="Personas sentadas trabajando" />
        </div>
        <div className="section-text">
          <h2>El Aula DuaLab</h2>
          <p>Un espacio físico y virtual para trabajar, compartir y colaborar.</p>
          <p>
            Un <strong>Hub Creativo</strong> abierto a la comunidad educativa, las empresas y los alumnos.
          </p>
          <p>
            Promoviendo el emprendimiento, la innovación sostenible y el aprendizaje colaborativo.
          </p>
          <p>
            Diseñando eventos de transferencia de conocimientos y <strong>Planes Formativos</strong>.
          </p>
          <button className="button">Más Información</button>
        </div>
      </section>
    </div>
  );
}
