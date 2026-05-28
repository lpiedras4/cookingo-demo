import React, { useState } from "react";
/* @param {{
 *   ingredients: import("../../data/lessons").Ingredient[],
 *   onNext: () => void,
 *   onPrev: () => void
 * }} props
 */
const IngredientsScreen = ({ ingredients, onNext, onPrev }) => {
  //Array de IDs de ingredientes ya añadidos
  const [selectedIds, setSelectedIds] = useState([]);

  //Ingrediente cuyo modal está abierto (null = modal cerrado)
  const [activeIngredient, setActiveIngredient] = useState(null);

  //Estado derivado, checa si todos los ingredientes estan en la canasta
  const allSelected = selectedIds.length === ingredients.length;

  const totalPrice = selectedIds.reduce((sum, id) => {
    const ingredient = ingredients.find((ing) => ing.id === id);
    return sum + (ingredient?.price || 0);
  }, 0);

  const handleTileClick = (ingredient) => {
    setActiveIngredient(ingredient);
  };

  const handleAddToBasket = () => {
    if (activeIngredient && !selectedIds.includes(activeIngredient.id)) {
      setSelectedIds([...selectedIds, activeIngredient.id]);
    }
    setActiveIngredient(null);
  };

  const handleCloseModal = () => {
    setActiveIngredient(null);
  };

  return (
    <div className="space-y-6 pb-24">
    
      {/* Header */}
      <header className="text-center">
        <h2 className="font-display text-2xl font-bold text-stone-800">
          🛒 Compra los ingredientes
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Toca cada ingrediente para conocer sus beneficios nutricionales
        </p>

        {/* Progreso de selección */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold text-stone-700">
            {selectedIds.length} / {ingredients.length}
          </span>
          <span className="text-xs text-stone-400">en la canasta</span>
        </div>
      </header>
      {/* Grid de ingredientes */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {ingredients.map((ingredient) => {
          const isSelected = selectedIds.includes(ingredient.id);

          return (
            <button
              key={ingredient.id}
              onClick={() => handleTileClick(ingredient)}
              disabled={isSelected}
              className={`
                relative rounded-2xl p-4 text-center transition-all
                ${
                  isSelected
                    ? "bg-green-100 border-2 border-green-400 opacity-60 cursor-not-allowed"
                    : "bg-orange border-2 border-orange-dark hover:scale-105 active:scale-95"
                }
              `}
            >
              {/* Emoji del ingrediente */}
              <div className="text-4xl" aria-hidden="true">
                {ingredient.emoji}
              </div>

              {/* Nombre */}
              <p
                className={`mt-2 text-sm font-bold ${isSelected ? "text-green-800" : "text-white"}`}
              >
                {ingredient.name}
              </p>

           
              <p
                className={`mt-1 text-xs font-semibold ${isSelected ? "text-green-700" : "text-white/80"}`}
              >
                ${ingredient.price} MXN
              </p>

              {/* Checkmark si está seleccionado */}
              {isSelected && (
                <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {/* Modal de tarjeta nutricional */}
      {activeIngredient && (
        <NutritionalCard
          ingredient={activeIngredient}
          onAdd={handleAddToBasket}
          onClose={handleCloseModal}
        />
      )}
  
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-200 py-4 px-2 shadow-nav md:left-18 z-30">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between gap-4">
            {/* Info del carrito */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                🛒
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500 font-semibold">
                  Canasta
                </p>
                <p className="font-display text-xl font-bold text-forest">
                  ${totalPrice} MXN
                </p>
              </div>
            </div>

            {/* Botón de continuar */}
            <button
              onClick={onNext}
              disabled={!allSelected}
              className={`
                rounded-xl px-6 py-3 font-bold text-white transition-all
                ${
                  allSelected
                    ? "bg-forest hover:bg-forest-dark"
                    : "bg-stone-300 cursor-not-allowed"
                }
              `}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function NutritionalCard({ ingredient, onAdd, onClose }) {
  return (
    <>
      {/* Backdrop - fondo oscuro que ocupa toda la pantalla */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card - centrada en pantalla */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto animate-scale-in">
        <div className="rounded-3xl bg-white p-6 shadow-2xl">
          {/* Header de la card */}
          <div className="text-center">
            <div className="text-5xl" aria-hidden="true">
              {ingredient.emoji}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-stone-800">
              {ingredient.name}
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              {ingredient.description}
            </p>
          </div>

          {/* Info nutricional en cards de color */}
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-green-50 p-3 border border-green-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-800">
                ✓ Beneficios nutricionales
              </p>
              <p className="mt-1 text-sm text-green-900">
                {ingredient.nutritionNote}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                📏 Porción recomendada
              </p>
              <p className="mt-1 text-sm text-amber-900">
                {ingredient.portionNote}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-stone-300 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onAdd}
              className="flex-1 rounded-xl bg-forest py-3 text-sm font-bold text-white hover:bg-forest-dark transition-colors"
            >
              Añadir a canasta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IngredientsScreen;
