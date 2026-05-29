import React from 'react'
import { useState } from "react";

/* @param {{
 *   cookingSteps: import("../../data/lessons").CookingStep[],
 *   onComplete: (xpEarned: number) => void,
 *   onPrev: () => void
 * }} props
 */
const CookingScreen = ({ cookingSteps, onComplete, onPrev }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const currentStep = cookingSteps[currentStepIndex];
  const isLastStep = currentStepIndex === cookingSteps.length - 1;
  const hasQuiz = currentStep.question !== undefined;

  // Solo si hay quiz: validación de respuesta
  const selectionIsCorrect = hasQuiz && selectedAnswer === currentStep.correctIndex;
  const triedIncorrectly = hasQuiz && hasVerified && !selectionIsCorrect;

  const handleVerify = () => {
    if (!hasQuiz || selectedAnswer === null) return;

    setHasVerified(true);
    // Si acertó, sumar XP
    if (selectionIsCorrect) {
      setTotalXpEarned((prev) => prev + currentStep.xp);
    }
  }

  const handleNext = () => {
    if (isLastStep) {
      // Terminar pantalla de cocción, pasar XP al flujo principal
      onComplete(totalXpEarned);
    } else {
      // Avanzar al siguiente paso
      setCurrentStepIndex((prev) => prev + 1);
      // Resetear estado del quiz
      setSelectedAnswer(null);
      setHasVerified(false);
    }
  };

  // Solo permitir avanzar si:
  //  No hay quiz, O
  //  Hay quiz y ya verificó y acertó
  const canAdvance = !hasQuiz || (hasVerified && selectionIsCorrect);
  return (
   <div className="space-y-6">
      
      {/* Progress interno: "Paso X de Y" */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Paso de cocción
        </p>
        <p className="text-xs font-semibold text-stone-700 tabular-nums">
          {currentStepIndex + 1} / {cookingSteps.length}
        </p>
      </div>

      {/* Barra de progreso interna */}
      <div className="h-2 rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / cookingSteps.length) * 100}%` }}
        />
      </div>

      {/* Instrucción del paso */}
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm font-semibold text-stone-600">Instrucción:</p>
        <p className="mt-2 text-base text-stone-800">{currentStep.instruction}</p>
      </div>

      {/* Quiz (si existe) */}
      {hasQuiz && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-5">
            <p className="text-sm font-semibold text-amber-800">💡 Quiz nutricional</p>
            <p className="mt-2 text-stone-800">{currentStep.question}</p>
          </div>

          {/* Opciones de respuesta */}
          <div className="space-y-2">
            {currentStep.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showFeedback = hasVerified;
              const isThisCorrect = index === currentStep.correctIndex;

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (hasVerified && !selectionIsCorrect) {
                      setHasVerified(false);
                    }
                    setSelectedAnswer(index);
                  }}
                  disabled={hasVerified && selectionIsCorrect}
                  className={`
                    w-full rounded-xl border-2 p-4 text-left transition-all
                    ${!hasVerified && isSelected ? 'border-amber bg-amber-50' : ''}
                    ${!hasVerified && !isSelected ? 'border-stone-300 hover:border-stone-400' : ''}
                    ${showFeedback && isThisCorrect ? 'border-green-500 bg-green-50' : ''}
                    ${showFeedback && !isThisCorrect && isSelected ? 'border-red-500 bg-red-50' : ''}
                    ${hasVerified && selectionIsCorrect ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current text-xs font-bold">
                      {String.fromCharCode(65 + index)} {/* A, B, C */}
                    </span>
                    <p className="flex-1 text-sm">{option}</p>
                    {showFeedback && isThisCorrect && <span className="text-green-600">✓</span>}
                    {showFeedback && !isThisCorrect && isSelected && <span className="text-red-600">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botón de verificar */}
          {!hasVerified && (
            <button
              onClick={handleVerify}
              disabled={selectedAnswer === null}
              className={`
                w-full rounded-xl py-3 font-bold text-white transition-all
                ${selectedAnswer !== null
                  ? 'bg-amber hover:bg-amber-dark'
                  : 'bg-stone-300 cursor-not-allowed'
                }
              `}
            >
              Verificar respuesta
            </button>
          )}

          {/* Feedback post-verificación */}
          {hasVerified && (
            <div className={`rounded-xl border-2 p-4 ${selectionIsCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <p className={`font-semibold ${selectionIsCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {selectionIsCorrect ? '¡Correcto! ✓' : 'Incorrecto ✗'}
              </p>
              <p className="mt-2 text-sm text-stone-700">
                {currentStep.explanation}
              </p>
              {selectionIsCorrect && currentStep.xp > 0 && (
                <p className="mt-2 text-sm font-semibold text-amber-700">
                  +{currentStep.xp} XP ganados
                </p>
              )}
            </div>
          )}
          {triedIncorrectly && (
            <button
              onClick={() => {
                setHasVerified(false);
                setSelectedAnswer(null);
              }}
              className="w-full rounded-xl border-2 border-red-500 bg-red-50 py-3 text-red-700 hover:bg-red-100"
            >
              Volver a intentar
            </button>
          )}
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex gap-3 pt-4">
        {currentStepIndex > 0 && (
          <button
            onClick={() => setCurrentStepIndex((prev) => prev - 1)}
            className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100"
          >
            ← Paso anterior
          </button>
        )}
        
        
       

        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className={`
            flex-1 rounded-2xl py-3 font-bold text-white transition-all
            ${canAdvance
              ? 'bg-forest hover:bg-forest-dark'
              : 'bg-stone-300 cursor-not-allowed'
            }
          `}
        >
          {isLastStep ? 'Terminar cocción' : 'Siguiente paso →'}
        </button>
      </div>

    </div>
  )
}

export default CookingScreen
