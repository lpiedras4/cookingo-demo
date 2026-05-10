# 🍳 NutriCocina — Guía de construcción de las pantallas de lección

> Construye las 4 pantallas interactivas del flujo de lección: Compra de ingredientes, Preparación, Cocción con quizzes y Resultados. Explicado paso a paso con el **porqué** detrás de cada decisión.

---

## 🎯 Qué vas a construir

Las **4 pantallas centrales** del MVP de NutriCocina:

| Pantalla | Interacción | Complejidad | Aprenderás |
|----------|-------------|-------------|------------|
| 2/5: 🛒 Ingredientes | Click en tiles → modal nutricional → canasta | ⭐⭐☆☆☆ | Estado derivado, modales controlados |
| 5/5: 🎉 Resultados | XP ganado, badge desbloqueado, navegación | ⭐⭐☆☆☆ | Navegación programática, animaciones CSS |
| 3/5: 📋 Preparación | Drag & drop de pasos al orden correcto | ⭐⭐⭐⭐☆ | @dnd-kit, validación, feedback visual |
| 4/5: 🍳 Cocción | Pasos de cocción + quizzes con feedback | ⭐⭐⭐⭐⭐ | Estado multi-paso, validación, XP condicional |

**Orden de construcción**: 2 → 5 → 3 → 4 (de simple a complejo para aprender progresivamente).

---

## 📊 Progreso de pantallas

| # | Pantalla | Estado |
|---|----------|--------|
| 1 | Bienvenida | ✅ Ya construida |
| 2 | Compra ingredientes | 🟡 Esta guía |
| 3 | Preparación | 🟡 Esta guía |
| 4 | Cocción con quizzes | 🟡 Esta guía |
| 5 | Resultados | 🟡 Esta guía |

---

## 🧭 Cómo usar esta guía

Cada pantalla sigue la misma estructura:

1. **🎯 Objetivo** — qué vas a lograr
2. **💡 Concepto clave** — la idea de React explicada con analogía
3. **🛠️ Manos a la obra** — código completo comentado
4. **🤔 Decisión de diseño** — por qué se hizo así y qué alternativas existen
5. **🏋️ Ejercicio** — algo para practicar antes de seguir

> 💬 **Tip**: construye las pantallas en el orden presentado. Cada una enseña patrones que usarás en la siguiente.

---

# Pantalla 2/5: 🛒 Compra los ingredientes

## 🎯 Objetivo

El usuario ve una cuadrícula de tiles de ingredientes. Al hacer click en una, se abre un modal con información nutricional. Al cerrar el modal, el ingrediente se marca como "en la canasta". Solo puede avanzar cuando todos los ingredientes están seleccionados.

## 💡 Concepto clave: estado derivado + modal controlado

**Estado derivado**: no guardas `isComplete` como booleano separado — lo calculas: `selectedIds.length === ingredients.length`. Si puedes derivarlo, no lo guardes. Menos estado = menos bugs.

**Modal controlado**: el modal no se abre/cierra solo. El componente padre controla qué ingrediente está activo:
- `activeIngredient === null` → modal cerrado
- `activeIngredient === ingredientObj` → modal abierto con esos datos

> **Analogía**: el modal es como un cuadro de diálogo en Photoshop. No "existe" hasta que lo invocas con datos específicos (qué capa editar). El componente padre decide qué mostrar y cuándo.

## 🛠️ Manos a la obra

### Paso 1 — Crear `IngredientsScreen.jsx`

```jsx
// src/components/lesson/IngredientsScreen.jsx
import { useState } from "react";

/**
 * Pantalla 2/5: Compra los ingredientes.
 * El usuario hace click en tiles para ver info nutricional y añadirlos a la canasta.
 * 
 * @param {{
 *   ingredients: import("../../data/lessons").Ingredient[],
 *   onNext: () => void,
 *   onPrev: () => void
 * }} props
 */
export function IngredientsScreen({ ingredients, onNext, onPrev }) {
  // Array de IDs de ingredientes ya añadidos
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Ingrediente cuyo modal está abierto (null = modal cerrado)
  const [activeIngredient, setActiveIngredient] = useState(null);

  // Estado derivado: ¿todos en la canasta?
  const allSelected = selectedIds.length === ingredients.length;

  const handleTileClick = (ingredient) => {
    setActiveIngredient(ingredient);
  };

  const handleAddToBasket = () => {
    // Solo añadir si no está ya en la canasta
    if (activeIngredient && !selectedIds.includes(activeIngredient.id)) {
      setSelectedIds([...selectedIds, activeIngredient.id]);
    }
    setActiveIngredient(null); // cerrar modal
  };

  const handleCloseModal = () => {
    setActiveIngredient(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header con instrucciones */}
      <header className="text-center">
        <h2 className="font-display text-2xl font-bold text-stone-800">
          🛒 Compra los ingredientes
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Toca cada ingrediente para conocer sus beneficios nutricionales
        </p>
        
        {/* Contador de progreso */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold text-stone-700">
            {selectedIds.length} / {ingredients.length}
          </span>
          <span className="text-xs text-stone-400">en la canasta</span>
        </div>
      </header>

      {/* Grid de ingredientes: 2 columnas en móvil, 3 en tablet+ */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {ingredients.map((ingredient) => {
          const isSelected = selectedIds.includes(ingredient.id);
          
          return (
            <button
              key={ingredient.id}
              onClick={() => handleTileClick(ingredient)}
              disabled={isSelected}
              className={`
                relative rounded-2xl p-4 text-center transition-all
                ${isSelected 
                  ? 'bg-green-100 border-2 border-green-400 opacity-60 cursor-not-allowed'
                  : 'bg-orange border-2 border-orange-dark hover:scale-105 active:scale-95'
                }
              `}
            >
              {/* Emoji del ingrediente */}
              <div className="text-4xl" aria-hidden="true">
                {ingredient.emoji}
              </div>
              
              {/* Nombre */}
              <p className={`mt-2 text-sm font-bold ${isSelected ? 'text-green-800' : 'text-white'}`}>
                {ingredient.name}
              </p>

              {/* Checkmark si está seleccionado */}
              {isSelected && (
                <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Modal de tarjeta nutricional */}
      {activeIngredient && (
        <NutritionalCard
          ingredient={activeIngredient}
          onAdd={handleAddToBasket}
          onClose={handleCloseModal}
        />
      )}

      {/* Botones de navegación */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!allSelected}
          className={`
            flex-1 rounded-2xl py-3 font-bold text-white transition-all
            ${allSelected
              ? 'bg-forest hover:bg-forest-dark'
              : 'bg-stone-300 cursor-not-allowed'
            }
          `}
        >
          Siguiente →
        </button>
      </div>

    </div>
  );
}

/**
 * Modal con la tarjeta nutricional de un ingrediente.
 * Se renderiza con portal implícito (fixed positioning).
 */
function NutritionalCard({ ingredient, onAdd, onClose }) {
  return (
    <>
      {/* Backdrop - fondo oscuro que ocupa toda la pantalla */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card - centrada en pantalla */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto animate-scale-in">
        <div className="rounded-3xl bg-white p-6 shadow-2xl">
          
          {/* Header de la card */}
          <div className="text-center">
            <div className="text-5xl" aria-hidden="true">
              {ingredient.emoji}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-stone-800">
              {ingredient.name}
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              {ingredient.description}
            </p>
          </div>

          {/* Info nutricional en cards de color */}
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-green-50 p-3 border border-green-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-800">
                ✓ Beneficios nutricionales
              </p>
              <p className="mt-1 text-sm text-green-900">
                {ingredient.nutritionNote}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                📏 Porción recomendada
              </p>
              <p className="mt-1 text-sm text-amber-900">
                {ingredient.portionNote}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-stone-300 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onAdd}
              className="flex-1 rounded-xl bg-forest py-3 text-sm font-bold text-white hover:bg-forest-dark transition-colors"
            >
              Añadir a canasta
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
```

