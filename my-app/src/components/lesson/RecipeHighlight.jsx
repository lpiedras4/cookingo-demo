import React from 'react'

const RecipeHighlight = ({icon, title, detail}) => {
  return (
    <div className = "flex items-start gap-3 rounded-xl border border-stone-200 bg-white/60 p-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className = "font-semibold text-stone-800">{title}</p>
        <p className = "text-sm text-stone-600">{detail}</p>
      </div>
    </div>
  )
}

export default RecipeHighlight
