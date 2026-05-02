/**
 * @typedef {Object} Ingredient
 * @property {string} id        - identificador único (ej. "lentejas")
 * @property {string} name      - nombre visible (ej. "Lentejas")
 * @property {string} emoji     - emoji para la UI
 * @property {string} amount    - cantidad (ej. "1 taza")
 */

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