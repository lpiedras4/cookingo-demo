import React from "react";
import SidebarComponent from "../components/ui/SidebarComponent";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <SidebarComponent />
      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>
    </div>
  );
};

export default RootLayout;
