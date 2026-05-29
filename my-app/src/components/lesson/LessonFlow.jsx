import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";
import IngredientsScreen from "./IngredientsScreen";
import  ResultsScreen  from "./ResultsScreen";
import  PrepOrderScreen  from "./PrepOrderScreen";
import  CookingScreen  from "./CookingScreen"; 
import { XMarkIcon } from "@heroicons/react/24/solid";
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
  2: 0,  // Ingredientes: 15 XP por completar la compra
  3: 15,  // Prep: 10 XP por ordenar correctamente (awarded in component)
  4: 5,  // Cocina: 40 XP de los quizzes (suma de todos los pasos)
  5: 5,  // Resultados: 10 XP bonus por completar
 
};


const LessonFlow = ({ lesson, onEarnXp, onCompleteLesson }) => {
  const [step, setStep] = useState(1);
  const [totalXpEarned, setTotalXpEarned]= useState(0);
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const navigate = useNavigate();

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

  const openAbandonModal = () => setShowAbandonModal(true);
  const closeAbandonModal = () => setShowAbandonModal(false);
  const confirmAbandon = () => {
    setShowAbandonModal(false);
    navigate("/", { replace: true });
  };


  const prev = () => setStep((s) => Math.max(1, s - 1));

   const handleCookingComplete = (cookingXp) => {
    // El XP viene de los quizzes, no de XP_PER_SCREEN
    onEarnXp(cookingXp);
    onCompleteLesson?.();
    setTotalXpEarned((prev) => prev + cookingXp);
    
    // Avanzar automáticamente a la pantalla de resultados
    setStep(5);
  };


  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-stone-600">Paso {step} de {TOTAL_SCREENS}</p>
        </div>
        <XMarkIcon
          onClick={openAbandonModal}
          className="h-7 w-7 hover:text-red-500 transition"
        />
        
       
      </div>

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
        onEarnXp = {onEarnXp}
        />
      )}
      {step === 3 && (
        <PrepOrderScreen
        prepOrder={lesson.prepOrder}
        onNext={next}
        onEarnXp={onEarnXp}
        />
      )}
      {step === 4 && (
        <CookingScreen
          cookingSteps={lesson.cookingSteps}
          onComplete={handleCookingComplete}
        />
      )}
      {step === 5 && (
        <ResultsScreen
          lesson={lesson}
          xpEarned={totalXpEarned}
        />
      )}

      {showAbandonModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeAbandonModal}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-stone-900">¿Abandonar la lección?</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Si abandonas la lección ahora, tu progreso no se guardará. ¿Quieres volver a la lección o salir al inicio?
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={closeAbandonModal}
                  className="rounded-2xl border border-stone-300 bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-200 transition"
                >
                  Volver a la lección
                </button>
                <button
                  onClick={confirmAbandon}
                  className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition"
                >
                  Abandonar y volver al inicio
                </button>
              </div>
            </div>
          </div>
        </>
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
