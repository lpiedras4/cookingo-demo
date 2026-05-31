import React from 'react'
import DifficultyBadge from '../DifficultyBadge';
const RecipeCard = ({recipe, onClick}) => {
  const difficultyLabels = {
  1: "Fácil",
  2: "Intermedio",
  3: "Avanzado",
};
   return (
    <button
      onClick={() => onClick(recipe)}
      className="group w-full text-left rounded-3xl bg-white/80 p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-cream">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 rounded-full bg-green-mint px-3 py-1 text-xs font-black text-forest">
          {recipe.type}
        </div>
      </div>

      <div className="mt-4 space-y-2 px-1 pb-2">
        <h3 className="text-xl font-black text-stone-900">{recipe.name}</h3>

        <p className="text-sm font-semibold text-stone-500">
          {difficultyLabels[recipe.difficulty]}
        </p>

        <DifficultyBadge difficulty={recipe.difficulty} />
      </div>
    </button>
  );
}

export default RecipeCard
