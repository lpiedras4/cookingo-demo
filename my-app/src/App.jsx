import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import SidebarComponent from "./components/ui/SidebarComponent";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";

const App = () => {
  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
