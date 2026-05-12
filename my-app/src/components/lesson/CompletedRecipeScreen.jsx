import React from 'react'

const CompletedRecipeScreen = ({lesson}) => {
  return (
   <section className="min-h-screen bg-cream p-6 md:p-10">
      {/* TITLE */}
      <h2 className="mb-6 text-3xl font-bold text-stone-800">
        Recetas completadas
      </h2>

      {/* CARD */}
      <div className="flex flex-col gap-10 rounded-[2.5rem] bg-white/70 p-8 shadow-card lg:flex-row lg:items-center">
        
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* TITLE */}
          <h1 className="mb-6 text-5xl font-black text-stone-900 md:text-6xl">
            {lesson.name}
          </h1>

          {/* INGREDIENTS */}
          <div className="mb-6">
            <h3 className="mb-3 text-xl font-bold text-stone-800">
              Ingredientes
            </h3>

            <ul className="space-y-1 text-stone-600">
              {lesson.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.amount} de{" "}
                  {ingredient.name.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className="my-5 h-0.5 w-full bg-stone-300" />

          {/* PREP ORDER */}
          <div className="mb-6">
            <h3 className="mb-3 text-xl font-bold text-stone-800">
              Preparación de ingredientes
            </h3>

            <ul className="space-y-2 text-stone-600">
              {lesson.prepOrder.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="my-5 h-0.5 w-full bg-stone-300" />

          {/* COOKING STEPS */}
          <div>
            <h3 className="mb-3 text-xl font-bold text-stone-800">
              Preparación del platillo
            </h3>

            <ul className="list-disc space-y-2 pl-5 text-stone-600">
              {lesson.cookingSteps.map((step, index) => (
                <li key={index}>
                  {step.instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex flex-1 justify-center">
          <img
            src="/img/overnight-oats.jpg"
            alt={lesson.name}
            className="h-full max-h-125 w-full max-w-125 rounded-[2.5rem] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

export default CompletedRecipeScreen
