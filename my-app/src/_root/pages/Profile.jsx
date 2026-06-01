import React from "react";
import { useNavigate } from "react-router-dom";
import { lessons } from "../../data/lessons";
import { useProgress } from "../../hooks/useProgress";
import { useUsers } from "../../hooks/useUsers";

const Profile = () => {
  const navigate = useNavigate();
  const { xp, completedLessons, level: diagnosticLevel } = useProgress();
  const { user } = useUsers();
  const baseLevel = diagnosticLevel ?? 0;
  const xpLevel = Math.floor((xp || 0) / 100);
  const level = baseLevel + xpLevel;
  const xpActual = ((xp || 0) % 100);
  const porcentaje = (xpActual / 100) * 100;

  const logros = [
    {
      id: 1,
      emoji: "🥇",
      nombre: "Primera lección",
      ganado: completedLessons.length >= 1,
    },
    { id: 2, emoji: "🔥", nombre: "Racha de 3 días", ganado: false }, // implementar lógica después
    {
      id: 3,
      emoji: "🗺️",
      nombre: "Explorador",
      ganado: completedLessons.length >= 3,
    },
    {
      id: 4,
      emoji: "⭐",
      nombre: "Maestro",
      ganado: completedLessons.length >= 5,
    },
    { id: 5, emoji: "👨‍🍳", nombre: "Chef experto", ganado: xp >= 500 },
    { id: 6, emoji: "💎", nombre: "Perfeccionista", ganado: false },
  ];

  const handleReset = () => {
    const confirmed = window.confirm(
      "¿Estás seguro? Esto borrará todo tu progreso (XP, lecciones, badges). Esta acción no se puede deshacer.",
    );
    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-stone-800">
          Perfil
        </h1>
      
      </header>

      {/* Card principal de perfil */}
      <div className="mb-4 rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-forest-dark bg-forest font-display text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase() || "?"}
          </div>

          {/* Info del usuario */}
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-stone-800">
              {user.name || "Nombre del usuario"}
            </h2>
            <p className="text-sm font-bold text-stone-500">
              Cocinero · Nivel {level}
            </p>

            {/* Stats en pills */}
            <div className="mt-3 flex gap-2">
              <div className="rounded-xl border-2 border-stone-200 bg-stone-50 px-3 py-2 text-center">
                <p className="font-display text-lg font-bold text-forest">
                  {completedLessons.length}
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                  Recetas
                </p>
              </div>

              <div className="rounded-xl border-2 border-stone-200 bg-stone-50 px-3 py-2 text-center">
                <p className="font-display text-lg font-bold text-forest">
                  {xp}
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                  XP
                </p>
              </div>

             {/*<div className="rounded-xl border-2 border-stone-200 bg-stone-50 px-3 py-2 text-center">
                <p className="font-display text-lg font-bold text-orange">
                  3🔥
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                  Racha
                </p>
              </div> */} 
            </div>
          </div>
        </div>
      </div>

      {/* Grid de mini cards */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {/* Card de nivel */}
        <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">
            Tu Nivel
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-forest-dark bg-forest font-display text-sm font-bold text-white">
              {level}
            </div>
            <div className="flex-1">
              <div className="h-2.5 overflow-hidden rounded-full border-2 border-green-200 bg-green-50">
                <div
                  className="h-full rounded-full bg-linear-to-r from-forest to-amber transition-all"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-bold text-forest">
                {xpActual} / 100 XP
              </p>
            </div>
          </div>
        </div>

        {/* Card de recetas */}
        <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">
            Recetas
          </p>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="font-display text-xl font-bold text-orange">
                {completedLessons.length} Recetas
              </p>
              <p className="text-xs font-bold text-stone-500">¡Eso tilín!</p>
            </div>
          </div>
        </div>

        {/* Card de logros - ocupa 2 columnas */}
        <div className="col-span-2 rounded-2xl border-2 border-stone-200 bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">
            Logros
          </p>
          <div className="flex flex-wrap gap-2">
            {logros.map((logro) => (
              <div
                key={logro.id}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all ${
                  logro.ganado
                    ? "border-2 border-amber bg-amber-50"
                    : "border-2 border-stone-200 bg-stone-100"
                }`}
                title={logro.nombre}
              >
                {logro.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recetas recientes */}
      <section className="mb-5">
        <h2 className="mb-3 font-display text-xl font-bold text-stone-800">
          Recetas recientes
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {lessons
            .filter((lesson) => completedLessons.includes(lesson.id))
            .slice(0, 3)
            .map((lesson) => (
              <div
                key={lesson.id}
                className="overflow-hidden rounded-2xl border-2 border-stone-200 bg-white"
              >
                <div className="relative flex h-20 items-center justify-center bg-linear-to-br from-amber-50 to-orange-50 text-4xl">
                  {lesson.dishEmoji}
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                    ✓
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-xs font-bold text-stone-700">
                    {lesson.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Zona de peligro */}
      <div className="rounded-3xl border-2 border-red-400 bg-red-50 p-5">
        <p className="mb-2 text-base font-bold text-red-800">Zona de peligro</p>
        <p className="mb-4 text-sm text-red-700">
          Restablecer tu progreso borrará todo tu XP, lecciones y badges.
        </p>
        <button
          onClick={handleReset}
          className="w-full rounded-xl border-2 border-red-400 bg-white px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 transition-colors"
        >
          Restablecer progreso
        </button>
      </div>
    </div>
  );
};

export default Profile;
