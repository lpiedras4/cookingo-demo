import React from 'react'
const DifficultyBadge = ({difficulty} = 0 ) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((level) => (
        <span
          key={level}
          className={`h-2.5 w-2.5 rounded-full ${
            level <= difficulty ? "bg-amber" : "bg-stone-300"
          }`}
        />
      ))}

      <span className="ml-2 text-sm font-extrabold text-stone-700">
        Nivel {difficulty  || "N/A"}
      </span>
    </div>
  );
}

export default DifficultyBadge
