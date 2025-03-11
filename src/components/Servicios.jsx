import React, { useState } from "react";
import '../styles/Servicios.css';
import categorias from "./data/servicios.json"

const categorias = [
  {
    titulo: "INFORMÁTICA Y COMUNICACIONES",
    imagen: "../src/assets/Inf.png",
    descripcion:
      "La FP de Informática y Comunicaciones forma profesionales en el desarrollo, administración y mantenimiento de sistemas informáticos y redes. Incluye programación, ciberseguridad, soporte técnico y gestión de bases de datos, preparándolos para entornos digitales y tecnológicos en constante evolución.",
    servicios: [
      "Desarrollo y mantenimineto de software",
      "Administración de sistemas informáticos",
      "Ciberseguridad y protección de datos",
      "Soporte técnico y asistencia informática",
      "Redes y telecomunicaciones",
      "Desarrollo web y aplicaciones móviles",
      "Virtualización y computación en la nube",
      "Análisis y gestión de bases de datos",
      "Automatización y scripting",
      "Diseño y administración de infraestructuras TI",
      "Gestión de proyectos tecnológicos",
      "Inteligencia artificial y aprendizaje automático",
      "Gestión y configuración de hardware",
      "Optimización del rendimiento de sistemas",
      "Implementación de soluciones IoT",
      "Administración de servidores y almacenamiento",
      "Seguridad en redes y auditorías de sistemas",
      "Diseño y mantenimiento de páginas web",
      "Monitorización y soporte en centros de datos",
      "Administración de entornos multiplataforma",
      "Seguridad informática",
      "Big Data y análisis de datos",
      "Soporte técnico"
    ]
  },
  {
    titulo: "IMAGEN Y SONIDO",
    imagen: "../src/assets/Img.jpg",
    descripcion:
      "La FP de Imagen y Sonido forma profesionales en la producción audiovisual, el diseño de sonido y la postproducción. Abarca áreas como fotografía, cine, televisión, radio y animación digital, combinando creatividad con tecnología para la creación de contenido multimedia.",
    servicios: [
      "Edición de video",
      "Producción multimedia",
      "Diseño de efectos visuales",
      "Sonido y postproducción",
      "Producción audiovisual",
      "Edición y postproducción de video",
      "Montaje cinematográfico",
      "Diseño y creación de efectos visuales",
      "Grabación y mezcla de sonido",
      "Producción musical y sonorización",
      "Fotografía profesional",
      "Animación digital y 3D",
      "Dirección de proyectos audiovisuales",
      "Operación de cámaras y equipos de grabación",
      "Iluminación en producciones audiovisuales",
      "Streaming y retransmisión en directo",
      "Creación de contenido multimedia",
      "Realización de televisión y radio",
      "Diseño gráfico aplicado al audiovisual"
    ]
  },
  {
    titulo: "ADMINISTRACIÓN Y GESTIÓN",
    imagen: "../src/assets/Adm.jpg",
    descripcion:
      "La FP de Administración y Gestión forma profesionales en la organización y gestión de empresas, abarcando contabilidad, finanzas, recursos humanos, gestión documental y atención al cliente. Prepara para trabajar en entornos administrativos, optimizando procesos y asegurando el correcto funcionamiento de una empresa.",
    servicios: [
      "Consultoría de negocios",
      "Planificación estratégica",
      "Marketing y ventas",
      "Gestión financiera",
      "Atención al cliente y comunicación empresarial",
      "Gestión de recursos humanos",
      "Organización y archivo documental",
      "Gestión de compras y proveedores",
      "Facturación y cobros",
      "Gestión fiscal y tributaria",
      "Control de stock e inventarios",
      "Elaboración de informes y análisis de datos",
      "Administración de software de gestión empresarial",
      "Tramitación de documentación legal y laboral",
      "Planificación y control de proyectos",
      "Soporte en comercio internacional",
      "Gestión de riesgos y seguros"
    ]
  },
  {
    titulo: "COMERCIO Y MARKETING",
    imagen: "../src/assets/ComMar.jpg",
    descripcion:
      "La FP de Comercio y Marketing forma profesionales especializados en la gestión comercial, ventas, estrategias de marketing y atención al cliente. Prepara para desempeñar funciones en el ámbito del comercio nacional e internacional, publicidad, investigación de mercados y comercio digital, combinando conocimientos teóricos con formación práctica para adaptarse a las necesidades del mercado actual.",
    servicios: [
        "Atención al cliente",
        "Gestión de ventas",
        "Estrategias de marketing",
        "Comercio internacional",
        "Publicidad y comunicación",
        "Investigación de mercados",
        "Logística y distribución",
        "Gestión de redes sociales",
        "Comercio electrónico",
        "Branding y posicionamiento de marca",
        "Merchandising y escaparatismo",
        "Fidelización de clientes",
        "Análisis de datos comerciales",
        "Creación de campañas promocionales",
        "Organización de eventos comerciales"
    ]
  },
  {
    titulo: "ARTES GRÁFICAS",
    imagen: "../src/assets/ArtGra.png",
    descripcion:
    "La FP de Artes Gráficas forma profesionales en el diseño, producción y gestión de materiales gráficos, incluyendo impresión, preimpresión, edición digital y packaging. Combina creatividad con tecnología para la comunicación visual y la industria gráfica.",
    servicios: [
        "Diseño gráfico y comunicación visual",
        "Producción e impresión digital",
        "Maquetación y preimpresión",
        "Diseño y producción de envases y packaging",
        "Creación de identidad corporativa",
        "Rotulación y señalética",
        "Edición y producción editorial",
        "Gestión y tratamiento de imágenes",
        "Impresión en gran formato",
        "Producción de publicidad impresa",
        "Serigrafía y estampación",
        "Producción de catálogos y revistas",
        "Diseño de etiquetas y envoltorios",
        "Creación de ilustraciones digitales",
        "Gestión de color y acabados gráficos"
    ]
  },
  {
    titulo: "HOSTELERÍA Y TURISMO",
    imagen: "../src/assets/HosTur.png",
    descripcion:
    "La FP de Hostelería y Turismo prepara profesionales en la gestión de alojamientos, restauración, agencias de viajes y organización de eventos, combinando atención al cliente, administración y promoción turística.",
    servicios: [
        "Gestión hotelera y alojamiento",
        "Atención al cliente en turismo y restauración",
        "Organización de eventos y congresos",
        "Guía turístico y animación sociocultural",
        "Gastronomía y cocina profesional",
        "Servicio de bar y cafetería",
        "Administración en agencias de viajes",
        "Reservas y planificación de itinerarios",
        "Seguridad e higiene en hostelería",
        "Marketing y promoción turística",
        "Turismo sostenible y ecoturismo"
    ]
  },
  {
    titulo: "INSTALACIÓN Y MANTENIMIENTO",
    imagen: "../src/assets/InsMan.png",
    descripcion:
    "La FP de Instalación y Mantenimiento forma profesionales en el montaje, mantenimiento y reparación de sistemas industriales, equipos mecánicos, térmicos y redes de fluidos, asegurando su correcto funcionamiento y eficiencia.",
    servicios: [
        "Instalación y mantenimiento de sistemas industriales",
        "Montaje y reparación de maquinaria",
        "Gestión de redes de climatización y ventilación",
        "Mantenimiento preventivo y correctivo",
        "Automatización y control de procesos",
        "Instalación de sistemas hidráulicos y neumáticos",
        "Electricidad y electrónica aplicada",
        "Montaje y ajuste de estructuras metálicas",
        "Revisión de sistemas de seguridad industrial",
        "Supervisión de redes de abastecimiento y saneamiento"
    ]
  },
  {
    titulo: "ELECTRICIDAD Y ELECTRÓNICA",
    imagen: "../src/assets/Elec.png",
    descripcion:
    "La FP de Electricidad y Electrónica forma profesionales en la instalación, mantenimiento y reparación de sistemas eléctricos, electrónicos y automatizados, esenciales en sectores industriales y tecnológicos.",
    servicios: [
        "Instalación y mantenimiento de redes eléctricas",
        "Automatización y control industrial",
        "Montaje y reparación de sistemas electrónicos",
        "Domótica y edificios inteligentes",
        "Energías renovables y eficiencia energética",
        "Instalaciones de telecomunicaciones",
        "Electrónica aplicada y microprocesadores",
        "Sistemas de seguridad y videovigilancia",
        "Mantenimiento de maquinaria eléctrica",
        "Diseño y montaje de circuitos electrónicos"
    ]
  },
  {
    titulo: "TRANSPORTE Y MANTENIMIENTO DE VEHÍCULOS",
    imagen: "../src/assets/Trans.png",
    descripcion:
    "La FP de Transporte y Mantenimiento de Vehículos forma profesionales en la reparación, mantenimiento y gestión de sistemas de automoción, garantizando el correcto funcionamiento y seguridad de los vehículos.",
    servicios: [
        "Mantenimiento y reparación de vehículos",
        "Diagnóstico de sistemas mecánicos y electrónicos",
        "Electricidad y electrónica del automóvil",
        "Gestión de talleres y servicio postventa",
        "Sistemas de transmisión y frenos",
        "Alineación y equilibrado de ruedas",
        "Instalación de accesorios y climatización",
        "Carrocería y pintura de automóviles",
        "Mantenimiento de vehículos industriales y pesados",
        "Sistemas de inyección y combustibles"
    ]
  },
  {
    titulo: "ACTIVIDADES FISICAS Y DEPORTIVAS",
    imagen: "../src/assets/FisDep.png",
    descripcion:
    "La FP de Actividades Físicas y Deportivas capacita profesionales en la planificación, ejecución y gestión de programas deportivos, entrenamientos y actividades físicas para el bienestar y rendimiento.",
    servicios: [
        "Entrenamiento personal y planificación deportiva",
        "Animación y dinamización de actividades físicas",
        "Gestión y organización de eventos deportivos",
        "Educación física y recreación",
        "Prevención y recuperación de lesiones",
        "Actividades en el medio natural",
        "Monitores de fitness y musculación",
        "Iniciación deportiva y formación de base",
        "Técnicas de relajación y bienestar",
        "Coaching deportivo y motivación"
    ]
  },
  {
    titulo: "AGRARIA",
    imagen: "../src/assets/Agra.png",
    descripcion:
    "La FP Agraria forma profesionales en la producción, gestión y sostenibilidad de cultivos, ganadería y medio ambiente, optimizando los recursos naturales y tecnológicos del sector.",
    servicios: [
       "Producción y gestión de cultivos",
      "Manejo y cuidado de explotaciones ganaderas",
      "Agricultura ecológica y sostenible",
      "Gestión de recursos hídricos y riego",
      "Mantenimiento de maquinaria agrícola",
      "Control de plagas y sanidad vegetal",
      "Gestión forestal y medioambiental",
      "Comercialización de productos agroalimentarios",
      "Paisajismo y jardinería",
      "Técnicas de biotecnología agrícola"
    ]
  },

  /*{
     titulo: "",
     imagen: "../src/assets/",
     descripcion:
     "",
     servicios: [
        
     ]
  },*/
];

const Inicio = () => {
  const [desplegados, setDesplegados] = useState([]);

  const toggleDesplegable = (index) => {
    setDesplegados((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index) // Cierra la lista si ya está abierta
        : [...prev, index] // Agrega la lista si no está abierta
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        En esta sección, podrá conocer nuestras principales áreas de especialización y los servicios que ofrecemos en cada una.
        Cada apartado incluye un desplegable con más detalles sobre los servicios disponibles. <br />
        ¡Explore y descubra cómo podemos ayudarle!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categorias.map((categoria, index) => (
          <div key={index} className="text-center">
            <img src={categoria.imagen} alt={categoria.titulo} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">{categoria.titulo}</h2>
            <p className="mt-2 text-gray-600">{categoria.descripcion}</p>
            <button
              className="mt-2 text-blue-500 flex items-center justify-center"
              onClick={() => toggleDesplegable(index)}
            >
              {desplegados.includes(index) ? "Servicios ▴" : "Servicios ▾"}
            </button>
            {desplegados.includes(index) && (
              <ul className="mt-2 text-gray-700 text-left mx-auto w-4/5">
                {categoria.servicios.map((servicio, i) => (
                  <li key={i} className="text-sm">{servicio}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
