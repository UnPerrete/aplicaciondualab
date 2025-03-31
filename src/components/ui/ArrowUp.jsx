import React, { useState, useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"; 
import '../../styles/ArrowUp.css'

export default function ArrowUp() {
      const [scrollingUp, setScrollingUp] = useState(true);
      const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
            const handleScroll = () => {
                setScrollingUp(window.scrollY === 0)
                setLastScrollY(window.scrollY);
            };
    
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [lastScrollY]);


    const handleUpScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <div>
        <button className={`arrowup ${scrollingUp ? 'arrowup-hidden' : 'arrowup-visible'}`} onClick={handleUpScroll}>▴</button>
    </div>
  )
}
