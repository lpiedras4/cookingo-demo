import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
const SidebarComponent = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-22 flex-col items-center bg-forest py-6 md:flex">
      <nav className="flex flex-col gap-6">
        <NavItem to="/" icon={HomeIcon} label="Inicio" />
        <NavItem to="/profile" icon={UserCircleIcon} label="Perfil" />
        <NavItem to="/settings" icon={Cog6ToothIcon} label= "Configuración" />
      </nav>
    </aside>
  );
};

function NavItem({ to, icon:Icon, label }) {
  return (
    <NavLink
      to={to}
      className=
        "flex flex-col items-center gap-1 transition-all duration-300 rounded-lg px-1 py-2 text-white hover:bg-green-700 hover:text-black"
      
    >
      <span className="text-xl" aria-hidden="true">
        <Icon className="h-6 w-6"/>
      </span>
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
}



export default SidebarComponent;
