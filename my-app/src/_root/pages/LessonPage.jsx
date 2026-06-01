import React from 'react'
import { useProgress } from "../../hooks/useProgress"; 
import { useParams, Navigate } from 'react-router-dom';
import { userService } from "../../services/userService";
import { recipeService } from "../../services/recipeService";  // ← arriba
import { useUsers } from "../../hooks/useUsers";
import { getLesson } from "../../data/lessons";
import LessonFlow from "../../components/lesson/LessonFlow";
import UserProgressBar from '../../components/ui/UserProgressBar';

const LessonPage = () => {
  const { lessonId } = useParams();
  const lesson = getLesson("overnight-oats");
  const { xp, addXp, markLessonComplete } = useProgress();
  const { user } = useUsers();

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  const handleEarnXp = async (points) => {
    addXp(points);
    if (user?.id) {
      try {
        await userService.addXp(user.id, points);
      } catch (e) {
        console.warn("No se pudo sincronizar XP:", e.message);
      }
    }
  };

  const handleCompleteLesson = async () => {
    markLessonComplete(lesson.id);
    if (user?.id && lesson?.backendId) {
      try {
        await recipeService.complete(lesson.backendId, user.id);
      } catch (e) {
        console.warn("No se pudo guardar receta completada:", e.message);
      }
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-xlg bg-cream px-5 py-6">
      <UserProgressBar xp={xp} onEarnXp={handleEarnXp} />
      <LessonFlow
        lesson={lesson}
        onEarnXp={handleEarnXp}
        onCompleteLesson={handleCompleteLesson}
      />
    </main>
  );
};

export default LessonPage;