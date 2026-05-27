import React from "react";
import { Link } from "react-router-dom";
import { lessons } from "../../data/lessons";
import { useProgress } from "../../hooks/useProgress";
import { useState } from "react";
import CreateRecipeCard from "../../components/ui/cards/CreateRecipeCard";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { xp, completedLessons } = useProgress();
  const level = Math.floor(xp / 100) + 1;
  const xpActual = xp % 100;
  const porcentaje = (xpActual / 100) * 100;
  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      {/* Header con logo y botón */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-stone-800">
          Cookin<span className="text-orange">Go</span>
        </h1>
        <div className="space-x-3 sm:flex flex">
          <button className="rounded-full border-b-4 border-forest-dark bg-forest px-5 py-2.5 font-body text-sm font-extrabold text-white hover:bg-forest-dark transition-colors">
            + Desafíos
          </button>
          <button 
          onClick={() => setShowForm(true)}
          className="rounded-full border-b-4 border-forest-dark bg-forest px-5 py-2.5 font-body text-sm font-extrabold text-white hover:bg-forest-dark transition-colors">
            + Crear receta
          </button>
        </div>
      </header>

      {showForm && (
        <div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <CreateRecipeCard onClose={()=> setShowForm(false)}/>
        </div>
      )}



      {/* Card de XP y nivel */}
      <div className="mb-6 rounded-3xl border-2 border-green-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-forest-dark bg-forest font-display text-2xl font-bold text-white">
            {level}
          </div>

          {/* Info de nivel y XP */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
              Tu progreso
            </p>
            <p className="font-display text-2xl font-bold text-forest">
              Nivel {level}
            </p>

            {/* Barra de progreso */}
            <div className="mt-3 h-3 overflow-hidden rounded-full border-2 border-green-200 bg-green-50">
              <div
                className="h-full rounded-full bg-linear-to-r from-forest to-amber transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="mt-1 text-xs font-bold text-forest">
              {xpActual} / 100 XP para nivel {level + 1}
            </p>
          </div>

          {/* Stats */}
          <div className="hidden md:flex gap-2">
            <div className="rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-center">
              <p className="font-display text-xl font-bold text-forest">{xp}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                XP Total
              </p>
            </div>
            <div className="rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-center">
              <p className="font-display text-xl font-bold text-orange">
                {completedLessons.length}
              </p>
              <p className="text-xs font-bold uppercase tracking-wide text-stone-400">
                Recetas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de lecciones disponibles */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-stone-800">
            Lecciones disponibles
          </h2>
          <span className="text-sm font-semibold text-stone-500">
            {lessons.length} recetas
          </span>
        </div>

        {/* Grid de lecciones */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className="group relative overflow-hidden rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-card transition-all hover:scale-105 hover:shadow-lg"
              >
                {/* Badge de completada */}
                {isCompleted && (
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                    ✓
                  </div>
                )}

                {/* Emoji */}
                <div className="mb-3 text-5xl">{lesson.dishEmoji}</div>

                {/* Nombre */}
                <h3 className="font-display text-xl font-bold text-stone-800 group-hover:text-forest transition-colors">
                  {lesson.name}
                </h3>

                {/* Tipo de cocina */}
                <p className="mt-1 text-sm text-stone-500">{lesson.cuisine}</p>

                {/* XP y costo */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-amber">
                      ✨ {lesson.totalXp} XP
                    </span>
                  </div>
                  <div className="text-stone-500">
                    ${lesson.costPerServing} MXN
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sección de recetas completadas */}
      {completedLessons.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-stone-800">
            Recetas completadas
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {lessons
              .filter((lesson) => completedLessons.includes(lesson.id))
              .map((lesson) => (
                <div
                  key={lesson.id}
                  className="overflow-hidden rounded-xl border-2 border-green-200 bg-white"
                >
                  {/* Placeholder de imagen - reemplaza con imagen real si tienes */}
                  <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 text-4xl">
                    {lesson.dishEmoji}
                    <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
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
      )}
    </div>
  );
};

export default Home;
