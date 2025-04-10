// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          inicio: "Inicio",
          retos: "Retos",
          explorar: "Explorar",
          centrosfp: "Centros FP",
          administraciones: "Administraciones",
          proyectos: "Proyectos",
          formacion: "Formación",
          recursos: "Recursos",
          empresas: "Empresas",
          equipo: "El Equipo",
          contacto: "Contacto",
          acceder: "Acceder",
          español: "Español",
          ingles: "Inglés"
        },
      },
      en: {
        translation: {
          inicio: "Home",
          retos: "Challenges",
          explorar: "Explore",
          centrosfp: "FP Centers",
          administraciones: "Administrations",
          proyectos: "Projects",
          formacion: "Training",
          recursos: "Resources",
          empresas: "Companies",
          equipo: "The Team",
          contacto: "Contact",
          acceder: "Login",
          español: "Spanish",
          ingles: "English"
        },
      },
    },
  });

export default i18n;
