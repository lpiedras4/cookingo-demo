const BASE_URL = "http://localhost:8080/cookingo/tools";

export const toolService = {
  // Trae todos los utensilios
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al cargar utensilios");
    return res.json();
  },

  // Crea un utensilio nuevo
  create: async (tool) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tool),
    });
    if (!res.ok) throw new Error("Error al crear utensilio");
    return res.json();
  },

  // Actualiza un utensilio
  update: async (id, tool) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tool),
    });
    if (!res.ok) throw new Error("Error al actualizar utensilio");
    return res.json();
  },

  // Borra un utensilio
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar utensilio");
  },
};