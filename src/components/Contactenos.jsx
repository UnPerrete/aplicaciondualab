import React from 'react';
import '../styles/Contacto.css';
import NavbarWeb from "./NavbarWeb";
import FooterWeb from './FooterWeb';

const Contactenos = () => {
    return (
        <div>
            {/* Navbar */}
            <NavbarWeb/>

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

                    <button type="submit">Enviar mensaje</button>
                </form>

                <div className="contact-info">
                    <h3>Vía Óptima Dualab</h3>
                    <p>Calle Juan de Quesada 22, Las Palmas G.C.</p>
                    <p>659 02 16 03</p>
                    <p>info@viaoptima.es</p>
                </div>
            </div>
        </div>
        {/* Footer */}
        <FooterWeb/>
       </div> 
    );
};

export default Contactenos;
