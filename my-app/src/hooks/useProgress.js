import { useState, useEffect } from "react";
/* Custom hook que guarda el xp del usuario en localStorage y persiste en cada recarga de página*/
const STORAGE_KEY = "cookingo-progress";
const STORAGE_VERSION = 1; //Versionado para migraciones

/**
 * Hook personalizado para gestionar el progreso del usuario (XP, badges, lecciones completadas).
 * Persiste en localStorage automáticamente.
 * @returns {{ xp: number, addXp: (points: number) => void }}
 */

/**
 * Estructura de datos en localStorage:
 * {
 *   version: 1,
 *   xp: number,
 *   completedLessons: string[],  // IDs de lecciones completadas
 *   badges: string[],             // IDs de badges desbloqueados
 *   lastUpdated: number           // timestamp para debug
 * }
 */

//Estado inicial cuando no hay datos guardados
const INITIAL_STATE = {
  version: STORAGE_VERSION,
  xp: 0,
  completedLessons: [], 
  badges: [],
  level: null,
  lastUpdated: Date.now(),
};

//Función que lee datos de localStorage con manejo de errores y migración.

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_STATE;
    const data = JSON.parse(saved);

    //Migración de versiones antiguas
    if (!data.version || data.version < STORAGE_VERSION) {
      return migrateData(data);
    }
    return data;
  } catch (error) {
    console.warn("Error leyendo localStorage");
    return INITIAL_STATE;
  }
}

/*Migra datos de versiones anitguas a la estructura actual */
function migrateData(oldData) {
  console.log("Migrando datos de versión antigua...");
  if (!oldData.version) {
    return {
      version: STORAGE_VERSION,
      xp: oldData.xp || 0,
      completedLessons: oldData.completedLessons || [],
      badges: oldData.badges || [],
      lastUpdated: Date.now(),
    };
  }
  return oldData;
}

//Guarda datos en localStorage con manejo de errores
function saveToStorage(data) {
  try {
    const toSave = {
      ...data,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error("Error guardando en localStorage: ", error);
    // Si falló por cuota excedida, intentar limpiar datos antiguos
    if (error.name === "QuotaExceededError") {
      console.warn("Cuota de localStorage excedida");
    }
  }
}

//Hook para gestionar el progreso del usuario

export function useProgress() {
  const [state, setState] = useState(loadFromStorage);

  //Guardar en localStorage cada que cambia el estado
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  //Sincronización entre pestañas - escucha cambios en localStorage

  useEffect(() => {
    const handleStorageChange = (e) => {
      //Solo reacciona a cambios en la clave de storage
      if (e.key !== STORAGE_KEY) return;

      //Si otra pestaña borró los datos
      if (e.newValue === null) {
        setState(INITIAL_STATE);
        return;
      }
      try {
        const newData = JSON.parse(e.newValue);
        setState(newData);
      } catch (error) {
        console.warn("Error parseando datos de otra pestaña:", error);
      }
    };
  }, []);

  /*Funcion que asigna nivel*/
  const assignLevel = (level) => {
    setState((prev) => ({
      ...prev,
      level,
    }));
  }

  //Funciones para modificar el estado
  const addXp = (points) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + points,
    }));
  };

  const markLessonComplete = (lessonId) => {
    setState((prev) => {
      // No duplicar si ya está completada
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const unlockBadge = (badgeId) => {
    setState((prev) => {
      if (prev.badges.includes(badgeId)) {
        return prev;
      }
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      };
    });
  };

  const resetProgress = () => {
    setState(INITIAL_STATE);
    //Limpiar localStorage inmediatamente
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Error limpiando localStorage:", error);
    }
  };

  return {
    xp: state.xp,
    completedLessons: state.completedLessons,
    badges: state.badges,
    inicialLevel: state.level,
    addXp,
    markLessonComplete,
    unlockBadge,
    assignLevel,
    resetProgress,
  };
}
