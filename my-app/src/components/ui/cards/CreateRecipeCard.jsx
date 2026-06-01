import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useIngredients } from "../../../hooks/useIngredients";
const CreateRecipeCard = ({ onClose, onCreate }) => {
  /**
   * @property {string}        id
   * @property {string}        name
   * @property {string}        cuisine         - tipo (ej. "Desayuno saludable")
   * @property {string}        description     - descripción corta para el hero (pantalla 1/5)
   * @property {Ingredient[]}  ingredients     - pantalla 2/5
   * @property {string[]}      prepOrder       - pasos en el orden correcto (pantalla 3/5)
   * @property {CookingStep[]} cookingSteps    - pasos con quiz (pantalla 4/5)
   *
   */

  const { ingredients, loadingIngredients, ingredientError } = useIngredients();
  const [formData, setFormData] = useState({
    name: "",
    levelId: 1,
    categoryId: 1,
    imageUrl: "",
    totalCalories: "",
    totalProteins: "",
    ingredients: [{ ingredientId: "", amount: "" }],
    ingredientPreparation: [""],
    cookingPreparation: [""],
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepChange = (type, index, value) => {
    setFormData((prev) => {
      const updatedSteps = [...prev[type]];
      updatedSteps[index] = value;
      return {
        ...prev,
        [type]: updatedSteps,
      };
    });
  };

  const addStep = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeStep = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.ingredients];

      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };

      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredientId: "", amount: "" }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      const recipeToSend = {
        name: formData.name,
        levelId: Number(formData.levelId),
        categoryId: Number(formData.categoryId),
        imageUrl: formData.imageUrl,
        totalCalories: Number(formData.totalCalories),
        totalProteins: Number(formData.totalProteins),
        ingredients: formData.ingredients
          .filter(
            (ingredient) =>
              ingredient.ingredientId !== "" && ingredient.amount.trim() !== "",
          )
          .map((ingredient) => ({
            ingredientId: Number(ingredient.ingredientId),
            amount: ingredient.amount,
          })),
        ingredientPreparation: formData.ingredientPreparation.filter(
          (step) => step.trim() != "",
        ),
        cookingPreparation: formData.cookingPreparation.filter(
          (step) => step.trim() != "",
        ),
      };

      await onCreate(recipeToSend);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className="max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6 mx-auto rounded-md shadow-md bg-forest-dark"
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-white capitalize">
          Crear receta
        </h2>

        <XMarkIcon
          onClick={onClose}
          className="h-6 w-6 text-white hover:text-amber cursor-pointer"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-200" htmlFor="name">
              Nombre de la receta
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Avena de noche"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-200" htmlFor="categoryId">
              Tipo de comida
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="1">Desayuno</option>
              <option value="2">Comida</option>
              <option value="3">Cena</option>
            </select>
          </div>

          <div>
            <label className="text-gray-200" htmlFor="levelId">
              Nivel
            </label>
            <select
              id="levelId"
              name="levelId"
              value={formData.levelId}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="1">Nivel 1 - Fácil</option>
              <option value="2">Nivel 2 - Intermedio</option>
              <option value="3">Nivel 3 - Avanzado</option>
            </select>
          </div>

          <div>
            <label className="text-gray-200" htmlFor="imageUrl">
              URL de imagen
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://images.unsplash.com/..."
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-200" htmlFor="totalCalories">
              Calorías totales
            </label>
            <input
              id="totalCalories"
              name="totalCalories"
              type="number"
              value={formData.totalCalories}
              onChange={handleChange}
              required
              placeholder="350"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-200" htmlFor="totalProteins">
              Proteínas totales
            </label>
            <input
              id="totalProteins"
              name="totalProteins"
              type="number"
              value={formData.totalProteins}
              onChange={handleChange}
              required
              placeholder="14"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <h3 className="mb-3 font-display text-xl font-bold text-white">
            Ingredientes
          </h3>

          {loadingIngredients && (
            <p className="text-sm font-bold text-amber">
              Cargando ingredientes...
            </p>
          )}

          {ingredientError && (
            <p className="text-sm font-bold text-red-300">{ingredientError}</p>
          )}

          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
              >
                <select
                  value={ingredient.ingredientId}
                  onChange={(event) =>
                    handleIngredientChange(
                      index,
                      "ingredientId",
                      event.target.value,
                    )
                  }
                  className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-amber focus:outline-none focus:ring focus:ring-amber focus:ring-opacity-40"
                >
                  <option value="">Selecciona ingrediente</option>

                  {ingredients.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={ingredient.amount}
                  onChange={(event) =>
                    handleIngredientChange(index, "amount", event.target.value)
                  }
                  placeholder="Cantidad: 1/2 taza (45 g)"
                  className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-amber focus:outline-none focus:ring focus:ring-amber focus:ring-opacity-40"
                />

                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="rounded-md bg-red-500 px-3 font-bold text-white hover:bg-red-600"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="mt-3 rounded-full bg-amber px-4 py-2 text-sm font-extrabold text-white hover:bg-amber-dark"
          >
            + Agregar ingrediente
          </button>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <h3 className="mb-3 font-display text-xl font-bold text-white">
            Preparación de ingredientes
          </h3>

          <div className="space-y-3">
            {formData.ingredientPreparation.map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(event) =>
                    handleStepChange(
                      "ingredientPreparation",
                      index,
                      event.target.value,
                    )
                  }
                  placeholder={`Paso ${index + 1}`}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
                />

                {formData.ingredientPreparation.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep("ingredientPreparation", index)}
                    className="rounded-md bg-red-500 px-3 font-bold text-white hover:bg-red-600"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addStep("ingredientPreparation")}
            className="mt-3 rounded-full bg-amber px-4 py-2 text-sm font-extrabold text-white hover:bg-amber-dark"
          >
            + Agregar paso
          </button>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <h3 className="mb-3 font-display text-xl font-bold text-white">
            Preparación del platillo
          </h3>

          <div className="space-y-3">
            {formData.cookingPreparation.map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(event) =>
                    handleStepChange(
                      "cookingPreparation",
                      index,
                      event.target.value,
                    )
                  }
                  placeholder={`Paso ${index + 1}`}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-amber focus:ring-amber focus:ring-opacity-40 focus:outline-none focus:ring"
                />

                {formData.cookingPreparation.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep("cookingPreparation", index)}
                    className="rounded-md bg-red-500 px-3 font-bold text-white hover:bg-red-600"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addStep("cookingPreparation")}
            className="mt-3 rounded-full bg-amber px-4 py-2 text-sm font-extrabold text-white hover:bg-amber-dark"
          >
            + Agregar paso
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-amber rounded-md hover:bg-amber-dark focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? "Creando..." : "Crear nueva receta"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipeCard;
