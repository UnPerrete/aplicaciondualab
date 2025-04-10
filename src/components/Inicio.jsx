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
        <>
            <NavbarWeb/>
            <BannerFormacion></BannerFormacion>
            <InfPag/>
            <Espacio/>
            <Mapa/>
            <VisionEstrategia/>
            <ArrowUp/>
            <InfoB/>
            <FooterSonia/>
        </>
    );
};

export default Inicio;