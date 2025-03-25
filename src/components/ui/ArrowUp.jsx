import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"; 
import '../../styles/ArrowUp.css'

export default function ArrowUp() {

    const handleUpScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <div>
        <button className='arrowup' onClick={handleUpScroll}>▴</button>
    </div>
  )
}