### Paso 2 — Añadir animaciones en `index.css`

```css
/* Al final de src/index.css */

/* Animación de fade-in para el backdrop */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Animación de scale-in para el modal */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Paso 3 — Integrar en `LessonFlow.jsx`

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IngredientsScreen } from "./IngredientsScreen"; // 👈 nuevo
import { TOTAL_SCREENS } from "../../data/lessons";

// ... XP_PER_SCREEN igual ...

const LessonFlow = ({ lesson, onEarnXp }) => {
  const [step, setStep] = useState(1);
  
  const next = () => {
    const nextStep = Math.min(TOTAL_SCREENS, step + 1);
    setStep(nextStep);
    const xpEarned = XP_PER_SCREEN[nextStep] || 0;
    if (xpEarned > 0) {
      onEarnXp(xpEarned);
    }
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>
      {/* Barra de progreso igual que antes */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-amber transition-all duration-300"
            style={{ width: `${(step / TOTAL_SCREENS) * 100}%` }}
          />
        </div>
        <span className="text-xs text-stone-400 tabular-nums">
          {step} / {TOTAL_SCREENS}
        </span>
      </div>

      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      
      {/* Pantalla 2/5: reemplaza el placeholder */}
      {step === 2 && (
        <IngredientsScreen
          ingredients={lesson.ingredients}
          onNext={next}
          onPrev={prev}
        />
      )}
      
      {step === 3 && <PlaceholderScreen title="📋 Prepara los ingredientes" onNext={next} onPrev={prev} />}
      {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!" onNext={next} onPrev={prev} />}
      {step === 5 && <PlaceholderScreen title="🎉 ¡Lección completada!" onNext={null} onPrev={prev} />}
    </div>
  );
};

// PlaceholderScreen igual que antes...
export default LessonFlow;
```

### Paso 4 — Probar

1. Navega a `/lesson/overnight-oats`
2. Completa la pantalla de bienvenida
3. Deberías ver 6 tiles naranjas (los ingredientes de Overnight Oats)
4. Click en "🌾 Copos de avena" → modal se abre con animación
5. Lee la info nutricional
6. Click "Añadir a canasta" → tile se vuelve verde con checkmark
7. Repite con todos los ingredientes
8. El botón "Siguiente" se habilita cuando `6 / 6 en la canasta`

## 🤔 Decisión de diseño

### ¿Por qué `activeIngredient` en lugar de `isModalOpen + currentIngredient`?

```jsx
// ❌ Dos estados - pueden desincronizarse
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentIngredient, setCurrentIngredient] = useState(null);
// Posible bug: modal abierto sin ingrediente (crash al leer ingredient.name)

// ✅ Un estado que controla ambos
const [activeIngredient, setActiveIngredient] = useState(null);
// null = modal cerrado, objeto = modal abierto con esos datos
```

Con un solo estado, **imposible** tener el modal abierto sin datos.

### ¿Por qué `disabled={isSelected}` en las tiles?

Evita que el usuario haga click múltiple en un ingrediente ya seleccionado. Sin `disabled`, el modal se abre de nuevo — confuso y sin sentido.

### ¿Por qué el backdrop tiene `onClick={onClose}`?

Patrón UX estándar: click fuera del modal lo cierra. El backdrop ocupa toda la pantalla (`inset-0`), así que cualquier click fuera de la card llama a `onClose`.

### ¿Por qué `z-40` en backdrop y `z-50` en card?

Para que la card aparezca **encima** del backdrop oscuro. Sin esto, el fondo taparía la card. Tailwind tiene z-index predefinidos: `z-0` (0), `z-10` (10), `z-20` (20)... `z-50` (50).

