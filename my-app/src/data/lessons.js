/**
 * Pantalla 2/5 — "Compra los ingredientes"
 * Cada tile del Mercado es un Ingredient.
 * Al tocarlo, se revela la tarjeta nutricional (description + nutritionNote + portionNote).
 *
 * @typedef {Object} Ingredient
 * @property {string} id            - clave única  (ej. "avena")
 * @property {string} name          - nombre visible (ej. "Copos de avena")
 * @property {string} emoji         - emoji del tile
 * @property {string} amount        - cantidad de la receta (ej. "1/2 taza (45 g)")
 * @property {string} description   - frase corta de la tarjeta nutricional
 * @property {string} nutritionNote - nutrientes destacados (ej. "Beta-glucanos, fibra soluble")
 * @property {string} portionNote   - tamaño de porción legible (ej. "1/2 taza (45g)")
 * @property {numbre} price
 */

/**
 * Pantalla 4/5 — "Preparación de platillo"
 * Cada paso tiene instrucción + quiz opcional.
 * `question` y `options` son opcionales — no todos los pasos tienen quiz.
 *
 * @typedef {Object} CookingStep
 * @property {string}    instruction    - qué hacer (ej. "Añade los copos de avena al frasco")
 * @property {string}    [question]     - pregunta del quiz (opcional)
 * @property {string[]}  [options]      - opciones de respuesta
 * @property {number}    [correctIndex] - índice de la opción correcta (0-based)
 * @property {string}    [explanation]  - feedback educativo al responder
 * @property {number}    xp             - XP que otorga este paso (0 si no hay quiz)
 */

/**
 * @typedef {Object} Lesson
 * @property {string}        id
 * @property {string}        name
 * @property {string}        cuisine         - tipo (ej. "Desayuno saludable")
 * @property {string}        description     - descripción corta para el hero (pantalla 1/5)
 * @property {string}        dishEmoji
 * @property {number}        costPerServing
 * @property {string}        costCurrency
 * @property {number}        servings
 * @property {{icon: string, title: string, detail: string}[]} highlights  - pantalla 1/5
 * @property {Ingredient[]}  ingredients     - pantalla 2/5
 * @property {string[]}      prepOrder       - pasos en el orden correcto (pantalla 3/5)
 * @property {CookingStep[]} cookingSteps    - pasos con quiz (pantalla 4/5)
 * @property {string}        badge           - badge desbloqueado al completar (pantalla 5/5)
 * @property {number}        totalXp         - XP total posible de la lección
 */

