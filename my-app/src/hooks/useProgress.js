import { useState, useEffect } from "react";
/* Custom hook que guarda el xp del usuario en localStorage y persiste en cada recarga de página*/
const STORAGE_KEY = "cookingo-progress";

/**
 * Hook personalizado para gestionar el progreso del usuario (XP, badges, lecciones completadas).
 * Persiste en localStorage automáticamente.
 * @returns {{ xp: number, addXp: (points: number) => void }}
 */

export function useProgress() {
  const [xp, setXp] = useState(() => {
    try{
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.xp || 0;
      }
    }catch (error){
      console.warn("No se pudo leer localStorage: ", error);
    }
    return 0;
  });

// useEffect: cada vez que `xp` cambia, guarda en localStorage
useEffect(()=> {
  try{
const data = {xp}; //Por ahora, solo se guarda el xp, en versiones futuras, badges, lecciones completadas.
localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }catch(error){
    console.warn("No se pudo guardar en localStorage: " , error)
  }
}, [xp]);

const addXp = (points) =>{
  setXp((current) => current + points);
}

return {xp, addXp};
}