### ¿Por qué `fixed` positioning y no un portal con `createPortal`?

`fixed` es más simple para un caso como este (modal que ocupa toda la pantalla). `createPortal` es útil cuando necesitas renderizar **fuera** del árbol del DOM padre (ej: tooltip que debe escapar de un `overflow: hidden`). Aquí no hay ese problema.

## ⚠️ Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| El modal no cierra al hacer click en el backdrop | El evento se propaga al botón interno | Añade `onClick={onClose}` solo al backdrop, no a la card |
| El botón "Siguiente" se habilita antes de seleccionar todos | Comparas mal `selectedIds.length === ingredients` | Comparar con `.length`: `ingredients.length` |
| Las tiles no cambian de color al seleccionar | El `isSelected` no se recalcula | Mueve el check dentro del `.map()`, no fuera |
| El modal aparece sin animación | Olvidaste añadir las clases `animate-*` | Verifica `index.css` y las clases en el JSX |

## 🏋️ Ejercicio

1. **Mejora la accesibilidad**: añade `aria-label` a cada tile describiendo su estado: `"Copos de avena - No añadido"` o `"Copos de avena - En la canasta"`.
2. **Añade sonido**: cuando el usuario añade un ingrediente, reproduce un "ding" con `new Audio('/ding.mp3').play()` (necesitas un archivo de sonido en `public/`).
3. **Persistencia de canasta**: guarda `selectedIds` en `sessionStorage` para que si el usuario recarga la página, los ingredientes seleccionados persistan (solo durante la sesión, no como `localStorage`).

---

# Pantalla 5/5: 🎉 Resultados

## 🎯 Objetivo

Mostrar al usuario el XP total ganado, el badge desbloqueado (si aplica), y dos botones de acción: "Ver recetario" (navega a `/recipes`) y "Hacer otra lección" (navega a `/`). Añadir una animación de celebración (confetti simple con CSS).

## 💡 Concepto clave: navegación programática con `useNavigate`

Hasta ahora navegabas con `<Link>` (declarativo: "este botón va aquí"). A veces necesitas navegar **desde código** (ej: al completar un quiz, después de una animación, cuando expira un timer).

`useNavigate` de React Router te da una función para cambiar de ruta programáticamente:

```jsx
const navigate = useNavigate();
navigate("/recipes"); // cambia la URL y renderiza RecipesPage
```

> **Analogía**: `<Link>` es como un hipervínculo que el usuario hace click. `navigate()` es como el botón "siguiente" del navegador que el código dispara automáticamente.

## 🛠️ Manos a la obra

### Paso 1 — Crear `ResultsScreen.jsx`

```jsx
// src/components/lesson/ResultsScreen.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Pantalla 5/5: Resultados de la lección.
 * Muestra XP ganado, badge desbloqueado, y opciones de navegación.
 * 
 * @param {{
 *   lesson: import("../../data/lessons").Lesson,
 *   xpEarned: number,
 *   onPrev: () => void
 * }} props
 */
export function ResultsScreen({ lesson, xpEarned, onPrev }) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  // Animación de confetti al montar el componente
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative space-y-6 py-6">
      
      {/* Confetti - solo se muestra los primeros 3 segundos */}
      {showConfetti && <Confetti />}

      {/* Header de celebración */}
      <header className="text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-amber to-orange flex items-center justify-center text-5xl shadow-lg">
          🎉
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold text-forest">
          ¡Lección completada!
        </h2>
        <p className="mt-2 text-stone-600">
          Has dominado {lesson.name}
        </p>
      </header>

      {/* Card de XP ganado */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6 text-center">
        <p className="text-sm uppercase tracking-wide text-amber-800 font-semibold">
          Experiencia ganada
        </p>
        <p className="mt-2 font-display text-6xl font-bold text-amber-600">
          +{xpEarned} XP
        </p>
        <p className="mt-2 text-sm text-amber-700">
          ¡Sigue así para subir de nivel!
        </p>
      </div>

      {/* Badge desbloqueado */}
      {lesson.badge && (
        <div className="rounded-2xl bg-white p-6 shadow-card text-center border-2 border-green-200">
          <p className="text-sm uppercase tracking-wide text-green-800 font-semibold">
            🏆 Badge desbloqueado
          </p>
          <p className="mt-2 font-display text-xl font-bold text-green-700">
            {lesson.badge}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Visita tu perfil para ver todos tus badges
          </p>
        </div>
      )}

      {/* Receta desbloqueada */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{lesson.dishEmoji}</div>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-stone-400 font-semibold">
              Receta desbloqueada
            </p>
            <p className="mt-1 font-display text-lg font-bold text-stone-800">
              {lesson.name}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Ahora puedes acceder a esta receta desde tu recetario cuando quieras
            </p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3 pt-4">
        <button
          onClick={() => navigate("/recipes")}
          className="w-full rounded-2xl bg-forest py-4 font-bold text-white shadow hover:bg-forest-dark transition-all active:scale-95"
        >
          📖 Ver mi recetario
        </button>
        
        <button
          onClick={() => navigate("/")}
          className="w-full rounded-2xl border-2 border-forest py-4 font-bold text-forest hover:bg-forest hover:text-white transition-all"
        >
          🏠 Hacer otra lección
        </button>

        <button
          onClick={onPrev}
          className="w-full rounded-2xl border border-stone-300 py-3 text-sm text-stone-600 hover:bg-stone-100 transition-colors"
        >
          ← Volver al paso anterior
        </button>
      </div>

    </div>
  );
}

/**
 * Componente de confetti - partículas que caen desde arriba.
 * Puramente decorativo, no interactivo.
 */
function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((i) => (
        <div
          key={i}
          className="confetti-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#F5A623', '#E8843A', '#1B5C3E', '#F5E3C8'][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  );
}
```

