const BASE_URL = "http://localhost:8080/cookingo/ingredients";

export const ingredientService = {
  // Trae todos los ingredientes
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al cargar ingredientes");
    return res.json();
  },

  // Crea un ingrediente nuevo
  create: async (ingredient) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient),
    });
    if (!res.ok) throw new Error("Error al crear ingrediente");
    return res.json();
  },

  // Actualiza un ingrediente
  update: async (id, ingredient) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient),
    });
    if (!res.ok) throw new Error("Error al actualizar ingrediente");
    return res.json();
  },

  // Borra un ingrediente
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar receta");
  },
};