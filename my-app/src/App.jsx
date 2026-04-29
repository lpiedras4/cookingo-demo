import React from "react";
import "./css/App.css";
import SidebarComponent from "./components/SidebarComponent";
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";


const App = () => {
  return (
    <BrowserRouter>
     <div>
      <SidebarComponent/>
      <main className=" main-content">
        <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/lesson" element = {<Lesson/>}/>
        </Routes>
      </main>
    </div>
    </BrowserRouter>
   
  );
};

export default App;
