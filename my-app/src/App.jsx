import React from "react";
import "./css/App.css";
import Navbar from "./components/Navbar";
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";


const App = () => {
  return (
    <div>
      <Navbar />
      <main className=" main-content">
        <Routes>
            <Route path = "/" element={<Home/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
