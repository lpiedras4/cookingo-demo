const BASE_URL = "http://localhost:8080/cookingo/diagnostic-exam";

export const diagnosticExamService = {

  // Guarda el resultado del examen cuando el usuario termina
  submit: async (userId, score) => {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({score: score}),
    });
    if (!res.ok) throw new Error("Error al guardar examen");
  },

  // Trae el resultado guardado (para saber si ya lo hizo)
  getByUser: async (userId) => {
    const res = await fetch(`${BASE_URL}/user/${userId}`);
    if (!res.ok) throw new Error("Error al cargar resultado");
    return res.json();
  },
};