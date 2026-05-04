import React from "react";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

/*
Orquesta el flujo de 5 pantallas de una lección
Este componente sabe en qué paso estamos
@param  {{ lesson: import("../../data/lessons").Lesson }} props
*/

const LessonFlow = ({ lesson }) => {
  const [step, setStep] = useState(1);
  const [xp, setXP] = useState(0);
  const next = () => {
    setStep((s) =>  Math.min(TOTAL_SCREENS, s + 1));
    setXP((currXP) => currXP + 10);
    
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

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

        <span className="text-xs font-semibold text-amber-dark tabular-nums">
          ✨ {xp} XP
        </span>
      </div>

      {/**Una sola pantalla visible a la vez */}
      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {/* Pantallas 2-5: placeholders hasta las tandas 3 y 4 */}
      {step === 2 && (
        <PlaceholderScreen
          title="🛒 Compra los ingredientes"
          onNext={next}
          onPrev={step > 1 ? prev : null}
        />
      )}
      {step === 3 && (
        <PlaceholderScreen
          title="📋 Prepara los ingredientes"
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 4 && (
        <PlaceholderScreen
          title="🍳 ¡Hagamos el platillo!"
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 5 && (
        <PlaceholderScreen
          title="🎉 ¡Lección completada!"
          onNext={null}
          onPrev={prev}
        />
      )}
    </div>
  );
}

/*Placeholder temporal - se reemplazará pantalla por pantalla */
function PlaceholderScreen({ title, onNext, onPrev, isFirstStep = false}) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border-2 border-dashed border-stone-300 p-8 text-center">
      <p className="font-display text-2xl font-bold text-stone-700">{title}</p>
      <p className="text-sm text-stone-400">
        Esta pantalla se construye en la próxima tanda.
      </p>
      <div className="flex gap-3 pt-2">
        {onPrev && (
          <button
            onClick={onPrev}
            disabled={isFirstStep}
            className={`
              flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 
              hover:bg-stone-100 transition-all
              ${isFirstStep ? 'opacity-40 cursor-not-allowed' : ''} 
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
