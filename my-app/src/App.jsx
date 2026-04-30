import React from "react";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import SidebarComponent from "./components/ui/SidebarComponent";

const App = () => {
  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<RootLayout />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
