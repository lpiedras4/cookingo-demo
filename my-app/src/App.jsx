import React from "react";
import { getLesson } from "./data/lessons";
import LessonFlow from "./components/lesson/LessonFlow";
import { useProgress } from "./hooks/useProgress";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {AppShell} from "./components/layout/AppShell";
import LessonPage from "./_root/pages/LessonPage";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />

        {/* Ruta 404 - cualquier URL que no exista redirige a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;
