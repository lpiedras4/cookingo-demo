import React from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SidebarComponent = () => {
  return (
    <Sidebar className="custom-sidebar" aria-label="Default sidebar example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Inicio
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            Perfil
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Reseñas
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default SidebarComponent;
