import { useRecipes } from "../../hooks/useRecipes";
import { useUsers } from "../../hooks/useUsers";
import CreateRecipeCard from "../../components/ui/cards/CreateRecipeCard";
import React, { useState } from "react";

import RecipeCard from "../../components/ui/cards/RecipeCard";
import DifficultyBadge from "../../components/ui/DifficultyBadge";
import RecipeModal from "../../components/ui/RecipeModal";
import { useUsers } from "../../hooks/useUsers";
const RecipesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useUsers();
  const isAdmin = user?.role === "ADMIN";
  const { recipes, createRecipe, deleteRecipe } = useRecipes();
  const { user } = useUsers();
  const isAdmin = user?.role === "admin";

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesType =
      selectedType === "Todos" || recipe.type === selectedType;

    const matchesDifficulty =
      selectedDifficulty === "Todos" ||
      recipe.levelId === Number(selectedDifficulty);

    return matchesType && matchesDifficulty;
  });

  return (
    <main className="min-h-screen bg-green-mint px-5 py-8 md:px-8 lg:ml-[260px] lg:px-10 xl:px-14">
      <section className="mb-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-forest">
              Recetario saludable
            </p>

            <h1 className="text-4xl font-black leading-tight text-stone-950 sm:text-5xl md:text-6xl xl:text-7xl">
              Explora nuevas recetas
            </h1>

            <p className="mt-4 max-w-2xl text-base font-semibold text-stone-700 md:text-lg">
              Encuentra platillos saludables por tipo de comida y dificultad.
              Abre una receta para ver sus ingredientes y preparación completa.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="w-fit rounded-full border-b-4 border-forest-dark bg-forest px-5 py-2.5 font-body text-sm font-extrabold text-white transition-colors hover:bg-forest-dark"
            >
              + Crear receta
            </button>
          )}
        </div>
      </section>

      <section className="mb-10 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="rounded-full bg-white px-5 py-3 shadow-card">
            <label className="block text-xs font-black text-stone-400">
              Tipo
            </label>

            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="bg-transparent text-sm font-black text-stone-900 outline-none"
            >
              <option>Todos</option>
              <option>Desayuno</option>
              <option>Comida</option>
              <option>Cena</option>
            </select>
          </div>

          <div className="rounded-full bg-white px-5 py-3 shadow-card">
            <label className="block text-xs font-black text-stone-400">
              Dificultad
            </label>

            <select
              value={selectedDifficulty}
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              className="bg-transparent text-sm font-black text-stone-900 outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
            </select>
          </div>
        </div>

        <p className="font-extrabold text-stone-600">
          {filteredRecipes.length} recetas disponibles
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={setSelectedRecipe}
          />
        ))}
      </section>

      {filteredRecipes.length === 0 && (
        <div className="mt-12 rounded-3xl bg-white p-8 text-center shadow-card">
          <h2 className="text-2xl font-black text-stone-900">
            No hay recetas con esos filtros
          </h2>

          <p className="mt-2 font-semibold text-stone-600">
            Prueba con otro tipo de platillo o nivel de dificultad.
          </p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8">
          <CreateRecipeCard 
          onClose={() => setShowForm(false)} 
          onCreate={createRecipe}
          />
        </div>
      )}
      

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </main>
  );
};

export default RecipesPage;
