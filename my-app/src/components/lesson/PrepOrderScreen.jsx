// src/components/lesson/PrepOrderScreen.jsx
import React, { useState, useEffect, useRef } from "react";

const PrepOrderScreen = ({ prepOrder, onNext, onPrev }) => {
  const [availableSteps, setAvailableSteps] = useState([]);
  const [slots, setSlots] = useState([]);
  const [overSlot, setOverSlot] = useState(null);
  // Cuántas veces se ha intentado colocar algo incorrectamente en cada slot
  const [slotErrors, setSlotErrors] = useState({});
  // Qué slots tienen la pista activa
  const [activeHints, setActiveHints] = useState({});
  // ID del chip resaltado como pista
  const [highlightedChip, setHighlightedChip] = useState(null);
  // Rastrear si el usuario no ha cometido ningún error
  const [perfectRun, setPerfectRun] = useState(true);
  const draggedIdRef = useRef(null);

  useEffect(() => {
    if (prepOrder && prepOrder.length > 0) {
      setAvailableSteps(
        prepOrder.map((text, index) => ({
          id: `step-${index}`,
          text,
          correctIndex: index,
        })),
      );
      setSlots(Array(prepOrder.length).fill(null));
      setSlotErrors({});
      setActiveHints({});
      setHighlightedChip(null);
      setPerfectRun(true);
    }
  }, [prepOrder]);

  if (!prepOrder || prepOrder.length === 0) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-stone-600">No hay pasos de preparación disponibles</p>
        <button
          onClick={onPrev}
          className="rounded-2xl border border-stone-300 px-6 py-3 text-stone-600 hover:bg-stone-100"
        >
          ← Volver
        </button>
      </div>
    );
  }

  const handleDragStart = (e, id) => {
    draggedIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    if (highlightedChip === id) setHighlightedChip(null);
  };

  const handleDragOver = (e, slotIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverSlot(slotIndex);
  };

  const handleDragLeave = () => setOverSlot(null);

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    setOverSlot(null);

    const id = draggedIdRef.current;
    if (!id) return;

    const draggedStep = availableSteps.find((s) => s.id === id);
    if (!draggedStep) return;

    const isCorrectSlot = draggedStep.correctIndex === slotIndex;

    if (!isCorrectSlot) {
      // Registrar error y NO colocar el chip — el usuario sigue intentando
      setPerfectRun(false);
      setSlotErrors((prev) => ({
        ...prev,
        [slotIndex]: (prev[slotIndex] || 0) + 1,
      }));
      setHighlightedChip(null);
      draggedIdRef.current = null;
      return;
    }

    // Colocación correcta
    setAvailableSteps((prev) => {
      const next = prev.filter((s) => s.id !== id);
      return slots[slotIndex] !== null ? [...next, slots[slotIndex]] : next;
    });

    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = draggedStep;
      return next;
    });

    // Limpiar estado de error/pista para este slot
    setActiveHints((prev) => { const n = { ...prev }; delete n[slotIndex]; return n; });
    setSlotErrors((prev) => { const n = { ...prev }; delete n[slotIndex]; return n; });
    setHighlightedChip(null);
    draggedIdRef.current = null;
  };

  const handleDragEnd = () => {
    setOverSlot(null);
    draggedIdRef.current = null;
  };

  const handleShowHint = (slotIndex) => {
    setActiveHints((prev) => ({ ...prev, [slotIndex]: true }));
    const correctChip = availableSteps.find((s) => s.correctIndex === slotIndex);
    if (correctChip) setHighlightedChip(correctChip.id);
  };

  // Mensaje direccional: le dice al usuario si el paso va antes o después del slot
  const getDirectionHint = (step, slotIndex) => {
    if (!step) return null;
    return step.correctIndex < slotIndex
      ? "⬆️ Este paso va antes"
      : "⬇️ Este paso va después";
  };

  const allFilled = slots.every((s) => s !== null);
  const allCorrect =
    allFilled && slots.every((step, index) => step?.correctIndex === index);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <h2 className="font-display text-2xl font-bold text-stone-800">
          📋 Prepara los ingredientes
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Arrastra los pasos al orden correcto
        </p>
      </header>

      {/* Drop zones */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Orden correcto:
        </p>
        {slots.map((step, index) => {
          const isFilled = step !== null;
          const isCorrect = isFilled && step.correctIndex === index;
          const isOver = overSlot === index;
          const errors = slotErrors[index] || 0;
          const hasHint = activeHints[index];
          const showHintButton = errors >= 2 && !hasHint && !isFilled;

          // Hint direccional: solo visible mientras se arrastra un chip sobre este slot
          const currentDragStep = isOver && draggedIdRef.current
            ? availableSteps.find((s) => s.id === draggedIdRef.current)
            : null;
          const directionHint = getDirectionHint(currentDragStep, index);

          return (
            <div key={index} className="space-y-1">
              <div
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  min-h-15 rounded-xl border-2 border-dashed p-3 transition-all
                  ${isOver ? "border-amber-400 bg-amber-50 scale-105" : ""}
                  ${!isOver && isFilled && isCorrect ? "border-green-400 bg-green-50" : ""}
                  ${!isOver && isFilled && !isCorrect ? "border-red-400 bg-red-50" : ""}
                  ${!isOver && !isFilled && hasHint ? "border-blue-300 bg-blue-50" : ""}
                  ${!isOver && !isFilled && !hasHint ? "border-stone-300 bg-stone-50" : ""}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-600">
                    {index + 1}
                  </span>
                  {step ? (
                    <p className="flex-1 text-sm text-stone-700">{step.text}</p>
                  ) : (
                    <p className="flex-1 text-sm text-stone-400 italic">
                      {hasHint
                        ? "💡 Mira el chip resaltado en azul"
                        : "Arrastra un paso aquí"}
                    </p>
                  )}
                  {isFilled && (
                    <span className="text-lg">{isCorrect ? "✓" : "✗"}</span>
                  )}
                </div>
              </div>

              {/* Hint direccional al arrastrar sobre el slot */}
              {directionHint && (
                <p className="text-xs text-amber-600 font-medium pl-1 animate-pulse">
                  {directionHint}
                </p>
              )}

              {/* Feedback amigable tras el primer error */}
              {errors === 1 && !isFilled && (
                <p className="text-xs text-red-500 pl-1">
                  ¡Casi! Ese paso no va aquí, sigue intentando 💪
                </p>
              )}

              {/* Botón de pista tras 2 errores */}
              {showHintButton && (
                <button
                  onClick={() => handleShowHint(index)}
                  className="text-xs text-blue-500 underline pl-1 hover:text-blue-700"
                >
                  💡 Ver pista para este paso
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Chips disponibles */}
      {availableSteps.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Pasos disponibles:
          </p>
          {availableSteps.map((step) => {
            const isHinted = highlightedChip === step.id;
            return (
              <div
                key={step.id}
                draggable
                onDragStart={(e) => handleDragStart(e, step.id)}
                onDragEnd={handleDragEnd}
                className={`
                  cursor-grab rounded-xl border-2 p-3 transition-all
                  hover:scale-105 active:cursor-grabbing active:opacity-50
                  ${isHinted
                    ? "border-blue-400 bg-blue-400 animate-pulse"
                    : "border-orange-400 bg-orange-400"
                  }
                `}
              >
                <p className="text-sm font-semibold text-white">{step.text}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Feedback final */}
      {allFilled && (
        <div
          className={`rounded-2xl p-4 text-center ${
            allCorrect
              ? "bg-green-100 border-2 border-green-400"
              : "bg-red-100 border-2 border-red-400"
          }`}
        >
          <p className={`font-semibold ${allCorrect ? "text-green-800" : "text-red-800"}`}>
            {allCorrect && perfectRun
              ? "🌟 ¡Perfecto! ¡Lo lograste al primer intento!"
              : allCorrect
              ? "✓ ¡Muy bien! Orden correcto"
              : "✗ Revisa el orden — algunos pasos están en posición incorrecta"}
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!allCorrect}
          className={`
            flex-1 rounded-2xl py-3 font-bold text-white transition-all
            ${allCorrect
              ? "bg-forest hover:bg-forest-dark"
              : "bg-stone-300 cursor-not-allowed"
            }
          `}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default PrepOrderScreen;