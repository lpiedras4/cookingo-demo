import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { diagnosticExamService } from "./services/diagnosticExamService";
import { userService } from "./services/userService";
import { useProgress } from "./hooks/useProgress";

import { AppShell } from "./components/layout/AppShell";

import LessonPage from "./_root/pages/LessonPage";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import Recipes from "./_root/pages/RecipesPage";
import RecipePage from "./_root/pages/CompletedRecipePage";
import SettingsPage from "./_root/pages/SettingsPage";
import DiagnosticExam from "./_root/pages/DiagnosticExam";
import Wrapper from "./_root/pages/Wrapper";

import AuthPage from "./_root/auth/AuthPage";
import SignInPage from "./_root/auth/SignInPage";
import SignUpPage from "./_root/auth/SignUpPage";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthPage />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Private routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Wrapper>
                <AppShell />
              </Wrapper>
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Lesson route */}
        <Route
          path="/lesson/:lessonId"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        {/*Recipe View Route  */}
        <Route path="recipes/:lessonId" element={<RecipePage />} />
        {/*Diagnostic Exam route */}

        <Route
          path="diagnostic"
          element={
            <ProtectedRoute>
              <DiagnosticExamWrapper />
            </ProtectedRoute>
          }
        />

        {/* Redirect inicial */}
        <Route path="/auth" element={<Navigate to="/sign-in" />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

function DiagnosticExamWrapper() {
  const navigate = useNavigate();
  const { setLevel } = useProgress();

  //Se obtiene usuario real guardado después de login o registro
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const handleFinish = async (level, userId) => {
    try {
      //Se valida que haya un userId real
      if (!userId) {
        navigate("/sign-in");
        return;
      }
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

  //Si no hay usuario en localStorage, regresamos al login
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <DiagnosticExam
      username={user.name}
      userId={user.id} // ← reemplaza con usuario real cuando tengas auth
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
