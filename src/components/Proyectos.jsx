import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Proyectos.css'

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
            {data.length > 0 ? (
                data.map((proyecto) => (
                    <div className='card' key={proyecto.id_proyecto}>
                        <h2 className='titulo'>{proyecto.nombre}</h2>
                        <p className='descripcion'>{proyecto.descripcion}</p>
                    </div>
                ))
            ) : (
                <div className='card'>
                    <p className='descripcion'>No hay proyectos disponibles para esta empresa.</p>
                </div>
            )}
            <Link to={"/"}><button>Volver</button></Link>
        </>
    )
}
