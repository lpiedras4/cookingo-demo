import React from 'react'

const Recipes = () => {
  return (
    <div>
      <h1> Recetas</h1>
      <div className="flex">
        Aquí va la lista de recetas
      </div>
      <button className="w-full rounded-2xl bg-forest py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all">Obtener Recetas</button>
    </div>
  )
}

export default Recipes
