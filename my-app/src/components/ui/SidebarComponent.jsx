import { NavLink } from "react-router-dom";
const SidebarComponent = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-18 flex-col items-center bg-forest py-6 md:flex">
      <nav className="flex flex-col gap-6">
        <NavItem to="/" icon="🏠" label="Inicio" />
        <NavItem to="/recipes" icon="📖" label="Recetas" />
        <NavItem to="/profile" icon="👤" label="Perfil" />
      </nav>
    </aside>
  );
};

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-colors ${
          isActive ? "text-forest" : "text-stone-400"
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
