import SidebarComponent from "../ui/SidebarComponent";
import Bottombar from "../ui/Bottombar";

export function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      {/* SIDEBAR - visible solo en pantallas grandes (≥768px) */}
      <SidebarComponent />

      {/* CONTENIDO PRINCIPAL */}
      <main className="pb-20 md:ml-18 md:pb-0">{children}</main>

      {/* BOTTOM NAV - visible solo en móvil (<768px) */}
      <Bottombar />
    </div>
  );
}
