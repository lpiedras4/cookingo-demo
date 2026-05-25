import { NavLink } from "react-router-dom";
const SidebarComponent = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-22 flex-col items-center bg-forest py-6 md:flex">
      <nav className="flex flex-col gap-6">
        <NavItem to="/" icon="🏠" label="Inicio" />
        <NavItem to="/profile" icon="👤" label="Perfil" />
        <NavItem to="/settings" icon="⚙️" label= "Configuración" />
      </nav>
    </aside>
  );
};

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-all duration-300 rounded-lg px-1 py-2 ${
          isActive
            ? "text-forest"
            : "text-stone-400 hover:bg-green-700 hover:text-white"
        }`
      }
    >
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}

export default SidebarComponent;
