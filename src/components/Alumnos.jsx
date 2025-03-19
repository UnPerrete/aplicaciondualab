import { useState, useEffect } from "react";

export default function Alumnos() {
  const [data, setData] = useState([]);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
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
    const selectedValue = event.target.value;

    // Buscar el alumno seleccionado
    const selectedAlumno = data.find(alumno => alumno.nombre === selectedValue);

    // Actualizar estados
    if (selectedAlumno) {
      setSelectedAlumnos([...selectedAlumnos, selectedAlumno]);
      setData(data.filter(alumno => alumno.nombre !== selectedValue));
    }
  };

  // Manejo de eliminación y reubicación
  const handleRemove = (nombre) => {
    const alumnoEliminado = selectedAlumnos.find(alumno => alumno.nombre === nombre);

    if (alumnoEliminado) {
      setSelectedAlumnos(selectedAlumnos.filter(alumno => alumno.nombre !== nombre));
      setData([...data, alumnoEliminado]);
    }
  };

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">Selecciona un alumno</option>
        {data.map((alumno, index) => (
          <option key={index} value={alumno.nombre}>
            {alumno.nombre} {alumno.apellido}
          </option>
        ))}
      </select>

      <h3>Alumnos seleccionados:</h3>
      <ul>
        {selectedAlumnos.map((alumno, index) => (
          <li key={index}>
            {alumno.nombre} {alumno.apellido}
            <button onClick={() => handleRemove(alumno.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
