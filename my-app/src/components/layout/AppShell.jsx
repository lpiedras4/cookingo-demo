import React from 'react'
import SidebarComponent from "../ui/SidebarComponent";
import Bottombar from "../ui/Bottombar";
import { Outlet } from 'react-router-dom';
export function AppShell({ children }) {
  return (
<>
<div className="min-h-screen">
      {/* SIDEBAR - visible solo en pantallas grandes (≥768px) */}
      <SidebarComponent />

      {/* CONTENIDO PRINCIPAL */}
      <section className="pb-20 md:ml-18 md:pb-0">
        <Outlet/>
        </section>

      {/* BOTTOM NAV - visible solo en móvil (<768px) */}
      <Bottombar />
    </div>
</>

  );
}
