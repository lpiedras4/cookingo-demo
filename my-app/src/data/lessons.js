/**
 * @typedef {Object} Ingredient
 * @property {string} id        - identificador único (ej. "lentejas")
 * @property {string} name      - nombre visible (ej. "Lentejas")
 * @property {string} emoji     - emoji para la UI
 * @property {string} amount    - cantidad (ej. "1 taza")
 */

import badge from "daisyui/components/badge";

/**
 * @typedef {Object} QuizStep
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 * @property {number} xp
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} name
 * @property {string} cuisine
 * @property {string} description
 * @property {string} dishEmoji
 * @property {number} costPerServing
 * @property {string} costCurrency
 * @property {number} servings
 * @property {{icon: string, title: string, detail: string}[]} highlights
 * @property {Ingredient[]} ingredients
 * @property {string[]} prepOrder
 * @property {QuizStep[]} cookingSteps
 * @property {string} badge
 */


/***@type {Lesson[]} */
export const lessons = [
  {
  id: "overnight-oats",
  name:"Overnight Oats",
  description: "Avena remojada en frío: un desayuno cremoso, nutritivo y listo al despertar. 5 minutos de prep.",
  dishEmoji:"🥣",
  costPerServing: 25,
  costCurrency: "MXN",
  servings: 2,
  highlights: [
    {icon: "🌙", title: "Se prepara la noche anterior", detail: "Listo en 5 min antes de dormir" },
      { icon: "🌾", title: "Energía de liberación lenta",  detail: "Beta-glucanos que sacian por horas" },
      { icon: "🌱", title: "Vegano y sin gluten*",         detail: "*Con avena certificada sin gluten" }
  ],
  ingredients: [ { id: "avena",     name: "Copos de avena",      emoji: "🌾", amount: "1/2 taza (45 g)" },
      { id: "leche",     name: "Leche vegetal",       emoji: "🥛", amount: "1/2 taza (120 ml)" },
      { id: "cacahuete", name: "Crema de cacahuete",  emoji: "🥜", amount: "2 cdas. (30 g)" },
      { id: "lino",      name: "Semillas de lino",    emoji: "🌱", amount: "1 cda. (10 g)" },
      { id: "canela",    name: "Canela en polvo",     emoji: "🌿", amount: "1/2 cdita" },
      { id: "miel",      name: "Miel",                emoji: "🍯", amount: "1 cdita" },
    ],
    prepOrder: [
      "Elegir un frasco de cristal con tapa hermética",
      "Medir 1/2 taza de copos de avena finos",
      "Medir 1/2 taza de leche vegetal fría",
      "Preparar los toppings (plátano, arándanos)",
      "Reservar espacio en la nevera (mínimo 4 h)",
    ],
    cookingSteps: [

      {
        question: "¿Por qué se hidrata la avena en frío y no caliente?",
        options: [
          "Porque calentarla destruye las vitaminas",
          "Para que absorba lentamente y conserve textura cremosa sin hacerse papilla",
          "Porque el frío añade probióticos",
        ],
        correctIndex: 1,
        xp: 20,
      },
      
      // ... más pasos
    ],
    badge : "Madrugador saludable",
  },
];

/**
 * Buscar lección por su id.
 * @param {string} id
 * @returns {Lesson | undefined}
 */

export function getLesson(id){
   return lessons.find((l => l.id === id));
}

export const TOTAL_SCREENS = 5; /**
Pantallas:
- Bienvenida
- Ingredientes
- Preparación de Ingredientes
- Pasos de cocinar platillo
- Resultados
*/