/** @type {Lesson[]} */
export const lessons = [
  {
    id: "overnight-oats",
    name: "Avena de noche",
    cuisine: "Desayuno saludable",
    description: "Avena remojada en frío: un desayuno cremoso, nutritivo y listo al despertar. 5 minutos de prep.",
    dishEmoji: "🥣",
    costPerServing: 25,
    costCurrency: "MXN",
    servings: 2,

    highlights: [
      {  title: "Se prepara la noche anterior", detail: "Listo en 5 min antes de dormir" },
      {  title: "Energía de liberación lenta",  detail: "Beta-glucanos que sacian por horas" },
      { title: "Vegano y sin gluten",         detail: "Con avena certificada sin gluten" },
    ],

    // Pantalla 2/5: el "Mercado" muestra estas tiles en cuadrícula
    ingredients: [
      {
        id: "avena",
        name: "Copos de avena",
        emoji: "🌾",
        amount: "1/2 taza (45 g)",
        description: "Base del desayuno: absorbe la leche y se vuelve cremosa al hidratarse en frío.",
        nutritionNote: "Beta-glucanos, fibra soluble, magnesio",
        portionNote: "1/2 taza (45g)",
        price: 35,
      },
      {
        id: "leche",
        name: "Leche vegetal",
        emoji: "🥛",
        amount: "1/2 taza (120 ml)",
        description: "Líquido base. Elige sin azúcar añadida para controlar el dulzor total.",
        nutritionNote: "Calcio, vitamina D, proteína vegetal",
        portionNote: "1/2 taza (120ml)",
        price:30
      },
      {
        id: "cacahuate",
        name: "Crema de cacahuate",
        emoji: "🥜",
        amount: "2 cdas. (30 g)",
        description: "Grasa saludable que sacia y aporta cremosidad al mezclar.",
        nutritionNote: "Grasas monoinsaturadas, proteína, vitamina E",
        portionNote: "2 cucharadas (30g)",
        price: 70
      },
      {
        id: "lino",
        name: "Semillas de lino",
        emoji: "🌱",
        amount: "1 cda. (10 g)",
        description: "Pequeñas pero poderosas: omega-3 vegetal y fibra que espesa la textura.",
        nutritionNote: "Omega-3 (ALA), lignanos, fibra insoluble",
        portionNote: "1 cucharada (10g)",
        price: 30
      },
      {
        id: "canela",
        name: "Canela en polvo",
        emoji: "🌿",
        amount: "1/2 cdita",
        description: "Sabor y beneficio: ayuda a regular el azúcar en sangre después de comer.",
        nutritionNote: "Cinnamaldehído, antioxidantes, antiinflamatorio",
        portionNote: "1/2 cucharadita",
        price:40
      },
      {
        id: "miel",
        name: "Miel",
        emoji: "🍯",
        amount: "1 cdita",
        description: "Dulzor natural con menor impacto glucémico que el azúcar refinada.",
        nutritionNote: "Fructosa, antioxidantes, propiedades antimicrobianas",
        portionNote: "1 cucharadita",
        price: 70
      },
    ],

    // Pantalla 3/5: el usuario arrastra en este orden — este array ES la respuesta correcta
    prepOrder: [
      "Elegir un frasco de cristal con tapa hermética",
      "Medir 1/2 taza de copos de avena finos",
      "Medir 1/2 taza de leche vegetal fría",
      "Preparar los toppings (plátano, arándanos)",
      "Reservar espacio en la nevera (mínimo 4 h)",
    ],

    // Pantalla 4/5: pasos de cocción (algunos con quiz, algunos sin)
    cookingSteps: [
      {
        instruction: "Añade los copos de avena al frasco",
        tip: "La avena contiene almidones que se ablandan al absorber líquido. En frío ese proceso es lento y controlado — en caliente es rápido y hace papilla.",
        question: "¿Por qué se hidrata la avena en frío y no en caliente?",
        options: [
          "Porque calentarla destruye las vitaminas",
          "Para que absorba lentamente y conserve textura cremosa sin hacerse papilla",
          "Porque el frío añade probióticos",
        ],
        correctIndex: 1,
        explanation: "El remojo en frío hidrata los almidones poco a poco: la avena se ablanda pero mantiene cuerpo, sin la textura pastosa de cocinarla.",
        xp: 20,
      },
      {
        instruction: "Vierte la leche vegetal sobre la avena",
        question: "¿Cuánta leche para una textura cremosa (no aguada)?",
        options: [
          "La misma cantidad que avena (relación 1:1)",
          "El doble de leche que avena (relación 2:1)",
          "No importa, se absorbe todo igual",
        ],
        correctIndex: 0,
        explanation: "La relación 1:1 da la textura clásica. Más leche → más líquido; menos → más denso. Ajusta según preferencia después de probar.",
        xp: 20,
      },
      {
        // Sin quiz — solo instrucción
        instruction: "Añade la crema de cacahuete y las semillas de lino",
        xp: 0,
      },
      {
        instruction: "Agrega la miel y la canela",
        question: "¿Por qué la canela ayuda en un desayuno con avena?",
        options: [
          "Aporta proteína extra",
          "Ayuda a regular el índice glucémico de la comida",
          "Activa el metabolismo de grasas",
        ],
        correctIndex: 1,
        explanation: "El cinnamaldehído mejora la sensibilidad a la insulina, lo que amortigua el pico de glucosa del carbohidrato de la avena.",
        xp: 20,
      },
      {
        instruction: "Mezcla bien todos los ingredientes",
        xp: 0,
      },
      {
        instruction: "Cierra el frasco y refrigera mínimo 4 horas",
        question: "¿Qué pasa si refrigeras menos de 2 horas?",
        options: [
          "No pasa nada, la avena absorbe en 30 minutos",
          "La avena queda cruda con textura dura e indigesta",
          "Se fermenta y sabe mal",
        ],
        correctIndex: 1,
        explanation: "La avena necesita tiempo para absorber el líquido y suavizarse. Menos de 2 h = textura crujiente e indigestible. 4–8 h = perfecto.",
        xp: 15,
      },
    ],
    badge: "Madrugador saludable",
    totalXp: 75, // 20 + 20 + 0 + 20 + 0 + 15
  },
];

/**
 * Accede a una lección por id.
 * Encapsula el array: los componentes nunca tocan `lessons` directamente.
 * @param {string} id
 * @returns {Lesson | undefined}
 */
export function getLesson(id) {
  return lessons.find((l) => l.id === id);
}

/** Número de pantallas en el flujo de cualquier lección */
export const TOTAL_SCREENS = 5;