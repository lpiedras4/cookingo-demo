import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
const CreateRecipeCard = ({ onClose }) => {
  /**
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
   * @property {number}        totalXp
   *
   */

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Crear receta
        </h2>
        <XMarkIcon
          onClick={onClose}
          className="h-6 w-6 text-white hover:text-amber cursor-pointer"
        />
      </div>

      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" for="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              for="emailAddress"
            >
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" for="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              for="passwordConfirmation"
            >
              Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Crear nueva receta
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipeCard;
