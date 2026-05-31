import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 animate-fade-in">
      <article className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-green-mint p-6 shadow-2xl animate-scale-in md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-white p-2 text-stone-700 shadow-card transition hover:bg-forest hover:text-white"
          aria-label="Cerrar receta"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="mb-6">
              <span className="mb-3 inline-flex rounded-full bg-forest px-4 py-1 text-sm font-black text-white">
                {recipe.type} · Nivel {recipe.difficulty}
              </span>

              <h2 className="text-4xl font-black text-stone-950 md:text-6xl">
                {recipe.name}
              </h2>
            </div>

            <section className="border-b border-stone-300 pb-6">
              <h3 className="mb-3 text-2xl font-black text-stone-900">
                Ingredientes
              </h3>

              <div className="space-y-2">
                {recipe.ingredients?.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <p
                      key={index}
                      className="text-base font-semibold text-stone-700"
                    >
                      {ingredient}
                    </p>
                  ))
                ) : (
                  <p className="text-base font-semibold text-stone-500">
                    No hay ingredientes registrados.
                  </p>
                )}
              </div>
            </section>

            <section className="border-b border-stone-300 py-6">
              <h3 className="mb-3 text-2xl font-black text-stone-900">
                Preparación de ingredientes
              </h3>

              <div className="space-y-2">
                {recipe.ingredientPreparation?.map((step, index) => (
                  <p
                    key={index}
                    className="text-base font-semibold text-stone-700"
                  >
                    {step}
                  </p>
                ))}
              </div>
            </section>

            <section className="pt-6">
              <h3 className="mb-3 text-2xl font-black text-stone-900">
                Preparación del platillo
              </h3>

              <ul className="space-y-2">
                {recipe.cookingPreparation?.map((step, index) => (
                  <li
                    key={index}
                    className="ml-5 list-disc text-base font-semibold text-stone-700"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          <aside className="flex items-center">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="h-75 w-full rounded-3xl object-cover shadow-xl md:h-[430px]"
            />
          </aside>
        </div>
      </article>
    </div>
  );
};

export default RecipeModal;
