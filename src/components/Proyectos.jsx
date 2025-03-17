import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Proyectos.css'

export default function Proyectos( ID ) {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/listProjects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ID)
              });
              setData(await response.json())
        };
        fetchData();
        
    }, []);


  return (
    <>
        <td colSpan="6">
            {data.map((proyecto, index) => (
                <div className='card' key={proyecto.id_proyecto}>
                    <h2 className='titulo'>{proyecto.nombre}</h2>
                    <p className='descripcion'>{proyecto.descripcion}</p>
                    <Link to={"/info-proyecto/"+proyecto.id_proyecto}><button>Ver Proyecto</button></Link>
                </div>
            ))}
        </td>
    </>
  )
}
