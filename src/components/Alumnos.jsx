import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
export default function Alumnos( id_proyecto ) {
  const [data, setData] = useState([]);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const navigate = useNavigate();
  const id_profesor = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/listStudents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProfesor: id_profesor }),
      });
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);

  // Manejo de selección
  const handleSelect = (event) => {
    const selectedValue = parseInt(event.target.value);

    // Buscar el alumno seleccionado
    const selectedAlumno = data.find(alumno => alumno.id === selectedValue);

    // Actualizar estados
    if (selectedAlumno) {
      setSelectedAlumnos([...selectedAlumnos, selectedAlumno]);
      setData(data.filter(alumno => alumno.id !== selectedValue));
    }
  };

  // Manejo de eliminación y reubicación
  const handleRemove = (id) => {
    const alumnoEliminado = selectedAlumnos.find(alumno => alumno.id === id);

    if (alumnoEliminado) {
      setSelectedAlumnos(selectedAlumnos.filter(alumno => alumno.id !== id));
      setData([...data, alumnoEliminado]);
    }
  };

  const handleSubmit = async (e) => {
    selectedAlumnos.map(async (alumno, index) => {
      await fetch("http://localhost:5000/api/asignarproyecto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_proyecto: id_proyecto.id_proyecto, id_alumno: alumno.id }),
      });
    });
    navigate('/');
  }

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">Selecciona un alumno</option>
        {data.map((alumno, index) => (
          <option key={index} value={alumno.id}>
            {alumno.nombre} {alumno.apellido}
          </option>
        ))}
      </select>

      <h3>Alumnos seleccionados:</h3>
      <ul>
        {selectedAlumnos.map((alumno, index) => (
          <li key={index}>
            {alumno.nombre} {alumno.apellido}
            <button onClick={() => handleRemove(alumno.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Aceptar Solicitud</button>
    </div>
  );
}
