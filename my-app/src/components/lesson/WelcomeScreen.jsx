import React from "react";
import RecipeHighlight from "./RecipeHighlight";

/*
 * @param {{ lesson: import("../../data/lessons").Lesson, onStart: () => void }} props
 */
const WelcomeScreen = ({lesson, onStart}) => {
  return (
    <section className="space-y-5">
      {/*Hero de la presentación de la lección */}
      <div className="rounded-3xl bg-amber p-5">
        <h1 className="text-3xl font-bold leading-tight text-stone-900">
          {lesson.name}
        </h1>
        <p className="mt-1 text-sm text text-stone-800">{lesson.description}</p>
        <p>
          {lesson.costPerServing} {lesson.costCurrency} / porción ·{" "}
          {lesson.servings} porciones
        </p>
      </div>

      {/*Highlights */}
      <ul className="space-y-2">
        {lesson.highlights.map((h) => (
          <li key={h.title}>
            <RecipeHighlight icon={h.icon} title={h.title} detail={h.detail} />
          </li>
        ))}
      </ul>

      {/*Botón de empezar */}
      <button
        onClick={onStart}
        className="w-full rounded-2xl bg-forest py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all"
      >
        Empezar lección
      </button>
    </section>
  );
};

export default WelcomeScreen;
