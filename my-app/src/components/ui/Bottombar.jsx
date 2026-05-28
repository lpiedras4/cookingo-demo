import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BookOpenIcon
} from "@heroicons/react/24/solid";

const Bottombar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-stone-200 bg-forest py-3 shadow-nav md:hidden">
      <NavItem to="/" icon={HomeIcon} label="Inicio" />
      <NavItem to="/profile" icon={UserCircleIcon} label="Perfil" />
      <NavItem to="/recipes" icon={BookOpenIcon} label="Recetas" />
      <NavItem to="/settings" icon={Cog6ToothIcon} label="Configuración" />
      
    </nav>
  );
};

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className="flex flex-col items-center gap-1 transition-all duration-300 rounded-lg px-1 py-2 text-white hover:bg-green-700 hover:text-black"
    >
      <span className="text-xl" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}

export default Bottombar;
