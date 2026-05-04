import React from "react";
/**
 *
 * Tarjeta de un dato desatcado de la receta
 * Props: icon (string), title (string), detail (string)
 */
const RecipeHighlight = ({ icon, title, detail }) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-stone-800">{title}</p>
        <p className="text-sm text-stone-500">{detail}</p>
      </div>
    </div>
  );
};

export default RecipeHighlight;
