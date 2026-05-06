// src/components/layout/AppShell.jsx
import { NavLink } from "react-router-dom";


export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      
      {/* SIDEBAR - visible solo en pantallas grandes (≥768px) */}
      <aside className="fixed left-0 top-0 hidden h-screen w-18 flex-col items-center bg-forest py-6 md:flex">
        <nav className="flex flex-col gap-6">
          <NavItem to="/" icon="🏠" label="Inicio" />
          <NavItem to="/profile" icon="👤" label="Perfil" />
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pb-20 md:ml-18 md:pb-0">
        {children}
      </main>

      {/* BOTTOM NAV - visible solo en móvil (<768px) */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-stone-200 bg-white py-3 shadow-nav md:hidden">
        <NavItem to="/" icon="🏠" label="Inicio" isMobile />
        <NavItem to="/profile" icon="👤" label="Perfil" isMobile />
      </nav>

    </div>
  );
}

function NavItem({ to, icon, label, isMobile = false }) {
  if (isMobile) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-colors ${
            isActive ? "text-forest" : "text-stone-400"
          }`
        }
      >
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
          isActive
            ? "bg-forest-light text-white"
            : "text-white/60 hover:bg-forest-dark hover:text-white"
        }`
      }
      title={label}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
    </NavLink>
  );
}