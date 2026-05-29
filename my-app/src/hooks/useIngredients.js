import { useState, useEffect } from "react";
import { ingredientService } from "../services/ingredientService";

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga los ingredientes al montar
  useEffect(() => {
    ingredientService.getAll()
      .then(setIngredients)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const createIngredient = async (ingredient) => {
    const newIngredient = await ingredientService.create(ingredient);
    setIngredients((prev) => [...prev, newIngredient]);
  };

  const deleteIngredient = async (id) => {
    await ingredientService.delete(id);
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  return { ingredients, loading, error, createIngredient, deleteIngredient };
}