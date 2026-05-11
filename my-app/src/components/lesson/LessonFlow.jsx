import React from "react";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";
import IngredientsScreen from "./IngredientsScreen";
import  ResultsScreen  from "./ResultsScreen";
import  PrepOrderScreen  from "./PrepOrderScreen";
import  CookingScreen  from "./CookingScreen"; 
/*
Orquesta el flujo de 5 pantallas de una lección
Este componente sabe en qué paso estamos
/**
 * @param {{ 
 *   lesson: import("../../data/lessons").Lesson,
 *   onEarnXp: (points: number) => void  //  callback para reportar XP ganado
 * }} props
 */

const XP_PER_SCREEN = { // XP otorgado por pantalla
  1:0,    // Bienvenida: sin XP
  2: 15,  // Ingredientes: 15 XP por completar la compra
  3: 10,  // Prep: 10 XP por ordenar correctamente
  4: 0,  // Cocina: 40 XP de los quizzes (suma de todos los pasos)
  5: 10,  // Resultados: 10 XP bonus por completar
 
};


const LessonFlow = ({ lesson, onEarnXp }) => {
  const [step, setStep] = useState(1);
  const [totalXpEarned, setTotalXpEarned]= useState(0);
  const next = () => {
    const nextStep = Math.min(TOTAL_SCREENS, step + 1);
    setStep(nextStep);
    //otorga el XP correspondiente a la pantalla que se acaba de avanzar.
    const xpEarned = XP_PER_SCREEN[nextStep] || 0;
    if (xpEarned > 0){
      onEarnXp(xpEarned);
      setTotalXpEarned((prev) => prev + xpEarned);
    }
  };


  const prev = () => setStep((s) => Math.max(1, s - 1));

   const handleCookingComplete = (cookingXp) => {
    // El XP viene de los quizzes, no de XP_PER_SCREEN
    onEarnXp(cookingXp);
    setTotalXpEarned((prev) => prev + cookingXp);
    
    // Avanzar automáticamente a la pantalla de resultados
    setStep(5);
  };

  return (
    <div>
      {/*Barra de progreso */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-amber transition-all duration-300"
            style={{ width: `${(step / TOTAL_SCREENS) * 100}%` }}
          />
        </div>
        <span className="text-xs text-stone-400 tabular-nums">
          {step} / {TOTAL_SCREENS}
        </span>

  
      </div>

      {/**Una sola pantalla visible a la vez */}
      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {/* Pantallas 2-5: placeholders hasta las tandas 3 y 4 */}
      {step === 2 && (
        <IngredientsScreen
        ingredients={lesson.ingredients}
        onNext={next}
        onPrev={prev}
        />
      )}
      {step === 3 && (
        <PrepOrderScreen
        prepOrder={lesson.prepOrder}
        onNext={next}
        onPrev={prev}
        />
      )}
      {step === 4 && (
        <CookingScreen
          cookingSteps={lesson.cookingSteps}
          onComplete={handleCookingComplete}
          onPrev={prev}
        />
      )}
      {step === 5 && (
        <ResultsScreen
          lesson={lesson}
          xpEarned={totalXpEarned}
          onPrev={prev}
        />
      )}
    </div>
  );
};

/*Placeholder temporal - se reemplazará pantalla por pantalla */
function PlaceholderScreen({ title, onNext, onPrev}) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border-2 border-dashed border-stone-300 p-8 text-center">
      <h2 className="font-display text-2xl font-bold text-stone-700">{title}</h2>
      <p className="text-sm text-stone-400">
        Esta pantalla se construye en la próxima tanda.
      </p>
      <div className="flex gap-3 pt-2">
        {onPrev && (
          <button
            onClick={onPrev}
           
            className={`
              flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 
              hover:bg-stone-100 transition-all
              
            `}
          >
            ← Atrás
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="flex-1 rounded-2xl bg-forest py-3 font-bold text-white hover:bg-forest-dark"
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

export default LessonFlow;
