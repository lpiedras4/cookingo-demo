import React from "react";
import { getLesson } from "./data/lessons";
import LessonFlow from "./components/lesson/LessonFlow";
import { diagnosticExamService} from "./services/diagnosticExamService";
import { userService } from "./services/userService";
import { useProgress } from "./hooks/useProgress";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import {AppShell} from "./components/layout/AppShell";
import LessonPage from "./_root/pages/LessonPage";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import Recipes from "./_root/pages/Recipes";
import RecipePage from "./_root/pages/RecipePage";
import SettingsPage from "./_root/pages/SettingsPage";
import SignInForm from "./_root/auth/forms/SignInForm";
import SignupForm from "./_root/auth/forms/SignupForm";
import AuthPage from "./_root/auth/AuthPage";
import DiagnosticExam from "./_root/pages/DiagnosticExam";
import Wrapper from "./_root/pages/Wrapper";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthPage />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/*private routes*/}
        <Route path="/" element={<Wrapper><AppShell /></Wrapper>}>
        <Route path="/" element={<Home/>}/>
         <Route path="/profile" element={<Profile />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:lessonId" element={<RecipePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:lessonId" element={<RecipePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/diagnostic" element={<DiagnosticExamWrapper />} />
        {/* Ruta 404 - cualquier URL que no exista redirige a Home */}
        <Route path="*" element={<NotFound />} />
        </Route>
       
      </Routes>
    </main>
  );
};

function DiagnosticExamWrapper() {
  const navigate = useNavigate();
  const { setLevel } = useProgress();

  const handleFinish = async (level, userId) => {
    try {
      // Guarda el examen en el backend
      await diagnosticExamService.submit(userId, level);

      // Actualiza el nivel del usuario en el backend
      await userService.assignLevel(userId, level);

      // Guarda el nivel en localStorage (frontend)
      setLevel(level);

      navigate("/");
    } catch (error) {
      console.error("Error al guardar resultado:", error);
    }
  };

  return (
    <DiagnosticExam
      username="Juan85"
      userId={1}              // ← reemplaza con usuario real cuando tengas auth
      onFinish={handleFinish}
      onSkip={() => {
        setLevel(0);
        navigate("/");
      }}
    />
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-6xl">🤷</p>
        <h1 className="mt-4 font-display text-2xl font-bold mb-6">
          Página no encontrada
        </h1>
        <Link
          to="/"
          className="w-full rounded-2xl bg-forest  px-5 py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default App;
