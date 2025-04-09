import React, { useEffect, useState } from 'react';
import NavbarWeb from "./NavbarWeb";
import FooterSonia from './FooterSonia';
import ArrowUp from './ui/ArrowUp';
import InfoB from './ui/Info';
import VisionEstrategia from "./VisionEstrategia";
import Mapa from './Mapa360';
import BannerFormacion from './BannerFormacion';
import Espacio from './Espacio';
import InfPag from './InfoPag';

const Inicio = () => {
    return(
        <div className="Inicio">
            <NavbarWeb/>
            <BannerFormacion></BannerFormacion>
            <div>
                <p></p>
            </div>
            <InfPag/>
            <div>
                <p></p>
            </div>
            <Espacio/>
            <div>
                <p></p>
            </div>
            <Mapa/>
            <div>
                <p></p>
            </div>
            <VisionEstrategia/>
            <div>
                <p></p>
            </div>
            <ArrowUp/>
            <InfoB/>
            <FooterSonia/>
        </div>
    );
};

export default Inicio;