import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const SidebarComponent = () => {
  return (
  <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white dark:bg-emerald-700">
    <NavLink to="#">
        <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt=""/>
    </NavLink>

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
                <NavLink className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-800 dark:hover:text-gray-200 hover:text-gray-700" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>

                    <span className="mx-2 text-sm font-medium">Inicio</span>
                </NavLink>

                <NavLink className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-800 dark:hover:text-gray-200 hover:text-gray-700" to="/perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>

                    <span className="mx-2 text-sm font-medium">Perfil</span>
                </NavLink>
              
            </div>
        </nav>
    </div>
</aside>
  );
};

export default SidebarComponent;
