import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './css/index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
