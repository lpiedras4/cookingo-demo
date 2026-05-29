const BASE_URL = "http://localhost:8080/cookingo/users";

export const userService = {

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Error al cargar usuario");
    return res.json();
  },

  create: async (user) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
  },

  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Error al iniciar sesión");
    return res.json();
  },

  assignLevel: async (id, level) => {
    const res = await fetch(`${BASE_URL}/${id}/level?level=${level}`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Error al asignar nivel");
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al borrar usuario");
  },
};