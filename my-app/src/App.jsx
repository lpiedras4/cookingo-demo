import React from "react";
import { getLesson } from "./data/lessons";
import LessonFlow from "./components/lesson/LessonFlow";


const App = () => {
  const lesson = getLesson("overnight-oats");
  return (
   <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
   <LessonFlow lesson ={lesson}/>
    </main>
  );
};

export default App;
