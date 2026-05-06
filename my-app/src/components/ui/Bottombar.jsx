import React from 'react'
import { NavLink } from "react-router-dom";
const Bottombar = () => {
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-stone-200 bg-white py-3 shadow-nav md:hidden">
        <NavItem href="/" icon="🏠" label="Inicio" isMobile />
        <NavItem href="/recipes" icon="📖" label="Recetas" isMobile />
        <NavItem href="/profile" icon="👤" label="Perfil" isMobile />
      </nav>
    </div>
  )
}

export default Bottombar
