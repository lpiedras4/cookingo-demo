import { NavLink } from "react-router-dom";

const Bottombar = () => {
  return (
    <nav className="fixed bottom-0 bg-forest left-0 right-0 flex items-center justify-around border-t border-stone-200 py-3 shadow-nav md:hidden">
        <NavItem to="/" icon="🏠" label="Inicio" isMobile />
        <NavItem to="/profile" icon="👤" label="Perfil" isMobile />
      </nav>
  );
}

function NavItem({ to, icon, label, isMobile = false }) {
  if (isMobile) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
         `flex flex-col items-center gap-1 transition-all duration-300 rounded-lg px-3 py-2 ${
          isActive
            ? "text-forest"
            : "text-stone-400 hover:bg-green-700 hover:text-white"
        }`
        } 
      >
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </NavLink>
    );
  }
}

export default Bottombar
