# 📚 NutriCocina — Guía paso a paso para construir el MVP

> Aprende a construir una app gamificada de cocina con **React + Tailwind v4**, explicada como te la enseñaría un dev senior: con el **porqué** detrás de cada decisión, no solo el **cómo**.

---

## 🎯 Qué vas a construir

Una app móvil-first que enseña recetas saludables a través de lecciones interactivas con quizzes, XP, badges y un recetario persistente. Sin backend: todo vive en archivos JSON y `localStorage`.

**Stack:**
- ⚡ **Vite** — bundler ultra-rápido
- ⚛️ **React 18** — en JavaScript puro (sin TypeScript)
- 🧭 **React Router DOM v6** — navegación entre páginas
- 🎨 **Tailwind CSS v4** — estilos con tokens en CSS
- 💾 **localStorage** — persistencia sin servidor

---

## 🗺️ Índice navegable

| # | Lección | Concepto React | Estado |
|---|---|---|---|
| 1 | [Setup del proyecto](#lección-1--setup-vite--react--tailwind-v4) | Estructura, build tool | 🟢 Tanda 1 |
| 2 | [Modelado de datos](#lección-2--modelado-de-datos-en-javascript) | Objetos, arrays, JSDoc | 🟢 Tanda 1 |
| 3 | [Componentes y props](#lección-3) | Composición, props | ⏳ Tanda 2 |
| 4 | [`useState` y máquina de pasos](#lección-4) | Estado local | ⏳ Tanda 2 |
| 5 | [Custom hook `useProgress`](#lección-5) | `useEffect`, hooks | ⏳ Tanda 3 |
| 6 | [Lifting state up](#lección-6) | Callbacks padre-hijo | ⏳ Tanda 3 |
| 7 | [Tailwind v4 con `@theme`](#lección-7) | Design tokens | ⏳ Tanda 4 |
| 8 | [Render condicional + Router](#lección-8) | Flujo y navegación | ⏳ Tanda 4 |
| 9 | [Cierre y checklist](#cierre) | Próximos pasos | ⏳ Tanda 4 |

---

## 🧭 Cómo usar esta guía

Cada lección sigue la misma estructura:

1. **🎯 Objetivo** — qué vas a lograr
2. **💡 Concepto clave** — la idea de React explicada con analogía
3. **🛠️ Manos a la obra** — código comentado paso a paso
4. **🤔 Decisión de diseño** — por qué se hizo así y qué alternativas existen
5. **🏋️ Ejercicio** — algo concreto para practicar antes de seguir

> 💬 **Tip de senior**: no copies-pegues. Escribe el código tú mismo. La memoria muscular del tipeo es la diferencia entre "leí un tutorial" y "sé hacerlo".

---

# Lección 1 — Setup: Vite + React + Tailwind v4

## 🎯 Objetivo

Tener un proyecto React vacío corriendo en `http://localhost:5173` con Tailwind v4 funcionando, en menos de 5 minutos.

## 💡 Concepto clave: ¿qué es un bundler y por qué Vite?

Cuando escribes `import { useState } from "react"`, el navegador **no entiende** eso. Necesitas una herramienta que:

1. Lea todos tus archivos `.jsx`,
2. Los transforme a JavaScript que el navegador entienda,
3. Los junte ("bundle") en pocos archivos,
4. Recargue el navegador automáticamente cuando cambies algo (HMR = Hot Module Replacement).

Eso es un **bundler**. Vite es el bundler moderno: usa ESM nativo en desarrollo (instantáneo) y Rollup para producción (optimizado).

> **Analogía**: Vite es el traductor simultáneo entre tu código moderno y el navegador. En modo dev habla "directo"; en modo build empaqueta todo en una maleta optimizada.

## 🛠️ Manos a la obra

### Paso 1 — Crear el proyecto

```bash
npm create vite@latest nutricocina -- --template react
cd nutricocina
npm install
```

> El `-- --template react` le dice a Vite que use la plantilla de **React + JavaScript** (no TypeScript). Si quieres TS algún día, sería `react-ts`.

### Paso 2 — Instalar Tailwind v4

```bash
npm install tailwindcss @tailwindcss/vite
```

> ⚠️ **No instales** `postcss` ni `autoprefixer` ni corras `npx tailwindcss init`. Eso era Tailwind v3. La v4 es radicalmente más simple.

### Paso 3 — Activar el plugin de Tailwind en Vite

Edita `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 👈 nuevo

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 nuevo
  ],
});
```

### Paso 4 — Importar Tailwind en tu CSS

Reemplaza **todo** el contenido de `src/index.css` por:

```css
@import "tailwindcss";
```

> Sí, una sola línea. La v4 detecta automáticamente qué clases usas en tus archivos `.jsx`. Sin `content: [...]`, sin `@tailwind base/components/utilities`.

### Paso 5 — Probarlo

Reemplaza `src/App.jsx` por:

```jsx
function App() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-700">
        🌽 NutriCocina
      </h1>
    </div>
  );
}

export default App;
```

Corre:

```bash
npm run dev
```

Abre `http://localhost:5173`. Si ves el título naranja sobre fondo crema, Tailwind funciona. 🎉

### Paso 6 — Crear la estructura de carpetas

```bash
mkdir -p src/components/lesson src/data src/hooks src/pages
```

Tu árbol queda así:

```text
src/
├── components/
│   └── lesson/         ← componentes de pantallas (Welcome, Cooking, etc.)
├── data/               ← lessons.js (las recetas)
├── hooks/              ← useProgress.js (XP, badges)
├── pages/              ← Home.jsx (orquesta el flujo)
├── App.jsx             ← entry point + router
├── index.css           ← @import "tailwindcss"
└── main.jsx            ← bootstrap de React
```

## 🤔 Decisión de diseño: ¿por qué separar en estas carpetas?

| Carpeta | Responsabilidad | Regla |
|---|---|---|
| `components/` | UI reutilizable | **No saben de dónde vienen los datos.** Reciben todo por props. |
| `data/` | Fuente de verdad | Solo objetos y arrays. Cero JSX, cero lógica. |
| `hooks/` | Lógica reutilizable con estado | Empiezan con `use`. Encapsulan `useState` + `useEffect`. |
| `pages/` | Orquestadores | Conectan datos + hooks + componentes. Aquí vive el "pegamento". |

**Alternativa rechazada**: una sola carpeta `src/` plana con todo mezclado. Funciona para 5 archivos. A los 30 archivos no encuentras nada. La separación temprana es barata; reorganizar después es caro.

## 🏋️ Ejercicio

1. Cambia el emoji 🌽 por otro y verifica que recargue solo (HMR).
2. Añade un segundo `<h1>` y observa el error de React. ¿Qué te dice? (Spoiler: necesitas un fragment `<>...</>` o un `<div>` padre. Esto será relevante en la Lección 3.)
3. En `index.css`, añade debajo del import:
   ```css
   @theme {
     --color-terracota: #c1583b;
   }
   ```
   Luego usa `bg-terracota` en tu `<div>`. ¿Funcionó? Eso es **Tailwind v4 con tokens custom** — el tema completo de la Lección 7.

---

# Lección 2 — Modelado de datos en JavaScript

## 🎯 Objetivo

Diseñar la estructura de datos de una receta en `src/data/lessons.js`, sin TypeScript, pero con suficiente disciplina para que tu yo del futuro no llore.

## 💡 Concepto clave: separar datos de UI

**La regla de oro**: una receta es **datos puros**, no JSX. Si mañana quieres mostrar "Overnight Oats" en una tarjeta, en una lista, en un PDF o en un email, los datos son los mismos. Solo cambia la presentación.

Por eso `lessons.js` no importa nada de React. Solo exporta objetos.

> **Analogía**: los datos son los ingredientes en el refri. Los componentes son las recetas que los cocinan de formas distintas. No metas la sartén dentro del refri.

## 🛠️ Manos a la obra

### Paso 1 — Crear `src/data/lessons.js`

```js
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

/** @type {Lesson[]} */
export const lessons = [
  {
    id: "overnight-oats",
    name: "Overnight Oats",
    cuisine: "Desayuno saludable",
    description:
      "Avena remojada en frío: un desayuno cremoso, nutritivo y listo al despertar. 5 minutos de prep.",
    dishEmoji: "🥣",
    costPerServing: 25,
    costCurrency: "MXN",
    servings: 2,
    highlights: [
      { icon: "🌙", title: "Se prepara la noche anterior", detail: "Listo en 5 min antes de dormir" },
      { icon: "🌾", title: "Energía de liberación lenta",  detail: "Beta-glucanos que sacian por horas" },
      { icon: "🌱", title: "Vegano y sin gluten*",         detail: "*Con avena certificada sin gluten" },
    ],
    ingredients: [
      { id: "avena",     name: "Copos de avena",      emoji: "🌾", amount: "1/2 taza (45 g)" },
      { id: "leche",     name: "Leche vegetal",       emoji: "🥛", amount: "1/2 taza (120 ml)" },
      { id: "cacahuete", name: "Crema de cacahuete",  emoji: "🥜", amount: "2 cdas. (30 g)" },
      { id: "lino",      name: "Semillas de lino",    emoji: "🌱", amount: "1 cda. (10 g)" },
      { id: "canela",    name: "Canela en polvo",     emoji: "🌿", amount: "1/2 cdita" },
      { id: "miel",      name: "Miel",                emoji: "🍯", amount: "1 cdita" },
    ],
    prepOrder: [
      "Elegir un frasco de cristal con tapa hermética",
      "Medir 1/2 taza de copos de avena finos",
      "Medir 1/2 taza de leche vegetal fría",
      "Preparar los toppings (plátano, arándanos)",
      "Reservar espacio en la nevera (mínimo 4 h)",
    ],
    cookingSteps: [
      {
        question: "¿Por qué se hidrata la avena en frío y no caliente?",
        options: [
          "Porque calentarla destruye las vitaminas",
          "Para que absorba lentamente y conserve textura cremosa sin hacerse papilla",
          "Porque el frío añade probióticos",
        ],
        correctIndex: 1,
        xp: 20,
      },
      // ... más pasos
    ],
    badge: "Madrugador saludable",
  },
];

/**
 * Busca una lección por su id.
 * @param {string} id
 * @returns {Lesson | undefined}
 */
export function getLesson(id) {
  return lessons.find((l) => l.id === id);
}

export const TOTAL_SCREENS = 5; // Welcome, Ingredients, Prep, Cooking, Results
```

### Paso 2 — Probar que se importa bien

En `App.jsx`, temporalmente:

```jsx
import { lessons } from "./data/lessons";

function App() {
  return (
    <pre className="p-4 text-xs">
      {JSON.stringify(lessons[0], null, 2)}
    </pre>
  );
}

export default App;
```

Si ves el JSON de la receta en la pantalla, todo bien.

## 🤔 Decisión de diseño

### ¿Por qué `id` en cada cosa (lección, ingrediente)?

Porque React los va a renderizar en listas con `.map()`, y necesita una `key` estable y única. El `id` es la respuesta universal. **Nunca** uses el índice del array como `key` si la lista puede cambiar de orden.

### ¿Por qué JSDoc si no usamos TypeScript?

JSDoc te da **autocompletado en VS Code gratis**, sin compilador, sin configuración. Cuando escribas `lesson.` el editor te sugiere `name`, `cuisine`, etc. Es 80% del valor de TS con 5% del costo.

> Puedes saltarte JSDoc al principio. Pero el día que tengas 10 recetas y cambies un campo, te vas a alegrar.

### ¿Por qué un array y una función `getLesson(id)`?

Porque mañana podrías:
- Cambiar el array por un `fetch()` a una API.
- Filtrar por dificultad.
- Ordenar por popularidad.

Si los componentes acceden a `lessons[0]` directo, todos se rompen. Si acceden vía `getLesson("overnight-oats")`, solo cambias **una** función.

> Esto se llama **encapsulación**: esconder el "cómo" detrás de un "qué".

### ¿Por qué `costCurrency` separado del número?

Porque el día que agregues recetas en USD o EUR, no quieres reescribir la UI. El componente formatea: `${cost} ${currency}`.

## 🏋️ Ejercicio

1. **Añade una segunda receta** al array (reto: "Lentejas Guisadas" — un guiso mexicano con 6 ingredientes y un quiz sobre por qué la sal va al final en leguminosas).
2. Cambia `App.jsx` para mostrar **los nombres de todas las recetas** en una `<ul>`:
   ```jsx
   <ul>
     {lessons.map((l) => (
       <li key={l.id}>{l.dishEmoji} {l.name}</li>
     ))}
   </ul>
   ```
   Esto ya es un preview de la Lección 3 (componentes y `.map()`).
3. **Pregunta de diseño**: si quisieras añadir un campo `difficulty: "easy" | "medium" | "hard"`, ¿lo añadirías como string libre o como constante exportada? Piensa por qué antes de seguir.
   <details><summary>💡 Respuesta</summary>
   Como constante exportada (`export const DIFFICULTIES = ["easy", "medium", "hard"]`). Así el editor te avisa si escribes `"esay"` por error y puedes generar filtros automáticamente desde la constante.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 1

Hasta aquí tienes:

- ✅ Proyecto Vite + React + Tailwind v4 corriendo
- ✅ Estructura de carpetas profesional
- ✅ Modelo de datos de una receta, tipado con JSDoc
- ✅ Una función `getLesson(id)` lista para usar

**Antes de la Tanda 2**, asegúrate de:

1. Haber corrido `npm run dev` y visto algo en pantalla.
2. Tener el array de `lessons` con al menos **una receta completa**.
3. Entender **por qué** los datos viven en `data/` y no dentro de un componente.

Cuando estés listo, escribe **"sigue"** y arranco la **Tanda 2**: Lecciones 3 (componentes y props) y 4 (`useState` y máquina de pasos).

> ❓ Si tienes dudas de la Tanda 1, pregúntalas ahora. Vale más entender bien que avanzar rápido.

---

# 🍳 Tanda 2 — Componentes y estado

Ya tienes datos. Ahora vas a **mostrarlos** y **moverte entre pantallas**. Dos lecciones:

- **Lección 3**: descomponer la UI en componentes y pasar datos con **props**.
- **Lección 4**: recordar en qué paso estás con **`useState`** (una pequeña máquina de pasos).

---

## Lección 3 · Componentes y props (sin TypeScript)

### 🎯 Objetivo

Convertir el JSON de la receta en pantalla, usando componentes pequeños y reutilizables. Al final tendrás una `WelcomeScreen` que recibe la receta como prop y muestra título, descripción, costo y *highlights*.

### 🧠 Idea clave

> Un componente es una **función que recibe props y devuelve JSX**. Las props son su único "input público": si necesitas cambiar lo que muestra, le pasas otra prop, no editas el componente por dentro.

Regla práctica: **un componente, una responsabilidad**. Si una función JSX hace scroll mental por más de ~80 líneas o mezcla 3 ideas distintas (header + lista + footer + modal), pártelo.

### 🗂️ Estructura propuesta

```
src/
  components/
    lesson/
      WelcomeScreen.jsx     ← pantalla de bienvenida
      RecipeHighlight.jsx   ← una "tarjeta" de highlight
  data/
    lessons.js
  App.jsx
```

### 1) El componente más pequeño primero: `RecipeHighlight`

Un highlight es `{ icon, title, detail }`. Lo encapsulamos:

```jsx
// src/components/lesson/RecipeHighlight.jsx
export function RecipeHighlight({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white/60 p-3">
      <span className="text-2xl" aria-hidden>{icon}</span>
      <div>
        <p className="font-semibold text-stone-800">{title}</p>
        <p className="text-sm text-stone-600">{detail}</p>
      </div>
    </div>
  );
}
```

**Por qué así:**
- Recibe **solo lo que necesita** (3 props), no la lección entera. Más fácil de reutilizar.
- Sin estado interno: es un componente **de presentación** (a veces llamado *dumb component*).
- `aria-hidden` en el emoji decorativo: el lector de pantalla no lo lee dos veces.

### 2) El componente que orquesta: `WelcomeScreen`

```jsx
// src/components/lesson/WelcomeScreen.jsx
import { RecipeHighlight } from "./RecipeHighlight";

/**
 * @param {{ lesson: import("../../data/lessons").Lesson, onStart: () => void }} props
 */
export function WelcomeScreen({ lesson, onStart }) {
  return (
    <section className="space-y-5">
      <header className="text-center">
        <span className="text-5xl" aria-hidden>{lesson.dishEmoji}</span>
        <h1 className="mt-2 font-display text-2xl font-bold">{lesson.name}</h1>
        <p className="text-sm uppercase tracking-widest text-stone-500">
          {lesson.cuisine}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-stone-700">
          {lesson.description}
        </p>
      </header>

      <ul className="space-y-2">
        {lesson.highlights.map((h) => (
          <li key={h.title}>
            <RecipeHighlight icon={h.icon} title={h.title} detail={h.detail} />
          </li>
        ))}
      </ul>

      <button
        onClick={onStart}
        className="w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white shadow hover:bg-amber-700"
      >
        Empezar receta →
      </button>
    </section>
  );
}
```

**Decisiones que vale la pena nombrar:**

1. **`lesson` como prop, no import directo.** El componente no sabe ni le importa de dónde vienen los datos. Mañana podrías traerlos de una API y `WelcomeScreen` no cambia ni una línea.
2. **`onStart` como prop (callback).** El componente no decide qué pasa al hacer click; solo avisa. Esto es el patrón **"data down, events up"**: los datos bajan por props, los eventos suben por callbacks.
3. **`key={h.title}`** en el `.map()`. React necesita una clave estable para reconciliar la lista. Si dos highlights pudieran tener el mismo título, usaríamos un `id` en los datos.
4. **JSDoc en vez de TypeScript.** El comentario `@param` le da autocompletado a tu editor sin instalar nada.

### 3) Conectar todo en `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { WelcomeScreen } from "./components/lesson/WelcomeScreen";

export default function App() {
  const lesson = getLesson("overnight-oats");

  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 px-5 py-6">
      <WelcomeScreen lesson={lesson} onStart={() => alert("¡Vamos!")} />
    </main>
  );
}
```

Abre el navegador. Deberías ver la receta de Overnight Oats. Si cambias `"overnight-oats"` por `"lentejas-guisadas"` (cuando la añadas), **no tocas ni `WelcomeScreen` ni `RecipeHighlight`**. Eso es desacoplar bien.

### ⚠️ Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| `Each child in a list should have a unique "key"` | Olvidaste `key` en el `.map()` | Añade `key={algo-único}` en el elemento raíz del map |
| El emoji se lee raro con lector de pantalla | Falta `aria-hidden` | Añádelo en spans decorativos |
| Cambias el nombre de la receta y se rompe la UI | Estás importando `lessons` directo dentro de `WelcomeScreen` | Pasa siempre `lesson` por prop |

### 🏋️ Mini-ejercicio

1. Crea `IngredientPill.jsx` que reciba `{ emoji, name, portion }` y renderice una "píldora" con borde redondeado.
2. En `WelcomeScreen`, añade una sección **"Ingredientes"** que mapee `lesson.ingredients` y use `IngredientPill`.
3. Sin pista esta vez: ¿qué prop usarías como `key`? ¿Por qué no `name`?
   <details><summary>💡 Respuesta</summary>
   `id`. Dos ingredientes podrían llamarse igual en otra receta (ej. "Sal"); el `id` es único y estable.
   </details>

---

## Lección 4 · `useState` y máquina de pasos

### 🎯 Objetivo

Pasar de **una sola pantalla** a un flujo de varias: bienvenida → ingredientes → preparación → cocina → resultados. Vas a aprender `useState` modelando el paso actual como un **número**, no como mil booleanos.

### 🧠 Idea clave

> El estado es **memoria del componente entre renders**. Cada vez que llamas a `setX(...)`, React vuelve a ejecutar el componente con el nuevo valor. No mutas el valor anterior: lo **reemplazas**.

Y la idea más importante de esta lección:

> Cuando varios estados están relacionados (paso 1, 2, 3, 4, 5) **no uses 5 booleanos**. Usa **un solo estado** que represente "en qué estoy". Esto se llama **máquina de estados** y elimina bugs imposibles (como estar en el paso 2 y el 4 a la vez).

### 1) `useState` en su forma más simple

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // valor inicial: 0

  return (
    <button onClick={() => setCount(count + 1)}>
      Llevas {count} clicks
    </button>
  );
}
```

Tres reglas:
1. `useState` se llama **siempre al inicio** del componente, nunca dentro de `if`/`for`.
2. El **setter** (`setCount`) es la única forma de cambiarlo. Hacer `count = 5` no hace nada.
3. Si el nuevo valor depende del anterior, usa la forma de **función**: `setCount((c) => c + 1)`. Evita bugs cuando hay varios sets seguidos.

### 2) Antimodelo: 5 booleanos

```jsx
// ❌ NO HAGAS ESTO
const [showWelcome, setShowWelcome] = useState(true);
const [showIngredients, setShowIngredients] = useState(false);
const [showPrep, setShowPrep] = useState(false);
const [showCooking, setShowCooking] = useState(false);
const [showResults, setShowResults] = useState(false);
```

Problemas:
- Puedes acabar con `showWelcome` y `showResults` ambos `true` → **estado imposible**.
- Cada transición tiene que apagar uno y prender otro: 4 líneas por click.
- Imposible hacer "siguiente" / "anterior" sin un `if` gigante.

### 3) Modelo correcto: un número

```jsx
const [step, setStep] = useState(1); // 1..5

const next = () => setStep((s) => Math.min(5, s + 1));
const prev = () => setStep((s) => Math.max(1, s - 1));
const goHome = () => setStep(1);
```

Una sola variable, transiciones triviales, **imposible** estar en dos pasos a la vez.

### 4) Aplicado al proyecto: `LessonFlow`

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";

const TOTAL_STEPS = 5;

export function LessonFlow({ lesson }) {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));

  return (
    <>
      {/* Barra de progreso: derivada del estado, no es otro estado */}
      <div className="mb-4 h-2 w-full rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-amber-600 transition-all"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {step === 2 && <p>Pantalla de ingredientes (próxima lección)</p>}
      {step === 3 && <p>Pantalla de preparación</p>}
      {step === 4 && <p>Pantalla de cocina</p>}
      {step === 5 && <p>Resultados 🎉</p>}
    </>
  );
}
```

**Observa la barra de progreso:** no es un `useState` aparte. Se **deriva** de `step`. Regla de oro:

> Si puedes calcularlo a partir de otro estado, **no lo guardes**. Cálculo > duplicación.

(Si guardas `progress` y `step` por separado, tarde o temprano se desincronizan. Bug clásico.)

### 5) Subir el flujo a `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { LessonFlow } from "./components/lesson/LessonFlow";

export default function App() {
  const lesson = getLesson("overnight-oats");
  return (
    <main className="mx-auto min-h-screen max-w-md bg-stone-50 px-5 py-6">
      <LessonFlow lesson={lesson} />
    </main>
  );
}
```

### ⚠️ Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| El estado "no cambia" al hacer click | Estás mutando (`array.push(...)`) en vez de reemplazar | Crea un array nuevo: `setItems([...items, x])` |
| El contador salta de 1 en 1 cuando hago dos `setCount(count+1)` seguidos | Ambos leen el mismo `count` viejo | Usa la forma función: `setCount((c) => c + 1)` |
| "Too many re-renders" | Llamas al setter **durante** el render (`setStep(2)` fuera de un handler) | Solo llama setters dentro de eventos o efectos |
| La barra de progreso se desincroniza | Guardaste `progress` como otro `useState` | Derívalo: `const pct = step / TOTAL_STEPS * 100` |

### 🏋️ Mini-ejercicio

1. Añade un botón **"← Atrás"** en `LessonFlow` (deshabilitado en el paso 1).
2. Añade un contador `xp` con `useState(0)`. Cada vez que llames a `next()`, suma 10 XP.
3. Pregunta de diseño: si quisieras que `xp` se conserve aunque el usuario reinicie la receta, ¿dónde lo guardarías?
   <details><summary>💡 Respuesta</summary>
   Fuera del componente del flujo: en un componente padre (App) o en un hook compartido (`useProgress`) que persista en `localStorage`. Lo veremos en la Tanda 4.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 2

Ya sabes:

- ✅ Partir UI en componentes pequeños con **una sola responsabilidad**
- ✅ Pasar datos con **props** y eventos con **callbacks** (data down, events up)
- ✅ Usar **`useState`** sin caer en mutaciones
- ✅ Modelar pantallas como **un solo número** (mini máquina de estados)
- ✅ **Derivar** valores en lugar de duplicar estado

**Antes de la Tanda 3**, comprueba que:

1. Tu `WelcomeScreen` se ve con los datos de Overnight Oats.
2. `LessonFlow` cambia de paso al pulsar "Empezar receta".
3. La barra de progreso se mueve sola al cambiar `step`.

Cuando quieras, escribe **"sigue"** y arranco la **Tanda 3**: Lecciones 5 (listas + interacción: pantalla de ingredientes con "canasto") y 6 (mini-juego de orden de preparación con drag/click).

> ❓ Si algo de props, callbacks o `useState` no terminó de aterrizar, pregúntalo ahora: la Tanda 3 lo da por sabido.
