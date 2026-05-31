import { useRecipes } from "../../hooks/useRecipes";
import { useUsers } from "../../hooks/useUsers";
import CreateRecipeCard from "../../components/ui/cards/CreateRecipeCard";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import RecipeCard from "../../components/ui/cards/RecipeCard";
import DifficultyBadge from "../../components/ui/DifficultyBadge";
import RecipeModal from "../../components/ui/RecipeModal";
const recipesMock = [
  {
    id: 1,
    name: "Avena de noche",
    difficulty: 1,
    type: "Desayuno",
    imageUrl:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "1/2 taza (45 g) de copos de avena",
      "1/2 taza (120 ml) de leche vegetal",
      "2 cdas. (30 g) de crema de cacahuate",
      "1 cda. (10 g) de semillas de lino",
      "1/2 cdita de canela en polvo",
      "1 cdita de miel",
    ],
    ingredientPreparation: [
      "Elegir un frasco de cristal con tapa hermética",
      "Medir 1/2 taza de copos de avena finos",
      "Medir 1/2 taza de leche vegetal fría",
      "Preparar los toppings como plátano o arándanos",
      "Reservar espacio en la nevera mínimo 4 horas",
    ],
    cookingPreparation: [
      "Añade los copos de avena al frasco",
      "Vierte la leche vegetal sobre la avena",
      "Añade la crema de cacahuate y las semillas de lino",
      "Agrega la miel y la canela",
      "Mezcla bien todos los ingredientes",
      "Cierra el frasco y refrigera mínimo 4 horas",
    ],
  },
  {
    id: 2,
    name: "Bowl de pollo",
    difficulty: 2,
    type: "Comida",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "1 taza de arroz integral",
      "150 g de pechuga de pollo",
      "1/2 aguacate",
      "1 taza de verduras mixtas",
      "1 cda. de aceite de oliva",
    ],
    ingredientPreparation: [
      "Lavar las verduras",
      "Cortar el aguacate en rebanadas",
      "Cocer el arroz integral",
      "Sazonar la pechuga de pollo",
    ],
    cookingPreparation: [
      "Cocina el pollo en un sartén caliente",
      "Coloca el arroz como base del bowl",
      "Agrega las verduras y el aguacate",
      "Añade el pollo en tiras",
      "Sirve con aceite de oliva",
    ],
  },
  {
    id: 3,
    name: "Tacos de lechuga",
    difficulty: 1,
    type: "Cena",
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "4 hojas grandes de lechuga",
      "120 g de carne molida magra",
      "1/2 tomate picado",
      "1/4 taza de cebolla",
      "1/4 taza de queso bajo en grasa",
    ],
    ingredientPreparation: [
      "Lavar las hojas de lechuga",
      "Picar el tomate y la cebolla",
      "Preparar la carne molida",
    ],
    cookingPreparation: [
      "Cocina la carne molida hasta dorar",
      "Coloca la carne sobre las hojas de lechuga",
      "Agrega tomate, cebolla y queso",
      "Enrolla las hojas como tacos",
    ],
  },
  {
    id: 4,
    name: "Smoothie verde",
    difficulty: 1,
    type: "Desayuno",
    imageUrl:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      "1 plátano",
      "1 taza de espinaca",
      "1/2 taza de yogur griego",
      "1/2 taza de leche vegetal",
      "1 cdita de miel",
    ],
    ingredientPreparation: [
      "Lavar la espinaca",
      "Pelar el plátano",
      "Medir la leche vegetal",
    ],
    cookingPreparation: [
      "Agrega todos los ingredientes a la licuadora",
      "Licúa hasta obtener una mezcla suave",
      "Sirve frío en un vaso",
    ],
  },
];

const Recipes = () => {
  const [showForm, setShowForm] = useState(false);
  const { recipes, createRecipe, deleteRecipe } = useRecipes();
  const { user } = useUsers();
  const isAdmin = user?.role === "admin";

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");

  const filteredRecipes = recipesMock.filter((recipe) => {
    const matchesType =
      selectedType === "Todos" || recipe.type === selectedType;

    const matchesDifficulty =
      selectedDifficulty === "Todos" ||
      recipe.difficulty === Number(selectedDifficulty);

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
        <CreateRecipeCard
          onClose={() => setShowForm(false)}
          onCreate={createRecipe}
        />
      )}

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </main>
  );
};

export default Recipes;
