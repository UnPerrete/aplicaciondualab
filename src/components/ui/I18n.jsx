// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; 

i18n
  .use(LanguageDetector) // 👈 Usar detector de idioma
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // por si no detecta nada
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          // Navbar
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
          // Navbar
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
    detection: {
      order: ['navigator', 'htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'], // guarda el idioma para siguientes visitas
    }
  });

export default i18n;

