import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga las categorías al montar
  useEffect(() => {
    categoryService.getAll()
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const createCategory = async (category) => {
    const newCategory = await categoryService.create(category);
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = async (id) => {
    await categoryService.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return { categories, loading, error, createCategory, deleteCategory };
}