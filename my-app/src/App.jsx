import React from "react";
import { getLesson } from "./data/lessons";
import LessonFlow from "./components/lesson/LessonFlow";
import { useProgress } from "./hooks/useProgress";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import {AppShell} from "./components/layout/AppShell";
import LessonPage from "./_root/pages/LessonPage";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import Recipes from "./_root/pages/Recipes"
import RecipePage from "./_root/pages/RecipePage";
import SettingsPage from "./_root/pages/SettingsPage";
import SignInForm from "./_root/auth/forms/SignInForm";
import SignupForm from "./_root/auth/forms/SignupForm";
import AuthPage from "./_root/auth/AuthPage";


const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path = "/auth" element={<AuthPage/>} />
        
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/recipes/:lessonId" element={<RecipePage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        {/* Ruta 404 - cualquier URL que no exista redirige a Home */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </AppShell>
  );
};

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-6xl">🤷</p>
        <h1 className="mt-4 font-display text-2xl font-bold mb-6">Página no encontrada</h1>
        <Link to="/" className="w-full rounded-2xl bg-forest  px-5 py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default App;
