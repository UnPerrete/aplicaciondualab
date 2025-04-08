import React, { useEffect, useState } from 'react';
import NavbarWeb from "./NavbarWeb";
import FooterSonia from './FooterSonia';
import ArrowUp from './ui/ArrowUp';
import InfoB from './ui/Info';
import VisionEstrategia from "./VisionEstrategia";

const Inicio = () => {
    return(
        <div className="Inicio">
            <NavbarWeb/>
            <VisionEstrategia/>
            <ArrowUp/>
            <InfoB/>
            <FooterSonia/>
        </div>
    );
};

export default Inicio;