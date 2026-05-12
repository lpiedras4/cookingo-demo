import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ResultsScreen = ({ lesson, xpEarned, onPrev }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative space-y-6 py-6">
      {/* Confetti - solo se muestra los primeros 3 segundos */}
      {showConfetti && <Confetti />}

      {/* Header de celebración */}
      <header className="text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-linear-to-br from-amber to-orange flex items-center justify-center text-5xl shadow-lg">
          🎉
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold text-forest">
          ¡Lección completada!
        </h2>
        <p className="mt-2 text-stone-600">Has dominado {lesson.name}</p>
      </header>

      {/* Card de XP ganado */}
      <div className="rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6 text-center">
        <p className="text-sm uppercase tracking-wide text-amber-800 font-semibold">
          Experiencia ganada
        </p>
        <p className="mt-2 font-display text-6xl font-bold text-amber-600">
          +{xpEarned} XP
        </p>
        <p className="mt-2 text-sm text-amber-700">
          ¡Sigue así para subir de nivel!
        </p>
      </div>

      {/* Badge desbloqueado */}
      {lesson.badge && (
        <div className="rounded-2xl bg-white p-6 shadow-card text-center border-2 border-green-200">
          <p className="text-sm uppercase tracking-wide text-green-800 font-semibold">
            🏆 Insignia desbloqueada
          </p>
          <p className="mt-2 font-display text-xl font-bold text-green-700">
            {lesson.badge}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Visita tu perfil para ver todas tus insignias
          </p>
        </div>
      )}

      {/* Receta desbloqueada */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{lesson.dishEmoji}</div>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-stone-400 font-semibold">
              Receta desbloqueada
            </p>
            <p className="mt-1 font-display text-lg font-bold text-stone-800">
              {lesson.name}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Ahora puedes acceder a esta receta desde tu recetario cuando
              quieras
            </p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}

      <div className="space-y-3 pt-4">
        <button
          onClick={() => navigate("/recipes/:lessonId")}
          className="w-full rounded-2xl bg-forest py-4 font-bold text-white shadow hover:bg-forest-dark transition-all active:scale-95"
        >
          📖 Ver receta completa
        </button>
        <button
          onClick={() => navigate("/recipes")}
          className="w-full rounded-2xl bg-forest py-4 font-bold text-white shadow hover:bg-forest-dark transition-all active:scale-95"
        >
          📖 Ver mi recetario
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full rounded-2xl border-2 border-forest py-4 font-bold text-forest hover:bg-forest hover:text-white transition-all"
        >
          🏠 Hacer otra lección
        </button>

        <button
          onClick={onPrev}
          className="w-full rounded-2xl border border-stone-300 py-3 text-sm text-stone-600 hover:bg-stone-100 transition-colors"
        >
          ← Volver al paso anterior
        </button>
      </div>
    </div>
  );
};

function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((i) => (
        <div
          key={i}
          className="confetti-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ["#F5A623", "#E8843A", "#1B5C3E", "#F5E3C8"][
              Math.floor(Math.random() * 4)
            ],
          }}
        />
      ))}
    </div>
  );
}

export default ResultsScreen;
