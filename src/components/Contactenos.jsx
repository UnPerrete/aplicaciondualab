import React from 'react';
import '../styles/Contacto.css';
import NavbarWeb from "./NavbarWeb";
import FooterSonia from './FooterSonia';
import InfoB from './ui/Info';
import ArrowUp from "./ui/ArrowUp";

const Contactenos = () => {
    return (
        <>
        <NavbarWeb/>
        <div>
            {/* Navbar */}
            

            {/* Contact Banner */}
            <div className="contact-banner">
                <h2>CONTÁCTENOS</h2>
            </div>
        <div className="contact-page">
            {/* Contact Form and Info */}
            <div className="contact-content">
                <form className="contact-form">
                    <div className="form-group2">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" placeholder="Nombre" required />
                    </div>

                    <div className="form-group2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" required />
                    </div>

                    <div className="form-group2">
                        <label htmlFor="company">Compañía/Organización</label>
                        <input type="text" id="company" placeholder="Compañía u organización" />
                    </div>

                    <div className="form-group2">
                        <label htmlFor="message">Mensaje</label>
                        <textarea type="text" id="message" placeholder="Escriba el mensaje" required></textarea>
                    </div>
                    
                    <button className="button-message" type="submit">Enviar mensaje</button>
                </form>

                <div className="contact-info">
                <div className="border-dualab">
                    <h3>Vía Óptima Dualab</h3>
                    <p>Calle Juan de Quesada 22, Las Palmas G.C.</p>
                    <p>659 02 16 03</p>
                    <p>info@viaoptima.es</p>
                </div>
                </div>
            </div>
        </div>
        <InfoB/>
        <ArrowUp/>
        {/* Footer */}
        
       </div>
       <FooterSonia/>
       </>
    );
};

export default Contactenos;
