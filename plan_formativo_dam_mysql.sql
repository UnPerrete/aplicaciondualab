USE dualab;
DROP TABLE IF EXISTS desarrollo_aplicaciones_multiplataforma
CREATE TABLE desarrollo_aplicaciones_multiplataforma (
    Bloque CHAR(1) PRIMARY KEY,
    Descripcion TEXT,
    Tareas_A_Realizar TEXT,
    Ejemplos TEXT
);

INSERT INTO desarrollo_aplicaciones_multiplataforma VALUES ('A', 'Gestión de equipos y sistemas', 'Opera entornos de desarrollo.', 'Instalación y configuración de sistemas operativos para desarrollo');
INSERT INTO desarrollo_aplicaciones_multiplataforma VALUES ('B', 'Diseño y manejo de bases de datos', 'Diseño lógico de bases de datos.', 'Diseño de una base de datos para una aplicación de gestión de clientes');
INSERT INTO desarrollo_aplicaciones_multiplataforma VALUES ('C', 'Desarrollo y despliegue de juegos', 'Desarrollo de juegos y aplicaciones de entretenimiento.', 'Creación de un juego de preguntas y respuestas');
INSERT INTO desarrollo_aplicaciones_multiplataforma VALUES ('D', 'Desarrollo y pruebas de interfaz de aplicaciones multiplataforma', 'Aplicaciones en red.', 'Desarrollo de una interfaz responsiva para una app de gestión de tareas');
INSERT INTO desarrollo_aplicaciones_multiplataforma VALUES ('E', 'Implantación de sistemas de gestión de recursos empresariales', 'Gestión de la información', 'Instalación y configuración de Odoo como ERP en una empresa');
