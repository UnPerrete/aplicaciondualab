import React from 'react';
import { Info } from 'lucide-react';

const InfoB = () => {

  // Función para abrir la imagen en una nueva pestaña
  const abrirNuevaPestana = () => {
    const urlImagen = 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/funny-meme-gif-pack-small-version/sticker_3.gif?b353a73c46798a7e57d4b083aac5390b&d=200x200';//'https://pbs.twimg.com/media/FhNk8peXwAgKfbM?format=jpg&name=900x900';//'../assets/md.jpg'; ; // Cambia esto por la ruta real de tu imagen
    window.open(urlImagen, '_blank');
  };

  return (
    <button
      onClick={abrirNuevaPestana}
      className="button-info"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '10px',
        padding: '6px 8px',
        backgroundColor: '#b4b4b4',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
        width: '40px',
        height: '40px',
      }}
    >
        <Info size={20} color="#555" />
      {/* <i class="bi bi-info-circle"></i>Info */}
    </button>
  );
};

export default InfoB;

