import { NavLink } from "react-router-dom";
import logoCookingo from "./../../../public/logo/logoCookingo.svg"
import {
  HomeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BookOpenIcon
} from "@heroicons/react/24/solid";

const SidebarComponent = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-80 flex-col items-start bg-forest py-6 md:flex">
      <div className="flex flex-row-reverse justify-between gap-5 items-center">
        <h1 className="font-display text-3xl font-bold text-white">
          Cookin<span className="text-orange">Go</span>
        </h1>
      <img src={logoCookingo} alt="Cookingo logo" className="h-30 w-auto" />
      </div>
      
      <nav className="flex flex-col gap-6">
        <NavItem to="/" icon={HomeIcon} label="Inicio" />
        <NavItem to="/profile" icon={UserCircleIcon} label="Perfil" />
        <NavItem to="/recipes" icon={BookOpenIcon} label="Recetas" />
        <NavItem to="/settings" icon={Cog6ToothIcon} label="Configuración" />
        
      </nav>
    </aside>
  );
};

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className="flex flex-row items-center ml-3.5 gap-1 transition-all duration-300 rounded-lg px-1 py-2 text-white hover:bg-green-700 w-70 hover:text-black"
    >
      <span className="text-xl mr-2" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-base font-medium">{label}</span>
    </NavLink>
  );
}

export default SidebarComponent;
