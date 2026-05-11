import React from 'react'
import {useProgress} from "../../hooks/useProgress"
const Profile = () => {
  const {xp, completedLessons, badges, resetProgress} = useProgress();
  const level = Math.floor(xp / 100) + 1;

  const handleReset = () => {
//Ventana de confirmación antes de borrar todo
const confirmed = window.confirm( "¿Estás seguro? Esto borrará todo tu progreso (XP, lecciones, badges). Esta acción no se puede deshacer.");
if(confirmed){
  resetProgress();
}
  };


  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <header className="mb-6 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-amber to-orange flex items-center justify-center text-4xl">
          👤
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-forest">
          Mi Perfil
        </h1>
      </header>

      <div className="space-y-4">
        {/* Cards de stats (igual que antes) */}
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Nivel actual</p>
          <p className="mt-1 font-display text-5xl font-bold text-amber">{level}</p>
          <div className="mt-4 h-2 rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-amber transition-all"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {xp % 100} / 100 XP para nivel {level + 1}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Experiencia total</p>
          <p className="mt-1 font-display text-5xl font-bold text-forest">{xp} XP</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Lecciones completadas</p>
          <p className="mt-1 font-display text-5xl font-bold text-stone-800">
            {completedLessons.length}
          </p>
        </div>

        {/* Botón de reset — zona de peligro */}
        <div className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Zona de peligro</p>
          <p className="mt-1 text-xs text-red-600">
            Restablecer tu progreso borrará todo tu XP, lecciones y badges.
          </p>
          <button
            onClick={handleReset}
            className="mt-3 w-full rounded-xl border-2 border-red-400 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
          >
            Restablecer progreso
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
