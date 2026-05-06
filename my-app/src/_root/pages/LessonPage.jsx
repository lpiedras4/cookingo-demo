import React from 'react'
import { useProgress } from "../../hooks/useProgress"; 
import { useParams, Navigate } from 'react-router-dom';
import { getLesson } from "../../data/lessons";
import LessonFlow from "../../components/lesson/LessonFlow";
const LessonPage = () => {
  const {lessonId} = useParams();
  const lesson = getLesson("overnight-oats");
  const {xp, addXp} = useProgress();

  if(!lesson){
    return <Navigate to="/" replace />;
  }
  return (
      <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      
      {/* Header con XP total del usuario */}
      <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Tu progreso</p>
            <p className="font-display text-2xl font-bold text-forest">
              ✨ {xp} XP
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400">Nivel</p>
            <p className="font-display text-2xl font-bold text-amber">
              {Math.floor(xp / 100) + 1}
            </p>
          </div>
        </div>
        {/* Barra de nivel: cada 100 XP es un nivel */}
        <div className="mt-2 h-2 rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-amber transition-all duration-500"
            style={{ width: `${(xp % 100)}%` }}
          />
        </div>
      </header>

      <LessonFlow lesson={lesson} onEarnXp={addXp} />
    </main>
  )
}

export default LessonPage
