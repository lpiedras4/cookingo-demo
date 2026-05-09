import React from 'react'
import { useProgress } from "../../hooks/useProgress"; 
import { useParams, Navigate } from 'react-router-dom';
import { getLesson } from "../../data/lessons";
import LessonFlow from "../../components/lesson/LessonFlow";
import UserProgressBar from '../../components/ui/UserProgressBar';
const LessonPage = () => {
  const {lessonId} = useParams();
  const lesson = getLesson("overnight-oats");
  const {xp,addXp} = useProgress();

  if(!lesson){
    return <Navigate to="/" replace />;
  }
  return (
      <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      
      {/* Header con XP total del usuario */}
      <UserProgressBar xp={xp} onEarnXp={addXp}/>

      <LessonFlow lesson={lesson} onEarnXp={addXp} />
    </main>
  )
}

export default LessonPage
