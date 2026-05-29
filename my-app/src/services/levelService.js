const BASE_URL = "http://localhost:8080/cookingo/level";

export const levelService = {
  // Trae todos los niveles
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al cargar niveles");
    return res.json();
  },

  // Crea un nivel nuevo
  create: async (level) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(level),
    });
    if (!res.ok) throw new Error("Error al crear nivel");
    return res.json();
  },

  // Actualiza un nivel
  update: async (id, level) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(level),
    });
    if (!res.ok) throw new Error("Error al actualizar nivel");
    return res.json();
  },

  // Borra un nivel
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar nivel");
  },
};