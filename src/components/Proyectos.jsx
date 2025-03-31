import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alumnos from './Alumnos';
import '../styles/Proyectos.css'
import NavbarWeb from './NavbarWeb';

export default function Proyectos() {
    const [data, setData] = useState([])
    const params = useParams();
    const idEmpresa = params.id;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/listProjects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ID: idEmpresa })
            });
            setData(await response.json())
        };
        fetchData();

    }, []);


    return (
        <>
        <NavbarWeb/>
            {data.length > 0 ? (
                data.map((proyecto) => (
                    <div className='card' key={proyecto.id_proyecto}>
                        <h2 className='titulo'>{proyecto.nombre}</h2>
                        <p className='descripcion'>{proyecto.descripcion}</p>
                        <Alumnos id_proyecto={proyecto.id_proyecto} />
                    </div>
                ))
            ) : (
                <div className='card'>
                    <p className='descripcion'>No hay proyectos disponibles para esta empresa.</p>
                </div>
            )}
            <Link to={"/tablaempresa"}><button>Volver</button></Link>
        </>
    )
}
