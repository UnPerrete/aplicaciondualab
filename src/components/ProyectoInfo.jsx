import React, { use, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ProyectoInfo.css'

export default function ProyectoInfo() {
    const params = useParams();
    const idProyecto = params.id;
    const [proyecto, setProyecto] = useState(null);
    useEffect(() => {
        console.log(params);
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/projectInfo/" + idProyecto);
            setProyecto(await response.json())
            console.log(proyecto);
        };
        fetchData();

    }, [idProyecto]);

    const getEstadoColor = (estado) => {
        const colores = {
            "pendiente": "red",
            "en progreso": "orange",
            "completado": "green"
        };
        return colores[estado.toLowerCase()] || "black";
    };

    return (
        <div className="proyecto">
            {proyecto && proyecto.length > 0 && (
                <div>
                    <h2 className="titulo-proyecto">{proyecto[0].nombre}</h2>
                    <h4 className="titulo-proyecto">{proyecto[0].RazonSocial}</h4>
                    <p className="descripcion-proyecto">{proyecto[0].descripcion}</p>
                    <h3 className="servicios-proyecto">Servicios requeridos:</h3>
                    <ul className="lista-servicios">
                        {proyecto[0].microservicios.map((microservicio, index) => (
                            <li key={index} className='item'>{microservicio}</li>
                        ))}
                    </ul>
                    <p className="fecha-inicio-proyecto">Fecha de inicio: {proyecto[0].fecha_creacion}</p>
                    <p className="estado-proyecto" style={{ color: getEstadoColor(proyecto[0].estado) }}>{proyecto[0].estado}</p>
                </div>
            )}
        </div>
    )
}
