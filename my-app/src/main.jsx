import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './css/index.css'
import App from "./App.jsx";
import Home from "./_root/pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
