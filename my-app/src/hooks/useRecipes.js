import { useState, useEffect } from "react";
import { recipeService } from "../services/recipeService";

export function useRecipes() {
  const [recipes, setRecipes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Carga las recetas al montar
  
  useEffect(() => {
    recipeService.getAll()
      .then(setRecipes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const createRecipe = async (recipe) => {
    const newRecipe = await recipeService.create(recipe);
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const deleteRecipe = async (id) => {
    await recipeService.delete(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return { recipes, loading, error, createRecipe, deleteRecipe };
}