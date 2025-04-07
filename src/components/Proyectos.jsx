import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alumnos from './Alumnos';
import '../styles/Proyectos.css'
import NavbarWeb from './NavbarWeb';
import FooterSonia from './FooterSonia';
import { useAuth } from "../context/AuthProvider";

export default function Proyectos() {
    const [data, setData] = useState([])
    const params = useParams();
    const {user} = useAuth();
    const id = params.id != 0 ? params.id : user.id;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/listProjects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ID: id, role: user.role })
            });
            setData(await response.json());
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
                        {proyecto.estado !== "pendiente" ? (
                            <ul>
                                {proyecto.colaboradores.map( (colaborador) => (
                                    <li>{colaborador}</li>
                                ) )}
                            </ul>
                        ) : (<Alumnos id_proyecto={proyecto.id_proyecto} />)}
                    </div>
                ))
            ) : (
                <div className='card'>
                    <p className='descripcion'>No hay proyectos disponibles para esta empresa.</p>
                </div>
            )}
            <Link to={"/tablaempresa"}><button>Volver</button></Link>
            <FooterSonia/>
        </>
    )
}
