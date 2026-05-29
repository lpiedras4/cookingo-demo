const BASE_URL = "http://localhost:8080/cookingo/category";

export const categoryService = {
  // Trae todas las categorías
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al cargar categorías");
    return res.json();
  },

  // Crea una categoría nueva
  create: async (category) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Error al crear categoría");
    return res.json();
  },

  // Actualiza una categoría
  update: async (id, category) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Error al actualizar categoría");
    return res.json();
  },

  // Borra una categoría
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar categoría");
  },
};