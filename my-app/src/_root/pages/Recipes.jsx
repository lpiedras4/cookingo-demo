  import React from "react";
  import { useState } from "react";
  import { useRecipes } from "../../hooks/useRecipes";
  import { useUsers } from "../../hooks/useUsers";
  import CreateRecipeCard from "../../components/ui/cards/CreateRecipeCard";
  const Recipes = () => {
    const [showForm, setShowForm] = useState(false);
    const { recipes, createRecipe, deleteRecipe } = useRecipes();
    const { user } = useUsers();
    const isAdmin = user?.role === "admin";
    return (
      <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <header className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-stone-800">
          Recetas
          </h1>
          <div className="space-x-3 sm:flex flex">
            {isAdmin && (
              <button
                onClick={() => setShowForm(true)}
                className="rounded-full border-b-4 border-forest-dark bg-forest px-5 py-2.5 font-body text-sm font-extrabold text-white hover:bg-forest-dark transition-colors"
              >
                + Crear receta
              </button>
            )}
          </div>
        </header>
        <div className="flex">Aquí va la lista de recetas</div>
        <button className="w-full rounded-2xl bg-forest py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all">
          Obtener Recetas
        </button>
      
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <CreateRecipeCard onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    );
  };

  export default Recipes;
