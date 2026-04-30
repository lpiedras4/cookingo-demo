import React from "react";
import "./css/App.css";
import SidebarComponent from "./components/SidebarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./_root/pages/Home";
import Lesson from "./_root/pages/Lesson";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <main className="flex h-screen">
          <Routes>
            <Route path="/" element={<RootLayout/>} />
            <Route path="/lesson" element={<Lesson />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
