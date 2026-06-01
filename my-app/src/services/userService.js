const BASE_URL = "http://localhost:8080/cookingo/users";

export const userService = {

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    const responseText = await res.text();

    if (!res.ok) {
      throw new Error(responseText || "Error al cargar usuario");
    }

    return responseText ? JSON.parse(responseText) : null;
  },

  create: async (user) => {
    /*
    console.log("Payload enviado a SpringBoot: ", user);
    */
    
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const responseText = await res.text();
    /*
    console.log("Status:", res.status);
    console.log("Respuesta backend:", responseText);
    */
    
    if (!res.ok){
      throw new Error(responseText || "Error al crear usuario");
    } 


    return responseText ? JSON.parse(responseText) : null;
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const responseText = await res.text();

    if (!res.ok) {
      throw new Error(responseText || "Error al iniciar sesión");
    }

    return responseText ? JSON.parse(responseText) : null;
  },

  assignLevel: async (id, level) => {
    const res = await fetch(`${BASE_URL}/${id}/level?level=${level}`, {
      method: "PUT",
    });
     const responseText = await res.text();

    if (!res.ok) {
      throw new Error(responseText || "Error al asignar nivel");
    }

    return responseText ? JSON.parse(responseText) : null;
  },

  addXp: async (id, xp) => {
    if(xp == null || xp < 0){
      xp = 0; // Evita enviar valores negativos o nulos al backend
    }
    const res = await fetch(`${BASE_URL}/${id}/xp?xp=${xp}`, {
      method: "PUT",
    });
     const responseText = await res.text();

    if (!res.ok) {
      throw new Error(responseText || "Error al agregar XP");
    }
    return responseText ? JSON.parse(responseText) : null;
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const responseText = await res.text();

    if (!res.ok) {
      throw new Error(responseText || "Error al borrar usuario");
    }
  },
};