const BASE_URL = "http://localhost:8080/cookingo/recipes";

export const recipeService = {
  // Trae todas las recetas
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if(!res.ok){
      throw new Error("Error al obtener recetas");
    }
    return res.json();
  },

  //buscar receta por id

  getById: async(id) =>{
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok){
      throw new Error("Error al obtener receta");
    }
    return res.json();
  },


  // Crea una receta nueva
  create: async (recipe) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!res.ok) throw new Error("Error al crear receta");
    return res.json();
  },

  // Actualiza una receta
  update: async (id, recipe) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!res.ok) throw new Error("Error al actualizar receta");
    return res.json();
  },

  complete: async (recipeId, userId) => {
    const res = await fetch(`${BASE_URL}/${recipeId}/complete/${userId}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Error al completar receta");
  },

  // Borra una receta
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar receta");
  },
};