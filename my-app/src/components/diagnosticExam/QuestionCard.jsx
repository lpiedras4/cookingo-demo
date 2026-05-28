import { useState } from "react";

const QuestionCard = ({ question, current, total, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const progress = Math.round((current / total) * 100);

  const handleNext = () => {
    if (selected === null) return;
    onAnswer(selected);
    setSelected(null);
  };

  return (
    <div className="space-y-6">

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-stone-200 rounded-full">
          <div
            className="h-1.5 bg-amber rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-stone-500">{progress}%</span>
      </div>

      {/* Título */}
      <h2 className="font-display text-2xl font-bold text-stone-800">
        Pregunta {current}
      </h2>
      <p className="text-stone-700">{question.question}</p>
      {question.subtitle && (
            <p className="text-sm text-stone-400 italic -mt-4">
            {question.subtitle}
            </p>
        )}

      {/* Imagen opcional */}
      {question.image && (
        <img
          src={question.image}
          alt="pregunta"
          className="w-full max-h-52 object-cover rounded-2xl"
        />
      )}

      {/* Opciones */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`
              rounded-2xl border-2 py-4 px-3 text-sm font-semibold transition-all
              ${selected === opt.value
                ? "border-forest bg-forest text-white"
                : "border-forest bg-transparent text-forest hover:bg-forest/10"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        disabled={selected === null}
        className={`
          w-full rounded-2xl py-3 font-bold text-white transition-all
          ${selected !== null
            ? "bg-forest hover:bg-forest-dark"
            : "bg-stone-300 cursor-not-allowed"
          }
        `}
      >
        Siguiente pregunta
      </button>

    </div>
  );
};

export default QuestionCard;