### Paso 2 — Añadir animaciones de confetti en `index.css`

```css
/* Al final de src/index.css */

/* Animación de confetti - partículas que caen */
@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.confetti-particle {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10px;
  border-radius: 2px;
  animation: confetti-fall 3s ease-in-out forwards;
}
```

### Paso 3 — Integrar en `LessonFlow.jsx`

Necesitas calcular el XP ganado en la lección para pasarlo a `ResultsScreen`:

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IngredientsScreen } from "./IngredientsScreen";
import { ResultsScreen } from "./ResultsScreen"; // 👈 nuevo
import { TOTAL_SCREENS } from "../../data/lessons";

const XP_PER_SCREEN = {
  1: 0,
  2: 15,
  3: 10,
  4: 40,
  5: 10,
};

const LessonFlow = ({ lesson, onEarnXp }) => {
  const [step, setStep] = useState(1);
  const [totalXpEarned, setTotalXpEarned] = useState(0); // 👈 nuevo - trackea XP de esta lección
  
  const next = () => {
    const nextStep = Math.min(TOTAL_SCREENS, step + 1);
    setStep(nextStep);
    
    const xpEarned = XP_PER_SCREEN[nextStep] || 0;
    if (xpEarned > 0) {
      onEarnXp(xpEarned);
      setTotalXpEarned((prev) => prev + xpEarned); // 👈 acumula para mostrarlo en resultados
    }
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-amber transition-all duration-300"
            style={{ width: `${(step / TOTAL_SCREENS) * 100}%` }}
          />
        </div>
        <span className="text-xs text-stone-400 tabular-nums">
          {step} / {TOTAL_SCREENS}
        </span>
      </div>

      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {step === 2 && <IngredientsScreen ingredients={lesson.ingredients} onNext={next} onPrev={prev} />}
      {step === 3 && <PlaceholderScreen title="📋 Prepara los ingredientes" onNext={next} onPrev={prev} />}
      {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!" onNext={next} onPrev={prev} />}
      
      {/* Pantalla 5/5: reemplaza el placeholder */}
      {step === 5 && (
        <ResultsScreen
          lesson={lesson}
          xpEarned={totalXpEarned}
          onPrev={prev}
        />
      )}
    </div>
  );
};

// PlaceholderScreen igual...
export default LessonFlow;
```

### Paso 4 — Probar

1. Completa una lección hasta el final (pantallas 1-4)
2. Al llegar a la pantalla 5:
   - Deberías ver confetti cayendo durante 3 segundos
   - El XP total ganado (75 XP para Overnight Oats)
   - El badge "Madrugador saludable"
   - La receta desbloqueada
3. Click "📖 Ver mi recetario" → navega a `/recipes`
4. Vuelve con el botón atrás del navegador
5. Click "🏠 Hacer otra lección" → navega a `/`

## 🤔 Decisión de diseño

### ¿Por qué `navigate()` en lugar de `<Link>`?

```jsx
// ✅ Botón con navegación programática
<button onClick={() => navigate("/recipes")}>
  Ver mi recetario
</button>

// ❌ Link estilizado como botón (funciona, pero semánticamente raro)
<Link to="/recipes" className="...">
  Ver mi recetario
</Link>
```

Ambos funcionan, pero `<button>` + `navigate()` es más claro cuando la acción principal es **ejecutar código** (ej: guardar algo, luego navegar). `<Link>` es mejor cuando la acción **solo** es navegar.

### ¿Por qué `totalXpEarned` como estado separado y no calcular desde `lesson.totalXp`?

Porque `totalXpEarned` representa **lo que el usuario ganó en ESTA sesión específica**, no el XP total posible. Si el usuario hace la lección mal (falla quizzes), podría ganar menos del `totalXp` teórico. Aunque por ahora no hay penalización, el estado separado te permite añadirlo después.

### ¿Por qué el confetti es un array de 50 divs y no una imagen/SVG?

CSS-only confetti es ligero (~1KB) y funciona sin assets externos. Alternativas:
- **Canvas animation** — más suave, más compleja, más pesada.
- **Library (react-confetti)** — funciona bien, pero añade ~15KB al bundle.
- **SVG animado** — escalable, pero más verboso.

Para un efecto de 3 segundos que solo se ve una vez por lección, 50 divs es simple y suficiente.

### ¿Por qué `pointer-events-none` en el confetti?

Para que las partículas no bloqueen los clicks en los botones debajo. Sin esto, el usuario podría hacer click en una partícula flotante en lugar del botón.

## 🏋️ Ejercicio

1. **Añade un contador animado**: en lugar de mostrar `+75 XP` instantáneamente, anima de 0 a 75 en 1 segundo usando un `setInterval` o la librería `react-countup`.
2. **Guarda la lección como completada**: llama a `markLessonComplete(lesson.id)` del hook `useProgress` cuando el componente se monte (en un `useEffect`).
3. **Mejora el confetti**: añade emojis aleatorios (`🎉`, `✨`, `🌟`) en lugar de cuadrados de colores. Cambia el `backgroundColor` por `content: "🎉"` en CSS.

---

# Pantalla 3/5: 📋 Prepara los ingredientes

## 🎯 Objetivo

El usuario ve 5 pasos de preparación desordenados abajo. Arriba hay 5 slots numerados vacíos. El usuario arrastra (o toca en móvil) cada paso al slot correcto. Al soltar, se valida: si es correcto, el slot se pone verde; si es incorrecto, rojo. Solo puede avanzar cuando todos los pasos están en el orden correcto.

## 💡 Concepto clave: drag & drop con @dnd-kit

Implementar drag & drop nativo del navegador (HTML5 Drag API) es complejo y tiene bugs en móvil. `@dnd-kit` es una librería que abstrae toda esa complejidad y funciona perfectamente en touch + mouse.

Conceptos clave:
- **DndContext**: el contenedor que coordina todo el drag & drop
- **Draggable**: elemento que se puede arrastrar
- **Droppable**: zona donde se puede soltar
- **onDragEnd**: evento que se dispara al soltar — ahí actualizas el estado

> **Analogía**: `@dnd-kit` es como un árbitro de ajedrez. Los jugadores (draggables) mueven piezas, el tablero (droppables) tiene casillas, y el árbitro (DndContext) valida si el movimiento es legal cuando sueltas la pieza.

## 🛠️ Manos a la obra

### Paso 1 — Instalar `@dnd-kit`

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Paso 2 — Crear `PrepScreen.jsx`

```jsx
// src/components/lesson/PrepScreen.jsx
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

/**
 * Pantalla 3/5: Prepara los ingredientes.
 * El usuario arrastra pasos al orden correcto.
 * 
 * @param {{
 *   prepOrder: string[],
 *   onNext: () => void,
 *   onPrev: () => void
 * }} props
 */
export function PrepScreen({ prepOrder, onNext, onPrev }) {
  // Estado: qué paso está en qué slot (null = slot vacío)
  // slots[0] = paso asignado al slot 1, slots[1] = slot 2, etc.
  const [slots, setSlots] = useState(Array(prepOrder.length).fill(null));
  
  // Pasos aún no asignados (disponibles para arrastrar)
  const [availableSteps, setAvailableSteps] = useState(
    prepOrder.map((text, index) => ({ id: `step-${index}`, text, correctIndex: index }))
  );

  // Sensores: configuración de cómo se detecta el drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // requiere mover 8px antes de activar el drag (evita clicks accidentales)
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // soltado fuera de un droppable

    const draggedStep = availableSteps.find((s) => s.id === active.id);
    if (!draggedStep) return;

    // Extraer el índice del slot desde el id del droppable (ej: "slot-0" → 0)
    const slotIndex = parseInt(over.id.replace("slot-", ""), 10);

    // Si el slot ya está ocupado, regresar el paso a availableSteps
    if (slots[slotIndex] !== null) {
      setAvailableSteps((prev) => [...prev, slots[slotIndex]]);
    }

    // Asignar el paso al slot
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[slotIndex] = draggedStep;
      return newSlots;
    });

    // Remover el paso de availableSteps
    setAvailableSteps((prev) => prev.filter((s) => s.id !== draggedStep.id));
  };

  // Validación: todos los slots llenos y en orden correcto
  const allFilled = slots.every((s) => s !== null);
  const allCorrect = slots.every((step, index) => step?.correctIndex === index);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        
        {/* Header */}
        <header className="text-center">
          <h2 className="font-display text-2xl font-bold text-stone-800">
            📋 Prepara los ingredientes
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Arrastra los pasos al orden correcto
          </p>
        </header>

        {/* Drop zones - slots numerados */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Orden correcto:
          </p>
          {slots.map((step, index) => (
            <DropSlot
              key={index}
              slotIndex={index}
              step={step}
              isCorrect={step?.correctIndex === index}
              isFilled={step !== null}
            />
          ))}
        </div>

        {/* Draggable steps - pasos disponibles */}
        {availableSteps.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Pasos disponibles:
            </p>
            {availableSteps.map((step) => (
              <DraggableStep key={step.id} step={step} />
            ))}
          </div>
        )}

        {/* Feedback visual */}
        {allFilled && (
          <div className={`rounded-2xl p-4 text-center ${allCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
            <p className={`font-semibold ${allCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {allCorrect
                ? '✓ ¡Perfecto! Orden correcto'
                : '✗ Revisa el orden — algunos pasos están en posición incorrecta'}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onPrev}
            className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100"
          >
            ← Atrás
          </button>
          <button
            onClick={onNext}
            disabled={!allCorrect}
            className={`
              flex-1 rounded-2xl py-3 font-bold text-white transition-all
              ${allCorrect
                ? 'bg-forest hover:bg-forest-dark'
                : 'bg-stone-300 cursor-not-allowed'
              }
            `}
          >
            Siguiente →
          </button>
        </div>

      </div>
    </DndContext>
  );
}

/**
 * Slot donde se sueltan los pasos.
 */
function DropSlot({ slotIndex, step, isCorrect, isFilled }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slotIndex}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[60px] rounded-xl border-2 border-dashed p-3 transition-all
        ${isOver ? 'border-amber bg-amber-50 scale-105' : ''}
        ${isFilled && isCorrect ? 'border-green-400 bg-green-50' : ''}
        ${isFilled && !isCorrect ? 'border-red-400 bg-red-50' : ''}
        ${!isFilled ? 'border-stone-300 bg-stone-50' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-600">
          {slotIndex + 1}
        </span>
        {step ? (
          <p className="flex-1 text-sm text-stone-700">{step.text}</p>
        ) : (
          <p className="flex-1 text-sm text-stone-400 italic">Arrastra un paso aquí</p>
        )}
        {isFilled && (
          <span className="text-lg">
            {isCorrect ? '✓' : '✗'}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Paso que se puede arrastrar.
 */
function DraggableStep({ step }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: step.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        cursor-grab rounded-xl border-2 border-orange bg-orange p-3 transition-all
        hover:scale-105 active:cursor-grabbing
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <p className="text-sm font-semibold text-white">{step.text}</p>
    </div>
  );
}
```

### Paso 3 — Integrar en `LessonFlow.jsx`

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IngredientsScreen } from "./IngredientsScreen";
import { PrepScreen } from "./PrepScreen"; // 👈 nuevo
import { ResultsScreen } from "./ResultsScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

// ... código igual ...

return (
  <div>
    {/* barra de progreso */}

    {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
    {step === 2 && <IngredientsScreen ingredients={lesson.ingredients} onNext={next} onPrev={prev} />}
    
    {/* Pantalla 3/5 */}
    {step === 3 && (
      <PrepScreen
        prepOrder={lesson.prepOrder}
        onNext={next}
        onPrev={prev}
      />
    )}
    
    {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!" onNext={next} onPrev={prev} />}
    {step === 5 && <ResultsScreen lesson={lesson} xpEarned={totalXpEarned} onPrev={prev} />}
  </div>
);
```

### Paso 4 — Probar

1. Llega a la pantalla 3/5
2. Deberías ver 5 slots vacíos arriba numerados del 1 al 5
3. Abajo, 5 tiles naranjas con los pasos desordenados
4. Arrastra un paso a un slot:
   - Si es el slot correcto → verde con ✓
   - Si es incorrecto → rojo con ✗
5. Ordena todos correctamente → el botón "Siguiente" se habilita

**En móvil**: toca y mantén presionado un paso, luego arrastra. `@dnd-kit` maneja touch automáticamente.

## 🤔 Decisión de diseño

### ¿Por qué `@dnd-kit` y no la HTML5 Drag API nativa?

La API nativa tiene problemas:
- **No funciona en touch** (móviles) sin polyfills complejos
- **Eventos inconsistentes** entre navegadores
- **Difícil customizar el "ghost" (elemento que arrastras)**

`@dnd-kit` es 15KB pero te ahorra días de debuggeo en edge cases.

### ¿Por qué `activationConstraint: { distance: 8 }`?

Sin esto, cualquier click accidental inicia un drag. Con 8px de distancia mínima, diferencias entre "click" (< 8px de movimiento) y "drag" (> 8px). UX más predecible.

### ¿Por qué `slots` es un array y no un objeto `{ 0: step, 1: null, ... }`?

Los arrays son más simples para mapear en JSX: `slots.map((step, index) => ...)`. Con objeto necesitas `Object.entries` o `Object.keys`. Para slots ordenados secuencialmente, array es natural.

### ¿Por qué resetear `availableSteps` al cambiar de lección?

Si no, al volver a la pantalla (con el botón "Atrás"), los pasos ya asignados siguen asignados. Necesitas resetear en un `useEffect` cuando `prepOrder` cambia, o mejor aún, el estado se resetea automáticamente al desmontar el componente (cuando cambias de lección).

## 🏋️ Ejercicio

1. **Añade un botón "Resetear"**: que borre todos los slots y devuelva todos los pasos a `availableSteps`. Útil si el usuario quiere empezar de nuevo sin retroceder.
2. **Mejora el feedback visual**: cuando arrastras sobre un slot correcto, muestra un borde verde grueso; si es incorrecto, rojo. Usa `isOver` del droppable y compara `draggedStep.correctIndex === slotIndex`.
3. **Añade animación**: cuando un paso se coloca correctamente, añade una animación de "check" con CSS `@keyframes`.

---

# Pantalla 4/5: 🍳 ¡Hagamos el platillo!

## 🎯 Objetivo

Mostrar los pasos de cocción uno a la vez. Cada paso tiene una instrucción y un quiz opcional. Si hay quiz, el usuario selecciona una respuesta, hace click en "Verificar", y recibe feedback inmediato (verde/rojo) + explicación nutricional + XP ganado. Solo avanza al siguiente paso cuando responde correctamente (o si no hay quiz, con un botón "Siguiente").

## 💡 Concepto clave: estado multi-paso con validación

Esta es la pantalla más compleja porque tiene:
- **Estado del paso actual** (qué paso de cocción estás viendo)
- **Estado de la respuesta** (qué opción seleccionó el usuario)
- **Estado de validación** (¿ya verificó? ¿acertó?)
- **Acumulador de XP** (suma del XP ganado en cada quiz)

El patrón: una **mini máquina de estados** dentro de la pantalla. No uses un booleano por cada cosa — agrúpalos en objetos con estado derivado.

> **Analogía**: es como un videojuego con niveles. Cada nivel (paso de cocción) tiene su propia lógica (quiz), pero el juego recuerda tu puntuación global (XP acumulado) y qué nivel estás jugando (currentStepIndex).

## 🛠️ Manos a la obra

### Paso 1 — Crear `CookingScreen.jsx`

```jsx
// src/components/lesson/CookingScreen.jsx
import { useState } from "react";

/**
 * Pantalla 4/5: ¡Hagamos el platillo!
 * Pasos de cocción con quizzes intercalados.
 * 
 * @param {{
 *   cookingSteps: import("../../data/lessons").CookingStep[],
 *   onComplete: (xpEarned: number) => void,
 *   onPrev: () => void
 * }} props
 */
export function CookingScreen({ cookingSteps, onComplete, onPrev }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const currentStep = cookingSteps[currentStepIndex];
  const isLastStep = currentStepIndex === cookingSteps.length - 1;
  const hasQuiz = currentStep.question !== undefined;

  // Solo si hay quiz: validación de respuesta
  const isCorrect = hasQuiz && selectedAnswer === currentStep.correctIndex;

  const handleVerify = () => {
    if (!hasQuiz || selectedAnswer === null) return;
    
    setHasVerified(true);

    // Si acertó, sumar XP
    if (isCorrect) {
      setTotalXpEarned((prev) => prev + currentStep.xp);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      // Terminar pantalla de cocción, pasar XP al flujo principal
      onComplete(totalXpEarned);
    } else {
      // Avanzar al siguiente paso
      setCurrentStepIndex((prev) => prev + 1);
      // Resetear estado del quiz
      setSelectedAnswer(null);
      setHasVerified(false);
    }
  };

  // Solo permitir avanzar si:
  // - No hay quiz, O
  // - Hay quiz y ya verificó y acertó
  const canAdvance = !hasQuiz || (hasVerified && isCorrect);

  return (
    <div className="space-y-6">
      
      {/* Progress interno: "Paso X de Y" */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Paso de cocción
        </p>
        <p className="text-xs font-semibold text-stone-700 tabular-nums">
          {currentStepIndex + 1} / {cookingSteps.length}
        </p>
      </div>

      {/* Barra de progreso interna */}
      <div className="h-2 rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / cookingSteps.length) * 100}%` }}
        />
      </div>

      {/* Instrucción del paso */}
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <p className="text-sm font-semibold text-stone-600">Instrucción:</p>
        <p className="mt-2 text-base text-stone-800">{currentStep.instruction}</p>
      </div>

      {/* Quiz (si existe) */}
      {hasQuiz && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-5">
            <p className="text-sm font-semibold text-amber-800">💡 Quiz nutricional</p>
            <p className="mt-2 text-stone-800">{currentStep.question}</p>
          </div>

          {/* Opciones de respuesta */}
          <div className="space-y-2">
            {currentStep.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showFeedback = hasVerified;
              const isThisCorrect = index === currentStep.correctIndex;

              return (
                <button
                  key={index}
                  onClick={() => !hasVerified && setSelectedAnswer(index)}
                  disabled={hasVerified}
                  className={`
                    w-full rounded-xl border-2 p-4 text-left transition-all
                    ${!hasVerified && isSelected ? 'border-amber bg-amber-50' : ''}
                    ${!hasVerified && !isSelected ? 'border-stone-300 hover:border-stone-400' : ''}
                    ${showFeedback && isThisCorrect ? 'border-green-500 bg-green-50' : ''}
                    ${showFeedback && !isThisCorrect && isSelected ? 'border-red-500 bg-red-50' : ''}
                    ${hasVerified ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current text-xs font-bold">
                      {String.fromCharCode(65 + index)} {/* A, B, C */}
                    </span>
                    <p className="flex-1 text-sm">{option}</p>
                    {showFeedback && isThisCorrect && <span className="text-green-600">✓</span>}
                    {showFeedback && !isThisCorrect && isSelected && <span className="text-red-600">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botón de verificar */}
          {!hasVerified && (
            <button
              onClick={handleVerify}
              disabled={selectedAnswer === null}
              className={`
                w-full rounded-xl py-3 font-bold text-white transition-all
                ${selectedAnswer !== null
                  ? 'bg-amber hover:bg-amber-dark'
                  : 'bg-stone-300 cursor-not-allowed'
                }
              `}
            >
              Verificar respuesta
            </button>
          )}

          {/* Feedback post-verificación */}
          {hasVerified && (
            <div className={`rounded-xl border-2 p-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '¡Correcto! ✓' : 'Incorrecto ✗'}
              </p>
              <p className="mt-2 text-sm text-stone-700">
                {currentStep.explanation}
              </p>
              {isCorrect && currentStep.xp > 0 && (
                <p className="mt-2 text-sm font-semibold text-amber-700">
                  +{currentStep.xp} XP ganados
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex gap-3 pt-4">
        {currentStepIndex > 0 && (
          <button
            onClick={() => setCurrentStepIndex((prev) => prev - 1)}
            className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100"
          >
            ← Paso anterior
          </button>
        )}
        
        {currentStepIndex === 0 && (
          <button
            onClick={onPrev}
            className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100"
          >
            ← Atrás
          </button>
        )}

        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className={`
            flex-1 rounded-2xl py-3 font-bold text-white transition-all
            ${canAdvance
              ? 'bg-forest hover:bg-forest-dark'
              : 'bg-stone-300 cursor-not-allowed'
            }
          `}
        >
          {isLastStep ? 'Terminar cocción' : 'Siguiente paso →'}
        </button>
      </div>

    </div>
  );
}
```

### Paso 2 — Integrar en `LessonFlow.jsx`

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IngredientsScreen } from "./IngredientsScreen";
import { PrepScreen } from "./PrepScreen";
import { CookingScreen } from "./CookingScreen"; // 👈 nuevo
import { ResultsScreen } from "./ResultsScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

const XP_PER_SCREEN = {
  1: 0,
  2: 15,
  3: 10,
  4: 0, // 👈 El XP ahora viene de los quizzes, no del avance
  5: 10,
};

const LessonFlow = ({ lesson, onEarnXp }) => {
  const [step, setStep] = useState(1);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  
  const next = () => {
    const nextStep = Math.min(TOTAL_SCREENS, step + 1);
    setStep(nextStep);
    
    const xpEarned = XP_PER_SCREEN[nextStep] || 0;
    if (xpEarned > 0) {
      onEarnXp(xpEarned);
      setTotalXpEarned((prev) => prev + xpEarned);
    }
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  // Cuando termina la pantalla de cocción, recibe el XP de los quizzes
  const handleCookingComplete = (cookingXp) => {
    onEarnXp(cookingXp);
    setTotalXpEarned((prev) => prev + cookingXp);
    setStep(5); // avanzar a resultados
  };

  return (
    <div>
      {/* barra de progreso */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-amber transition-all duration-300"
            style={{ width: `${(step / TOTAL_SCREENS) * 100}%` }}
          />
        </div>
        <span className="text-xs text-stone-400 tabular-nums">
          {step} / {TOTAL_SCREENS}
        </span>
      </div>

      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {step === 2 && <IngredientsScreen ingredients={lesson.ingredients} onNext={next} onPrev={prev} />}
      {step === 3 && <PrepScreen prepOrder={lesson.prepOrder} onNext={next} onPrev={prev} />}
      
      {/* Pantalla 4/5 */}
      {step === 4 && (
        <CookingScreen
          cookingSteps={lesson.cookingSteps}
          onComplete={handleCookingComplete}
          onPrev={prev}
        />
      )}
      
      {step === 5 && <ResultsScreen lesson={lesson} xpEarned={totalXpEarned} onPrev={prev} />}
    </div>
  );
};

export default LessonFlow;
```

### Paso 3 — Probar

1. Llega a la pantalla 4/5
2. Deberías ver:
   - Barra de progreso interna "Paso 1 / 6"
   - Instrucción: "Añade los copos de avena al frasco"
   - Quiz: "¿Por qué se hidrata la avena en frío?"
   - 3 opciones (A, B, C)
3. Selecciona una respuesta → se marca con borde amarillo
4. Click "Verificar respuesta":
   - Si acertaste → feedback verde + explicación + XP
   - Si fallaste → feedback rojo + explicación, sin XP
5. Click "Siguiente paso" → avanza al siguiente paso de cocción
6. Repite hasta el último paso
7. Click "Terminar cocción" → avanza a la pantalla de resultados con el XP total

## 🤔 Decisión de diseño

### ¿Por qué `hasVerified` en lugar de comparar `selectedAnswer === correctIndex` directamente?

Porque necesitas **dos estados distintos**:
1. "El usuario seleccionó algo" (`selectedAnswer !== null`)
2. "El usuario ya verificó su respuesta" (`hasVerified === true`)

Sin `hasVerified`, al seleccionar la respuesta correcta, el feedback verde aparecería inmediatamente — sin darle oportunidad de leer las otras opciones o de reflexionar.

### ¿Por qué `onComplete(totalXpEarned)` en lugar de `onNext()`?

Porque la pantalla de cocción **acumula XP** que necesitas reportar al padre. Si solo haces `onNext()`, el padre no sabe cuánto XP ganaste en los quizzes. El patrón: cuando una pantalla genera datos (XP, respuestas, tiempo), los pasa al terminar vía callback.

### ¿Por qué permitir retroceder con "← Paso anterior" dentro de la pantalla 4?

Porque si el usuario quiere revisar la explicación del paso anterior (ej: "¿qué dijo sobre la canela?"), puede hacerlo sin salir de la pantalla de cocción. Eso sí, no puede cambiar su respuesta — el quiz es de una sola oportunidad.

### ¿Por qué `String.fromCharCode(65 + index)` para las letras A, B, C?

`65` es el código ASCII de "A". `65 + 0 = A`, `65 + 1 = B`, `65 + 2 = C`. Es más escalable que hardcodear `["A", "B", "C"][index]` — funciona hasta la Z sin cambios.

## 🏋️ Ejercicio

1. **Añade un timer**: muestra cuánto tiempo lleva el usuario en esta pantalla de cocción. Usa `useState` + `setInterval` que corre cada segundo. Al completar, muestra "Tiempo total: 3m 45s" en la pantalla de resultados.
2. **Añade penalización por error**: si el usuario falla un quiz, **puede reintentar**, pero solo gana la mitad del XP. Necesitas un estado `attempts` y validar `currentStep.xp / attempts`.
3. **Mejora la accesibilidad**: añade `role="radiogroup"` al contenedor de opciones y `role="radio"` a cada botón de opción. Los lectores de pantalla anunciarán "Grupo de opciones, opción A de 3".

---

# 🎉 Pantallas completas — ¡Siguiente paso!

Ya construiste las 4 pantallas:

✅ **Pantalla 2/5: Ingredientes** — estado derivado, modales controlados  
✅ **Pantalla 5/5: Resultados** — navegación programática, confetti  
✅ **Pantalla 3/5: Preparación** — drag & drop con @dnd-kit  
✅ **Pantalla 4/5: Cocción** — quizzes con validación y XP condicional  

## 🎯 Lo que aprendiste

- **Estado derivado** — calcularlo en lugar de guardarlo
- **Modales controlados** — un estado que decide qué mostrar y cuándo
- **Navegación programática** — `useNavigate()` para cambiar rutas desde código
- **Drag & drop** — @dnd-kit para arrastrar y soltar con validación
- **Estado multi-paso** — máquinas de estados dentro de componentes
- **Validación condicional** — habilitar/deshabilitar acciones según el estado

## 🚀 Mejoras opcionales

Si quieres pulir el MVP:

1. **Animaciones con Framer Motion**:
   ```bash
   npm install framer-motion
   ```
   Anima las transiciones entre pasos, el feedback de respuestas correctas/incorrectas.

2. **Sonidos**:
   - Añade `public/sounds/correct.mp3` y `public/sounds/wrong.mp3`
   - Reproduce al verificar respuestas: `new Audio('/sounds/correct.mp3').play()`

3. **Persistencia de progreso dentro de lección**:
   - Si el usuario cierra la app a mitad de lección, que pueda continuar desde donde se quedó
   - Guarda `{ lessonId, step, selectedIngredients, prepOrder }` en `sessionStorage`

4. **Analytics**:
   - Trackea en qué paso abandonan los usuarios
   - Qué quizzes fallan más (para mejorar las explicaciones)

5. **Tests**:
   - Vitest + Testing Library para testear que los quizzes validan correctamente
   - Testear que el XP se suma bien

## 📚 Recursos para profundizar

- **@dnd-kit docs**: [docs.dndkit.com](https://docs.dndkit.com) — sortables, sensores custom
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion) — animaciones declarativas
- **React Router**: [reactrouter.com](https://reactrouter.com) — nested routes, loaders, actions
- **Testing Library**: [testing-library.com/react](https://testing-library.com/react) — tests centrados en UX

---

**¡Felicidades por completar las 4 pantallas!** 🎊

Ahora tienes un flujo de lección completo y funcional. El siguiente paso natural es:
- Añadir 2-3 lecciones más a `lessons.js` (variar tipo de cocina, dificultad)
- Desplegar a producción (Vercel/Netlify)
- Conseguir usuarios reales y observar cómo interactúan

**¿Tienes preguntas sobre alguna pantalla o quieres ayuda con las mejoras opcionales?**