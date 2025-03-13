import React, { useEffect, useState } from 'react';
import '../styles/Proyectos.css'

export default function Proyectos( ID ) {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/projectData", {
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
                <div className='card'>
                    <h2 className='titulo'>{proyecto.nombre}</h2>
                    <p className='descripcion'>{proyecto.descripcion}</p>
                    <h4 >Microservicios:</h4>
                    <ul className='list'>
                    {proyecto.microservicios.map((microservicio, index) => (
                        <li key={index} className='item'>{microservicio}</li>
                    ))}
                    </ul>
                </div>
            ))}
        </td>
    </>
  )
}
