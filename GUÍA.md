# 📚 NutriCocina — Guía paso a paso para construir el MVP

> Aprende a construir una app gamificada de cocina con **React + Tailwind v4**, explicada como te la enseñaría un dev senior: con el **porqué** detrás de cada decisión, no solo el **cómo**.

---

## 🎯 Qué vas a construir

Una app web responsiva (mobile-first) que enseña recetas saludables a través de lecciones interactivas con quizzes, XP, badges y un recetario persistente. Sin backend: todo vive en archivos JS y `localStorage`.

**Stack:**
- ⚡ **Vite** — bundler ultra-rápido
- ⚛️ **React 18** — en JavaScript puro (sin TypeScript)
- 🧭 **React Router DOM v6** — navegación entre páginas
- 🎨 **Tailwind CSS v4** — estilos con tokens en CSS (`@theme`)
- 💾 **localStorage** — persistencia sin servidor

---

## 👥 Nota sobre división de trabajo

Esta guía está diseñada para **trabajo en equipo**. Si estás siguiéndola con un compañero:

**PERSONA A (flujo de lecciones):**
- `src/components/lesson/*` — todas las pantallas de lección (Welcome, Ingredients, Prep, Cooking, Results)
- `src/pages/LessonPage.jsx` — página que orquesta el flujo
- Ruta: `/lesson/:lessonId`

**PERSONA B (páginas principales):**
- `src/pages/Home.jsx` — dashboard principal
- `src/pages/Profile.jsx` — perfil del usuario
- `src/components/layout/AppShell.jsx` — sidebar y bottom nav
- Rutas: `/` y `/profile`

**ARCHIVOS COMPARTIDOS** (requieren coordinación):
- `src/App.jsx` — configuración de rutas
- `src/data/lessons.js` — datos de recetas
- `src/hooks/useProgress.js` — sistema de XP
- `src/index.css` — design tokens

Si trabajas solo, sigue la guía completa. Si trabajas en equipo, las Lecciones 7-8 ya incluyen notas de coordinación.

---

## 🎨 Referencia visual — Las 5 pantallas del flujo de lección

Cada lección tiene exactamente **5 pantallas** en este orden:

| Paso | Pantalla | Qué hace el usuario |
|------|----------|---------------------|
| 1/5 | **Bienvenida** | Lee la receta, highlights nutricionales, decide empezar |
| 2/5 | **Compra los ingredientes** | Toca tiles del "Mercado" → lee tarjeta nutricional → añade a canasta |
| 3/5 | **Prepara los ingredientes** | Arrastra (o toca) pasos de prep al orden correcto |
| 4/5 | **¡Hagamos el platillo!** | Sigue pasos de cocción con quiz por paso, gana XP |
| 5/5 | **Resultados** | Ve XP ganado, el platillo completado, accede al recetario |

**Sistema de color (extraído de los mockups):**

```css
/* src/index.css — dentro de @theme */
@theme {
  --color-cream:        #F5E3C8;   /* fondo principal */
  --color-forest:       #1B5C3E;   /* sidebar, botones primarios */
  --color-forest-dark:  #144A31;   /* hover del sidebar */
  --color-amber:        #F5A623;   /* hero cards, progreso activo */
  --color-amber-dark:   #E09410;   /* hover amber */
  --color-orange:       #E8843A;   /* tiles de ingredientes */
  --color-orange-dark:  #D4601A;   /* hover de tiles */
}
```

**Layout responsivo:**
- **Desktop / tablet**: sidebar verde fijo a la izquierda (70 px), contenido a la derecha
- **Móvil** (< 768 px): sidebar se convierte en **bottom navigation bar** (el sidebar roba demasiado ancho en pantallas de 390 px)

---

## 🗺️ Índice navegable

| # | Lección | Concepto React | Estado |
|---|---|---|---|
| 1 | [Setup del proyecto](#lección-1--setup-vite--react--tailwind-v4) | Estructura, build tool | 🟢 Tanda 1 |
| 2 | [Modelado de datos](#lección-2--modelado-de-datos-en-javascript) | Objetos, arrays, JSDoc | 🟢 Tanda 1 |
| 3 | [Componentes y props](#lección-3--componentes-y-props) | Composición, props | 🟢 Tanda 2 |
| 4 | [`useState` y máquina de pasos](#lección-4--usestate-y-máquina-de-pasos) | Estado local | 🟢 Tanda 2 |
| 5 | [Custom hook `useProgress`](#lección-5--custom-hook-useprogress-useeffect--localstorage) | `useEffect`, hooks | 🟢 Tanda 3 |
| 6 | [Lifting state up](#lección-6--lifting-state-up-subir-el-estado-al-padre) | Callbacks padre-hijo | 🟢 Tanda 3 |
| 7 | [Tailwind v4 con `@theme`](#lección-7--tailwind-v4-con-theme-sistema-de-diseño-completo) | Design tokens | 🟢 Tanda 4 |
| 8 | [React Router DOM v6](#lección-8--react-router-dom-v6-navegación-entre-páginas) | Rutas y navegación | 🟢 Tanda 4 |
| 9 | [Persistencia avanzada y edge cases](#lección-9) | localStorage robusto | ⏳ Tanda 5 |
| 10 | [Build, deploy y siguientes pasos](#lección-10) | Producción | ⏳ Tanda 5 |

---

## 📊 Progreso por tandas

| Tanda | Lecciones | Estado |
|---|---|---|
| 1 | L1 Setup Vite + React + Tailwind v4 · L2 Modelado de datos | ✅ Hecha |
| 2 | L3 Componentes y props · L4 `useState` y máquina de pasos | ✅ Hecha |
| 3 | L5 Custom hook `useProgress` · L6 Lifting state up | ✅ Hecha |
| 4 | L7 Tailwind v4 con `@theme` · L8 React Router DOM v6 | ✅ Hecha |
| 5 | L9 Persistencia avanzada · L10 Build, deploy y siguientes pasos | ⏳ Siguiente |

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

Tener un proyecto React vacío corriendo en `http://localhost:5173` con Tailwind v4 y los tokens de color reales de la app funcionando, en menos de 5 minutos.

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

> El `-- --template react` le dice a Vite que use la plantilla de **React + JavaScript** (no TypeScript).

### Paso 2 — Instalar Tailwind v4

```bash
npm install tailwindcss @tailwindcss/vite
```

> ⚠️ **No instales** `postcss` ni `autoprefixer` ni corras `npx tailwindcss init`. Eso era Tailwind v3. La v4 es radicalmente más simple.

### Paso 3 — Activar el plugin en Vite

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 👈 nuevo

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Paso 4 — Configurar `index.css` con los tokens reales

Reemplaza todo el contenido de `src/index.css`. Metemos los colores ahora para no hardcodear hex en los componentes después:

```css
@import "tailwindcss";

@theme {
  /* Paleta NutriCocina */
  --color-cream:        #F5E3C8;
  --color-forest:       #1B5C3E;
  --color-forest-dark:  #144A31;
  --color-amber:        #F5A623;
  --color-amber-dark:   #E09410;
  --color-orange:       #E8843A;
  --color-orange-dark:  #D4601A;

  /* Tipografía */
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body:    "Inter", sans-serif;
}
```

Añade las fuentes en `index.html` dentro de `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

> **Por qué los colores van en la Lección 1 y no después**: Si empiezas a construir componentes sin tokens definidos, terminas con `#1B5C3E` hardcodeado en 20 archivos. Cuando el diseñador cambia un color, sufres. Los tokens se definen una vez y se propagan solos. Costo: 5 minutos ahora. Beneficio: horas de refactor evitadas.

### Paso 5 — Probarlo

```jsx
// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <h1 className="font-display text-4xl font-bold text-forest">
        🥣 NutriCocina
      </h1>
    </div>
  );
}
export default App;
```

Corre `npm run dev`. Si ves el título verde sobre fondo crema, todo funciona. 🎉

### Paso 6 — Crear la estructura de carpetas

```bash
mkdir -p src/components/lesson src/components/layout src/data src/hooks src/pages
```

```text
src/
├── components/
│   ├── layout/         ← AppShell.jsx (sidebar + bottom nav responsivo)
│   └── lesson/         ← WelcomeScreen, IngredientsScreen, PrepScreen, CookingScreen, ResultsScreen
├── data/               ← lessons.js
├── hooks/              ← useProgress.js
├── pages/              ← Home.jsx, Profile.jsx, Recipes.jsx
├── App.jsx
├── index.css
└── main.jsx
```

> La carpeta `layout/` es nueva respecto a proyectos simples. Como tienes un sidebar real y un bottom nav, encapsular el "shell" de la app en su propio componente evita que el sidebar se filtre dentro de los componentes de lección.

## 🤔 Decisión de diseño

| Carpeta | Responsabilidad | Regla |
|---|---|---|
| `components/layout/` | Estructura visual (sidebar, bottom nav) | Solo sabe de navegación, ignora recetas |
| `components/lesson/` | Las 5 pantallas de una lección | Reciben datos por props, emiten eventos arriba |
| `data/` | Fuente de verdad | Sin JSX, sin lógica, solo objetos |
| `hooks/` | Lógica con estado reutilizable | Empiezan con `use`, encapsulan `localStorage` |
| `pages/` | Orquestadores de ruta | Conectan data + hooks + componentes |

## 🏋️ Ejercicio

1. Cambia el fondo a `bg-amber` y el texto a `text-forest-dark`. Confirma que usa tus tokens (no colores de Tailwind por defecto).
2. En DevTools → Elements → Computed, verifica que `font-family` del `<h1>` es "Plus Jakarta Sans". Si no, revisa el `<link>` en `index.html`.
3. Crea `src/components/layout/AppShell.jsx` vacío que solo retorna `<>{children}</>`. Lo construiremos en la Lección 7 — pero tenerlo ahora evita una refactorización dolorosa.

---

# Lección 2 — Modelado de datos en JavaScript

## 🎯 Objetivo

Diseñar la estructura de datos completa de una receta en `src/data/lessons.js`, con todos los campos que necesitan las 5 pantallas. Tipado con JSDoc, sin TypeScript.

## 💡 Concepto clave: el modelo de datos guía el diseño de componentes

Antes de escribir un componente, debes saber **exactamente qué datos va a recibir**. Un modelo incompleto hace que los componentes hagan cosas raras: importan datos de donde no deberían, mutar props, inventar campos que no existen.

> **Analogía**: los datos son el plano arquitectónico. Si el plano está mal, el edificio cae aunque el albañil sea bueno. Define bien el plano primero — con él en mano, los componentes se vuelven obvios.

## 🛠️ Manos a la obra

### Paso 1 — `src/data/lessons.js` con el modelo completo

Cada typedef está comentado junto a la pantalla que lo consume:

```js
/**
 * Pantalla 2/5 — "Compra los ingredientes"
 * Cada tile del Mercado es un Ingredient.
 * Al tocarlo, se revela la tarjeta nutricional (description + nutritionNote + portionNote).
 *
 * @typedef {Object} Ingredient
 * @property {string} id            - clave única  (ej. "avena")
 * @property {string} name          - nombre visible (ej. "Copos de avena")
 * @property {string} emoji         - emoji del tile
 * @property {string} amount        - cantidad de la receta (ej. "1/2 taza (45 g)")
 * @property {string} description   - frase corta de la tarjeta nutricional
 * @property {string} nutritionNote - nutrientes destacados (ej. "Beta-glucanos, fibra soluble")
 * @property {string} portionNote   - tamaño de porción legible (ej. "1/2 taza (45g)")
 */

/**
 * Pantalla 4/5 — "¡Hagamos el platillo!"
 * Cada paso tiene instrucción + quiz opcional.
 * `question` y `options` son opcionales — no todos los pasos tienen quiz.
 *
 * @typedef {Object} CookingStep
 * @property {string}    instruction    - qué hacer (ej. "Añade los copos de avena al frasco")
 * @property {string}    [question]     - pregunta del quiz (opcional)
 * @property {string[]}  [options]      - opciones de respuesta
 * @property {number}    [correctIndex] - índice de la opción correcta (0-based)
 * @property {string}    [explanation]  - feedback educativo al responder
 * @property {number}    xp             - XP que otorga este paso (0 si no hay quiz)
 */

/**
 * @typedef {Object} Lesson
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
 * @property {number}        totalXp         - XP total posible de la lección
 */

/** @type {Lesson[]} */
export const lessons = [
  {
    id: "overnight-oats",
    name: "Overnight Oats",
    cuisine: "Desayuno saludable",
    description: "Avena remojada en frío: un desayuno cremoso, nutritivo y listo al despertar. 5 minutos de prep.",
    dishEmoji: "🥣",
    costPerServing: 25,
    costCurrency: "MXN",
    servings: 2,

    highlights: [
      { icon: "🌙", title: "Se prepara la noche anterior", detail: "Listo en 5 min antes de dormir" },
      { icon: "🌾", title: "Energía de liberación lenta",  detail: "Beta-glucanos que sacian por horas" },
      { icon: "🌱", title: "Vegano y sin gluten*",         detail: "*Con avena certificada sin gluten" },
    ],

    // Pantalla 2/5: el "Mercado" muestra estas tiles en cuadrícula
    ingredients: [
      {
        id: "avena",
        name: "Copos de avena",
        emoji: "🌾",
        amount: "1/2 taza (45 g)",
        description: "Base del desayuno: absorbe la leche y se vuelve cremosa al hidratarse en frío.",
        nutritionNote: "Beta-glucanos, fibra soluble, magnesio",
        portionNote: "1/2 taza (45g)",
      },
      {
        id: "leche",
        name: "Leche vegetal",
        emoji: "🥛",
        amount: "1/2 taza (120 ml)",
        description: "Líquido base. Elige sin azúcar añadida para controlar el dulzor total.",
        nutritionNote: "Calcio, vitamina D, proteína vegetal",
        portionNote: "1/2 taza (120ml)",
      },
      {
        id: "cacahuete",
        name: "Crema de cacahuete",
        emoji: "🥜",
        amount: "2 cdas. (30 g)",
        description: "Grasa saludable que sacia y aporta cremosidad al mezclar.",
        nutritionNote: "Grasas monoinsaturadas, proteína, vitamina E",
        portionNote: "2 cucharadas (30g)",
      },
      {
        id: "lino",
        name: "Semillas de lino",
        emoji: "🌱",
        amount: "1 cda. (10 g)",
        description: "Pequeñas pero poderosas: omega-3 vegetal y fibra que espesa la textura.",
        nutritionNote: "Omega-3 (ALA), lignanos, fibra insoluble",
        portionNote: "1 cucharada (10g)",
      },
      {
        id: "canela",
        name: "Canela en polvo",
        emoji: "🌿",
        amount: "1/2 cdita",
        description: "Sabor y beneficio: ayuda a regular el azúcar en sangre después de comer.",
        nutritionNote: "Cinnamaldehído, antioxidantes, antiinflamatorio",
        portionNote: "1/2 cucharadita",
      },
      {
        id: "miel",
        name: "Miel",
        emoji: "🍯",
        amount: "1 cdita",
        description: "Dulzor natural con menor impacto glucémico que el azúcar refinada.",
        nutritionNote: "Fructosa, antioxidantes, propiedades antimicrobianas",
        portionNote: "1 cucharadita",
      },
    ],

    // Pantalla 3/5: el usuario arrastra en este orden — este array ES la respuesta correcta
    prepOrder: [
      "Elegir un frasco de cristal con tapa hermética",
      "Medir 1/2 taza de copos de avena finos",
      "Medir 1/2 taza de leche vegetal fría",
      "Preparar los toppings (plátano, arándanos)",
      "Reservar espacio en la nevera (mínimo 4 h)",
    ],

    // Pantalla 4/5: pasos de cocción (algunos con quiz, algunos sin)
    cookingSteps: [
      {
        instruction: "Añade los copos de avena al frasco",
        question: "¿Por qué se hidrata la avena en frío y no en caliente?",
        options: [
          "Porque calentarla destruye las vitaminas",
          "Para que absorba lentamente y conserve textura cremosa sin hacerse papilla",
          "Porque el frío añade probióticos",
        ],
        correctIndex: 1,
        explanation: "El remojo en frío hidrata los almidones poco a poco: la avena se ablanda pero mantiene cuerpo, sin la textura pastosa de cocinarla.",
        xp: 20,
      },
      {
        instruction: "Vierte la leche vegetal sobre la avena",
        question: "¿Cuánta leche para una textura cremosa (no aguada)?",
        options: [
          "La misma cantidad que avena (relación 1:1)",
          "El doble de leche que avena (relación 2:1)",
          "No importa, se absorbe todo igual",
        ],
        correctIndex: 0,
        explanation: "La relación 1:1 da la textura clásica. Más leche → más líquido; menos → más denso. Ajusta según preferencia después de probar.",
        xp: 20,
      },
      {
        // Sin quiz — solo instrucción
        instruction: "Añade la crema de cacahuete y las semillas de lino",
        xp: 0,
      },
      {
        instruction: "Agrega la miel y la canela",
        question: "¿Por qué la canela ayuda en un desayuno con avena?",
        options: [
          "Aporta proteína extra",
          "Ayuda a regular el índice glucémico de la comida",
          "Activa el metabolismo de grasas",
        ],
        correctIndex: 1,
        explanation: "El cinnamaldehído mejora la sensibilidad a la insulina, lo que amortigua el pico de glucosa del carbohidrato de la avena.",
        xp: 20,
      },
      {
        instruction: "Mezcla bien todos los ingredientes",
        xp: 0,
      },
      {
        instruction: "Cierra el frasco y refrigera mínimo 4 horas",
        question: "¿Qué pasa si refrigeras menos de 2 horas?",
        options: [
          "No pasa nada, la avena absorbe en 30 minutos",
          "La avena queda cruda con textura dura e indigesta",
          "Se fermenta y sabe mal",
        ],
        correctIndex: 1,
        explanation: "La avena necesita tiempo para absorber el líquido y suavizarse. Menos de 2 h = textura crujiente e indigestible. 4–8 h = perfecto.",
        xp: 15,
      },
    ],

    badge: "Madrugador saludable",
    totalXp: 75, // 20 + 20 + 0 + 20 + 0 + 15
  },
];

/**
 * Accede a una lección por id.
 * Encapsula el array: los componentes nunca tocan `lessons` directamente.
 * @param {string} id
 * @returns {Lesson | undefined}
 */
export function getLesson(id) {
  return lessons.find((l) => l.id === id);
}

/** Número de pantallas en el flujo de cualquier lección */
export const TOTAL_SCREENS = 5;
```

### Paso 2 — Verificar el modelo

```jsx
// App.jsx temporal de verificación
import { getLesson } from "./data/lessons";

export default function App() {
  const lesson = getLesson("overnight-oats");
  return (
    <div className="p-4 space-y-1 font-body text-sm">
      <p>✅ Nombre: {lesson.name}</p>
      <p>✅ Ingredientes: {lesson.ingredients.length}</p>
      <p>✅ Pasos de prep: {lesson.prepOrder.length}</p>
      <p>✅ Pasos de cocción: {lesson.cookingSteps.length}</p>
      <p>✅ XP total: {lesson.totalXp}</p>
    </div>
  );
}
```

## 🤔 Decisión de diseño

### ¿Por qué `explanation` en cada `CookingStep` y no solo la pregunta?

El diferencial de NutriCocina no es el quiz — es el aprendizaje que viene después. La explicación nutricional es lo que hace que el usuario entienda **por qué** cocina así. Sin `explanation`, el quiz es solo un examen, no una experiencia educativa.

### ¿Por qué `xp: 0` en pasos sin quiz y no omitir el campo?

Consistencia. Tu código para calcular XP total será:

```js
lesson.cookingSteps.reduce((sum, s) => sum + s.xp, 0)
```

Sin `xp: 0`, necesitas `s.xp ?? 0` en cada lugar. Con el campo siempre presente, el tipo es `number` y el código es simple.

### ¿Por qué `totalXp` está en los datos y no se calcula en el componente?

Para que el usuario vea de antemano "esta lección vale 75 XP" antes de empezarla — en la pantalla 1/5. Si lo calculas en el componente de resultados (pantalla 5/5), no puedes mostrarlo al principio sin importar toda la lección. El dato sirve en dos pantallas distintas; mejor tenerlo explícito.

### ¿Por qué `prepOrder` es un array de strings y no de objetos?

Porque la pantalla 3/5 solo necesita ordenar textos — no hay IDs ni emojis en las cards de prep. Añadir objetos complicaría el modelo sin beneficio real. Si en el futuro quieres imágenes por paso de prep, es el momento de cambiar el tipo.

## 🏋️ Ejercicio

1. Añade una segunda receta: "Lentejas Guisadas" con 5 ingredientes (todos con `nutritionNote`) y 4 `cookingSteps` (al menos 2 con quiz).
2. Escribe `getTotalXp(lesson)` que calcule el XP sumando el array. Compara contra `lesson.totalXp` — ¿coinciden?
3. **Pregunta de diseño**: la pantalla 3/5 verifica si el usuario ordenó bien los pasos. Con el modelo actual, ¿cómo lo harías en una sola línea?
   <details><summary>💡 Respuesta</summary>
   `userOrder.every((step, i) => step === lesson.prepOrder[i])`. Compara posición por posición. La respuesta correcta ya vive en `prepOrder` — no necesitas un campo extra.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 1

Hasta aquí tienes:

- ✅ Proyecto Vite + React + Tailwind v4 con tokens de color reales
- ✅ Estructura de carpetas lista para las 5 pantallas
- ✅ Modelo de datos completo (ingredientes con nutrición, pasos con quiz y explicación)
- ✅ `getLesson(id)` encapsulando el acceso a datos

---

# 🍳 Tanda 2 — Componentes y estado

Ya tienes datos. Ahora vas a **mostrarlos** y **moverte entre las 5 pantallas**.

---

# Lección 3 — Componentes y props

## 🎯 Objetivo

Convertir el JSON de la receta en la pantalla 1/5 real: hero amarillo, highlights y botón "Empezar lección". Al terminar entenderás el patrón **data down, events up** que se repite en las 5 pantallas.

## 💡 Concepto clave: componentes como funciones de transformación

```
datos (props)  →  [ componente ]  →  HTML en pantalla
```

Un componente es una función que recibe props y devuelve JSX. La clave del buen diseño es decidir **qué tan pequeño** hacerlo:

> **Una responsabilidad por componente.** Si tienes que hacer scroll para leer un componente, o si mezcla "mostrar un highlight" con "gestionar la canasta de ingredientes", pártelo.

> **Analogía**: los componentes son piezas de LEGO. Cada pieza hace una sola cosa. Las combinas para construir lo que quieras; no le pegas la ventana al casco del barco.

## 🛠️ Manos a la obra

El plan: construir de adentro hacia afuera — el componente más pequeño primero.

```
WelcomeScreen          ← pantalla 1/5 completa
  └── RecipeHighlight  ← tarjeta de highlight (se repite 3 veces)
```

### Paso 1 — `RecipeHighlight`: el componente más pequeño

```jsx
// src/components/lesson/RecipeHighlight.jsx

/**
 * Tarjeta de un dato destacado de la receta.
 * @param {{ icon: string, title: string, detail: string }} props
 */
export function RecipeHighlight({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      {/* aria-hidden: el emoji es decorativo, no aporta info al lector de pantalla */}
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-semibold text-stone-800">{title}</p>
        <p className="text-sm text-stone-500">{detail}</p>
      </div>
    </div>
  );
}
```

Puntos clave:
- Recibe solo 3 props simples, no la lección entera. Cuanto menos sepa un componente, más fácil es reutilizarlo.
- Sin `useState`: es un componente de **presentación pura** — entra data, sale HTML.
- `aria-hidden="true"` en emojis decorativos: accesibilidad básica sin esfuerzo extra.

### Paso 2 — `WelcomeScreen`: la pantalla 1/5

```jsx
// src/components/lesson/WelcomeScreen.jsx
import { RecipeHighlight } from "./RecipeHighlight";

/**
 * Pantalla de bienvenida (1/5).
 * No sabe qué pasa cuando el usuario hace click — solo llama a onStart().
 * @param {{ lesson: import("../../data/lessons").Lesson, onStart: () => void }} props
 */
export function WelcomeScreen({ lesson, onStart }) {
  return (
    <section className="space-y-5">

      {/* Hero — fondo amber como en el mockup */}
      <div className="rounded-3xl bg-amber p-5">
        <h1 className="font-display text-3xl font-bold leading-tight text-stone-900">
          {lesson.name}
        </h1>
        <p className="mt-1 text-sm text-stone-800">{lesson.description}</p>
        <p className="mt-3 text-sm font-semibold text-forest">
          {lesson.costPerServing} {lesson.costCurrency} / porción · {lesson.servings} porciones
        </p>
      </div>

      {/* Highlights */}
      <ul className="space-y-2">
        {lesson.highlights.map((h) => (
          // key en el elemento raíz del map — obligatorio y estable
          <li key={h.title}>
            <RecipeHighlight icon={h.icon} title={h.title} detail={h.detail} />
          </li>
        ))}
      </ul>

      {/* Botón — reporta el click al padre, no navega por su cuenta */}
      <button
        onClick={onStart}
        className="w-full rounded-2xl bg-forest py-4 font-display font-bold text-white shadow hover:bg-forest-dark active:scale-95 transition-all"
      >
        Empezar lección
      </button>

    </section>
  );
}
```

### Paso 3 — Conectar en `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { WelcomeScreen } from "./components/lesson/WelcomeScreen";

export default function App() {
  const lesson = getLesson("overnight-oats");
  return (
    <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      <WelcomeScreen lesson={lesson} onStart={() => alert("¡Vamos a cocinar!")} />
    </main>
  );
}
```

Deberías ver la pantalla 1/5 completa. Si cambias `"overnight-oats"` por `"lentejas-guisadas"`, `WelcomeScreen` no cambia ni una línea — eso es el valor del desacoplamiento.

## 🤔 Decisión de diseño

### ¿Por qué `lesson` como prop y no importar `getLesson` dentro del componente?

Si `WelcomeScreen` llama a `getLesson` por su cuenta, queda acoplado a esa fuente de datos específica. Si mañana los datos vienen de una API o de un `useState`, tienes que editar el componente. Pasando `lesson` como prop, el componente no sabe de dónde vienen los datos — solo los muestra. Eso es **desacoplar**.

### ¿Por qué `onStart` como callback y no navegar directo?

Patrón **"data down, events up"**: los datos bajan por props, los eventos suben por callbacks. `WelcomeScreen` no decide qué pasa al hacer click — reporta el evento. El padre (`LessonFlow`) decide si avanzar de paso, guardar XP, registrar analíticas, o lo que sea. Así el componente es reutilizable en cualquier contexto.

### ¿Por qué `key={h.title}` y no `key={index}`?

React usa `key` para identificar qué elemento de la lista cambió entre renders. Si usas el índice (`0, 1, 2`) y el orden cambia (por un filtro), React confunde los elementos y aplica el DOM equivocado. El `title` es estable; identifica al elemento independientemente de su posición.

## ⚠️ Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| `Each child in a list should have a unique "key"` | Falta `key` en el `.map()` | Añade `key={algo-único}` en el elemento raíz del map |
| `bg-forest` no aplica el color | El token no está en `@theme` | Verifica que el nombre en CSS es `--color-forest` |
| El componente no se actualiza al cambiar props | Mutación directa del objeto | Las props son de solo lectura; nunca `lesson.name = "..."` |

## 🏋️ Ejercicio

1. Crea `IngredientTile.jsx` — la tile naranja del "Mercado" (pantalla 2/5). Recibe `{ emoji, name }` y muestra un botón cuadrado con `bg-orange` y texto centrado.
2. En `WelcomeScreen`, añade debajo de los highlights una sección "Lo que comprarás" que mapee `lesson.ingredients` y use `IngredientTile`. Solo visual por ahora, la interacción llega en la Tanda 3.
3. ¿Qué `key` usarías en ese `.map()`? ¿Por qué `ingredient.id` y no `ingredient.name`?
   <details><summary>💡 Respuesta</summary>
   `key={ingredient.id}`. El `id` es único por diseño del modelo. El `name` podría repetirse en otras recetas ("Sal", "Agua"). El `id` es confiable para React; el `name` es legible para humanos.
   </details>

---

# Lección 4 — `useState` y máquina de pasos

## 🎯 Objetivo

Pasar de mostrar una sola pantalla a un flujo completo de 5: Bienvenida → Ingredientes → Prep → Cocción → Resultados. Vas a modelar el flujo como **un número**, no como 5 booleanos.

## 💡 Concepto clave: estado es memoria

> El estado (`useState`) es la **memoria del componente entre renders**. Cada vez que llamas al setter, React vuelve a ejecutar tu función con el nuevo valor. No mutas el valor viejo: lo **reemplazas**.

La idea más importante de esta lección:

> Cuando varios "modos" de la UI están relacionados (pantalla 1, 2, 3…), **no uses un booleano por pantalla**. Usa **un solo número** que represente "en qué pantalla estoy". Eso es una mini **máquina de estados** y hace imposible estar en la pantalla 2 y la 4 al mismo tiempo.

## 🛠️ Manos a la obra

### Paso 1 — Antimodelo: 5 booleanos

```jsx
// ❌ NUNCA hagas esto
const [showWelcome,     setShowWelcome]     = useState(true);
const [showIngredients, setShowIngredients] = useState(false);
const [showPrep,        setShowPrep]        = useState(false);
const [showCooking,     setShowCooking]     = useState(false);
const [showResults,     setShowResults]     = useState(false);
```

Problemas reales:
- Puedes tener `showWelcome` y `showResults` ambos `true` → **estado imposible**.
- Cada transición: apagar uno, prender otro. 2 líneas mínimo por transición.
- No puedes derivar "¿en qué paso estoy?" sin un `if` encadenado de 5 ramas.

### Paso 2 — Modelo correcto: un número

```jsx
const [step, setStep] = useState(1); // siempre exactamente uno de: 1, 2, 3, 4 o 5

const next  = () => setStep((s) => Math.min(TOTAL_SCREENS, s + 1));
const prev  = () => setStep((s) => Math.max(1, s - 1));
const reset = () => setStep(1);
```

Una variable, transiciones de una línea, literalmente imposible estar en dos pasos a la vez.

> La forma función `(s) => s + 1` es importante: si el usuario hace doble-tap rápido, ambas llamadas leen el valor más reciente de `s` en lugar del valor "stale" del closure. Evita bugs de sincronización.

### Paso 3 — `LessonFlow`: el orquestador de las 5 pantallas

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

/**
 * Orquesta el flujo de 5 pantallas de una lección.
 * Es el único componente que sabe en qué paso estamos.
 * @param {{ lesson: import("../../data/lessons").Lesson }} props
 */
export function LessonFlow({ lesson }) {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(TOTAL_SCREENS, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>

      {/* Barra de progreso + "X / 5"
          Se DERIVA de `step` — no es un useState separado.
          Regla: si puedes calcularlo, no lo guardes. */}
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

      {/* Una sola pantalla visible a la vez */}
      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}

      {/* Pantallas 2-5: placeholders hasta las tandas 3 y 4 */}
      {step === 2 && <PlaceholderScreen title="🛒 Compra los ingredientes" onNext={next} onPrev={prev} />}
      {step === 3 && <PlaceholderScreen title="📋 Prepara los ingredientes" onNext={next} onPrev={prev} />}
      {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!"    onNext={next} onPrev={prev} />}
      {step === 5 && <PlaceholderScreen title="🎉 ¡Lección completada!"     onNext={null} onPrev={prev} />}

    </div>
  );
}

/**
 * Placeholder temporal — se reemplazará pantalla por pantalla.
 * Vive en este mismo archivo porque es temporal; un archivo propio le daría permanencia falsa.
 */
function PlaceholderScreen({ title, onNext, onPrev }) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border-2 border-dashed border-stone-300 p-8 text-center">
      <p className="font-display text-2xl font-bold text-stone-700">{title}</p>
      <p className="text-sm text-stone-400">Esta pantalla se construye en la próxima tanda.</p>
      <div className="flex gap-3 pt-2">
        {onPrev && (
          <button onClick={onPrev} className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100">
            ← Atrás
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="flex-1 rounded-2xl bg-forest py-3 font-bold text-white hover:bg-forest-dark">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
```

### Paso 4 — Actualizar `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { LessonFlow } from "./components/lesson/LessonFlow";

export default function App() {
  const lesson = getLesson("overnight-oats");
  return (
    <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      <LessonFlow lesson={lesson} />
    </main>
  );
}
```

## 🤔 Decisión de diseño

### ¿Por qué `TOTAL_SCREENS` importada y no `5` hardcodeado?

Si en el futuro añades una pantalla "Tips nutricionales" entre cocción y resultados, cambias el número en `lessons.js` y la barra de progreso y los límites de `next`/`prev` se actualizan solos. Hardcodear `5` en tres lugares garantiza una inconsistencia.

### ¿Por qué la barra de progreso no tiene su propio `useState`?

Dos estados que representan lo mismo = bugs de sincronización garantizados. El cálculo `(step / TOTAL_SCREENS) * 100` es gratuito en cada render.

> **Regla de oro: si puedes calcularlo, no lo guardes.**

### ¿Por qué `PlaceholderScreen` vive en el mismo archivo que `LessonFlow`?

Es temporal. Meterlo en su propio archivo le da permanencia falsa. Si está en el mismo archivo, muere junto al placeholder cuando lo reemplaces con la pantalla real.

## ⚠️ Errores comunes

| Síntoma | Causa | Arreglo |
|---|---|---|
| El estado "no cambia" al hacer click | Mutación directa (`arr.push(x)`) | Reemplaza: `setItems([...items, x])` |
| El paso salta de 2 al hacer click rápido | Dos setters leen el mismo `step` viejo | Forma función: `setStep((s) => s + 1)` |
| `Too many re-renders` | Llamas al setter durante el render | Solo dentro de eventos o `useEffect` |
| Barra no se mueve | Guardaste `progress` como otro `useState` | Derívalo: `(step / TOTAL_SCREENS) * 100` |

## 🏋️ Ejercicio

1. Añade `useState(0)` para `xp`. Cada vez que `next()` avance, suma 10 XP. Muéstralo: `✨ {xp} XP` junto al indicador de paso.
2. Deshabilita "← Atrás" en el paso 1: `disabled={step === 1}` + clase `opacity-40 cursor-not-allowed`.
3. **Pregunta de diseño**: si el usuario recarga la página, `step` y `xp` vuelven a 0. ¿En qué parte de la app viviría el XP para persistir entre sesiones?
   <details><summary>💡 Respuesta</summary>
   Fuera de `LessonFlow` — ese componente se destruye con cada lección. El XP debería vivir en un custom hook (`useProgress`) que guarda y lee de `localStorage`. Exactamente lo que construiremos en la Tanda 3.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 2

Ya sabes:

- ✅ Partir la UI en componentes con **una sola responsabilidad**
- ✅ Pasar datos hacia abajo con **props** y eventos hacia arriba con **callbacks**
- ✅ El patrón **"data down, events up"**
- ✅ Usar `useState` sin mutaciones ni el antimodelo de múltiples booleanos
- ✅ Modelar pantallas como una **mini máquina de estados** (un solo número)
- ✅ **Derivar** valores en lugar de duplicar estado

**Antes de la Tanda 3**, verifica que:

1. La pantalla 1/5 (`WelcomeScreen`) se ve con los datos reales de Overnight Oats.
2. El botón "Empezar lección" avanza al paso 2 y la barra sube.
3. Los botones "← Atrás" y "Siguiente →" navegan correctamente entre placeholders.
4. El indicador muestra `2 / 5`, `3 / 5`, etc. al avanzar.

Cuando estés listo, escribe **"sigue"** y arranco la **Tanda 3**: custom hook `useProgress` con `useEffect` + `localStorage` (L5) y lifting state up para conectar el XP al flujo real (L6).

> ❓ Si algo de props, callbacks o `useState` no aterrizó, pregúntalo ahora.

---

# 🔥 Tanda 3 — Persistencia y state lifting

Hasta ahora el XP se resetea cada vez que recargas la página. En esta tanda vas a guardarlo en `localStorage` con un custom hook, y vas a entender por qué el estado "sube" al componente padre.

---

# Lección 5 — Custom hook `useProgress` (useEffect + localStorage)

## 🎯 Objetivo

Crear un hook reutilizable que guarde el XP del usuario en `localStorage`. Al recargar la página, el XP persiste. Al terminar entenderás `useEffect` (el hook de "efectos secundarios") y cómo separar lógica reutilizable del componente visual.

## 💡 Concepto clave: hooks personalizados y efectos secundarios

**Un custom hook** es una función que empieza con `use` y puede llamar a otros hooks (`useState`, `useEffect`, etc.). Te permite **extraer lógica con estado** y reutilizarla en varios componentes.

**`useEffect`** es el hook para "efectos secundarios" — acciones que pasan **fuera** de React:
- Leer/escribir `localStorage`
- Hacer `fetch` a una API
- Suscribirse a eventos del navegador
- Cambiar el `document.title`

> **Analogía**: `useState` es la memoria del componente. `useEffect` es el asistente que sincroniza esa memoria con el mundo exterior (localStorage, APIs, DOM). Sin `useEffect`, tu estado vive solo dentro de React; con él, puede salir al navegador.

La regla de oro:

> **"Render primero, efecto después."** React renderiza el JSX, lo pinta en pantalla, y **después** ejecuta los `useEffect`. Nunca al revés.

## 🛠️ Manos a la obra

### Paso 1 — Crear `src/hooks/useProgress.js`

```js
import { useState, useEffect } from "react";

// Clave en localStorage — prefijada con el nombre de la app para evitar colisiones
const STORAGE_KEY = "nutricocina-progress";

/**
 * Hook personalizado para gestionar el progreso del usuario (XP, badges, lecciones completadas).
 * Persiste en localStorage automáticamente.
 * @returns {{ xp: number, addXp: (points: number) => void }}
 */
export function useProgress() {
  // Inicialización "lazy" — la función solo corre en el primer render
  const [xp, setXp] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.xp || 0;
      }
    } catch (error) {
      // Si localStorage falla (modo privado, corrupto), arranca en 0
      console.warn("No se pudo leer localStorage:", error);
    }
    return 0;
  });

  // useEffect: cada vez que `xp` cambia, guarda en localStorage
  useEffect(() => {
    try {
      const data = { xp }; // Por ahora solo XP; en el futuro: badges, completedLessons
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("No se pudo guardar en localStorage:", error);
    }
  }, [xp]); // 👈 Array de dependencias: solo vuelve a correr si `xp` cambia

  // Función para sumar XP — encapsula el setter
  const addXp = (points) => {
    setXp((current) => current + points);
  };

  return { xp, addXp };
}
```

### Paso 2 — ¿Cómo funciona `useEffect`?

```js
useEffect(() => {
  // Código que corre DESPUÉS del render
  console.log("El efecto corrió");
}, [dependencia1, dependencia2]);
```

**Cuándo corre el efecto:**
1. Siempre en el **primer render** (mount).
2. En renders posteriores, **solo si alguna dependencia cambió**.

**Tres patrones comunes:**

| Dependencias | Comportamiento |
|---|---|
| `[]` (array vacío) | Corre solo una vez al montar el componente |
| `[xp, step]` | Corre cada vez que `xp` o `step` cambian |
| Sin array | Corre **en cada render** (casi nunca lo quieres) |

En nuestro hook usamos `[xp]` porque queremos guardar en localStorage **solo cuando el XP cambia**, no en cada render.

### Paso 3 — Probar el hook en `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { LessonFlow } from "./components/lesson/LessonFlow";
import { useProgress } from "./hooks/useProgress"; // 👈 nuevo

export default function App() {
  const lesson = getLesson("overnight-oats");
  const { xp, addXp } = useProgress(); // 👈 el hook vive aquí, en el padre

  return (
    <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      {/* Muestra el XP total del usuario arriba de todo */}
      <div className="mb-4 text-center">
        <p className="font-display text-sm font-bold text-forest">
          ✨ {xp} XP total
        </p>
      </div>

      {/* Pasa addXp hacia abajo — LessonFlow ya no maneja su propio XP */}
      <LessonFlow lesson={lesson} onEarnXp={addXp} />
    </main>
  );
}
```

### Paso 4 — Actualizar `LessonFlow` para recibir `onEarnXp`

Ahora `LessonFlow` **no maneja XP directamente** — solo reporta hacia arriba "gané X puntos" y el padre decide qué hacer.

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

/**
 * @param {{ 
 *   lesson: import("../../data/lessons").Lesson,
 *   onEarnXp: (points: number) => void  // 👈 callback para reportar XP ganado
 * }} props
 */
export function LessonFlow({ lesson, onEarnXp }) {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep((s) => Math.min(TOTAL_SCREENS, s + 1));
    onEarnXp(10); // 👈 reporta 10 XP por avanzar (temporal — en L6 será el XP real del quiz)
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>
      {/* Barra de progreso */}
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

      {/* Pantallas */}
      {step === 1 && <WelcomeScreen lesson={lesson} onStart={next} />}
      {step === 2 && <PlaceholderScreen title="🛒 Compra los ingredientes" onNext={next} onPrev={step > 1 ? prev : null} />}
      {step === 3 && <PlaceholderScreen title="📋 Prepara los ingredientes" onNext={next} onPrev={prev} />}
      {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!"    onNext={next} onPrev={prev} />}
      {step === 5 && <PlaceholderScreen title="🎉 ¡Lección completada!"     onNext={null} onPrev={prev} />}
    </div>
  );
}

function PlaceholderScreen({ title, onNext, onPrev }) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border-2 border-dashed border-stone-300 p-8 text-center">
      <p className="font-display text-2xl font-bold text-stone-700">{title}</p>
      <p className="text-sm text-stone-400">Esta pantalla se construye en la próxima tanda.</p>
      <div className="flex gap-3 pt-2">
        {onPrev && (
          <button onClick={onPrev} className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100">
            ← Atrás
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="flex-1 rounded-2xl bg-forest py-3 font-bold text-white hover:bg-forest-dark">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
```

### Paso 5 — Probarlo

1. Abre la app, avanza de paso. El XP sube.
2. Recarga la página con `Cmd+R` / `Ctrl+R`.
3. El XP **persiste** — no vuelve a 0. 🎉

Abre DevTools → Application → Local Storage → `http://localhost:5173`. Deberías ver:

```
nutricocina-progress: {"xp":40}
```

## 🤔 Decisión de diseño

### ¿Por qué `useState(() => ...)` con función en lugar de un valor directo?

```js
// ❌ Esto lee localStorage en CADA render
const [xp, setXp] = useState(JSON.parse(localStorage.getItem(STORAGE_KEY))?.xp || 0);

// ✅ Esto lo lee solo UNA VEZ (primer render)
const [xp, setXp] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved).xp : 0;
});
```

La forma función se llama **"lazy initialization"**. La función solo corre en el primer render, no en cada re-render. Leer `localStorage` es lento comparado con memoria — no quieres hacerlo 60 veces por segundo.

### ¿Por qué `useEffect` con dependencia `[xp]` y no `[]`?

Con `[]` el efecto solo correría **una vez al montar**, guardando el XP inicial (0). Nunca se volvería a guardar. Con `[xp]`, cada vez que el XP cambia, el efecto corre y sincroniza con `localStorage`.

### ¿Por qué `try/catch` en ambos lugares?

Porque `localStorage` puede fallar:
- **Modo incógnito** de Safari: `localStorage` existe pero lanza error al escribir.
- **Cuota excedida**: si guardas 10 MB, el navegador dice "no más".
- **Datos corruptos**: alguien editó el JSON a mano y rompió la sintaxis.

Sin `try/catch`, un error en `localStorage` crashea la app. Con `try/catch`, la app sigue funcionando (sin persistir datos, pero funciona).

### ¿Por qué el hook retorna un objeto `{ xp, addXp }` y no un array `[xp, addXp]`?

Convención de custom hooks:
- Si retornas **2 valores relacionados** (como `useState`), usa array: `const [value, setValue] = useState()`.
- Si retornas **múltiples valores no simétricamente relacionados** (datos + funciones + flags), usa objeto: `const { xp, addXp, isLoading } = useProgress()`.

El objeto permite desestructuración con nombres claros. Si retornaras array, el llamador tendría que recordar el orden.

## ⚠️ Errores comunes con `useEffect`

| Síntoma | Causa | Arreglo |
|---|---|---|
| El efecto corre infinitamente | Actualizas una dependencia dentro del efecto | No modifiques las dependencias dentro del efecto |
| `localStorage` se guarda mal | Guardas el objeto directo sin `JSON.stringify` | Siempre `JSON.stringify` antes de guardar |
| El efecto no corre al cambiar el estado | Olvidaste poner la variable en el array de dependencias | Añade `[xp]` |
| El efecto corre en cada render | No pusiste array de dependencias | Añade `[]` o `[deps]` |

## 🏋️ Ejercicio

1. Añade un botón "Resetear progreso" en `App.jsx` que llame a una nueva función `resetProgress` del hook. La función debe hacer `setXp(0)` — el `useEffect` sincronizará con `localStorage` automáticamente.
2. Modifica `useProgress` para guardar también un array de `completedLessons: []`. Expón una función `markLessonComplete(lessonId)` que añada el ID al array. Verifica en DevTools que se guarda.
3. **Pregunta de diseño**: si el usuario abre la app en dos pestañas a la vez y gana XP en ambas, ¿qué pasa? ¿Se sincronizan? ¿Se pierden datos?
   <details><summary>💡 Respuesta</summary>
   **No se sincronizan automáticamente.** Cada pestaña tiene su propia instancia del hook. Si ganas 10 XP en pestaña A y 20 XP en pestaña B, la última en guardar (digamos B) sobrescribe todo con su valor (`xp: 20`), perdiendo los 10 de A. Para sincronizar entre pestañas necesitas escuchar el evento `storage` del navegador — tema avanzado que veremos en la Lección 9.
   </details>

---

# Lección 6 — Lifting state up (subir el estado al padre)

## 🎯 Objetivo

Conectar el XP real de los quizzes en lugar de sumar +10 por cada paso. Vas a aprender **por qué** el estado a veces debe "subir" al componente padre y cómo pasar callbacks para que los hijos reporten eventos hacia arriba.

## 💡 Concepto clave: el estado vive donde se necesita compartir

Cuando **dos o más componentes necesitan el mismo estado**, ese estado debe vivir en el **ancestro común más cercano** y bajarse por props.

```
App  ← el XP vive aquí (useProgress)
 └─ LessonFlow  ← recibe onEarnXp por prop
     └─ CookingScreen  ← reporta XP ganado llamando a onEarnXp(20)
```

Si `CookingScreen` guardara su propio XP con `useState`, ese XP moriría al cambiar de pantalla. Si `LessonFlow` lo guarda, muere al cambiar de lección. Si `App` lo guarda, **persiste en toda la app** y puede mostrarse en un navbar global, en el perfil, etc.

> **Analogía**: el estado es como el dinero. Si cada hijo guarda su propio dinero en su bolsillo, no pueden compartirlo. Si el padre lo guarda en una cuenta bancaria familiar, todos pueden depositar (callbacks) y el saldo se actualiza para todos.

Esta es la aplicación del patrón **"data down, events up"** a una escala mayor:
- **Datos bajan**: `App` le pasa `xp` y `onEarnXp` a `LessonFlow`.
- **Eventos suben**: `LessonFlow` (y sus hijos) llaman a `onEarnXp(points)` cuando algo pasa.

## 🛠️ Manos a la obra

### Paso 1 — Estado actual del XP en la app

Ahora mismo:
- `App.jsx` usa `useProgress()` y tiene el XP total.
- `LessonFlow` reporta +10 XP por cada paso (hardcodeado en `next()`).

**Problema**: el XP debería venir del `cookingStep.xp` real, no de un número inventado. Pero `LessonFlow` solo conoce el `step` actual (1-5), no sabe qué `cookingStep` específico se completó.

**Solución**: cuando construyamos `CookingScreen` (pantalla 4/5) en la Tanda 4, esa pantalla sabrá exactamente qué quiz se respondió y cuánto XP otorga. Pero por ahora podemos simular el flujo correcto.

### Paso 2 — Simular XP variable por paso

Vamos a hacer que cada paso otorgue XP distinto, para ver el flujo de datos en acción.

```jsx
// src/components/lesson/LessonFlow.jsx
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { TOTAL_SCREENS } from "../../data/lessons";

// XP por pantalla (simulado — en la Tanda 4 vendrá de lesson.cookingSteps[i].xp)
const XP_PER_SCREEN = {
  1: 0,   // Bienvenida: sin XP
  2: 15,  // Ingredientes: 15 XP por completar la compra
  3: 10,  // Prep: 10 XP por ordenar correctamente
  4: 40,  // Cocina: 40 XP de los quizzes (suma de todos los pasos)
  5: 10,  // Resultados: 10 XP bonus por completar
};

export function LessonFlow({ lesson, onEarnXp }) {
  const [step, setStep] = useState(1);

  const next = () => {
    const nextStep = Math.min(TOTAL_SCREENS, step + 1);
    setStep(nextStep);

    // Otorga el XP correspondiente a la pantalla a la que acabamos de avanzar
    const xpEarned = XP_PER_SCREEN[nextStep] || 0;
    if (xpEarned > 0) {
      onEarnXp(xpEarned);
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
      {step === 2 && <PlaceholderScreen title="🛒 Compra los ingredientes" onNext={next} onPrev={step > 1 ? prev : null} />}
      {step === 3 && <PlaceholderScreen title="📋 Prepara los ingredientes" onNext={next} onPrev={prev} />}
      {step === 4 && <PlaceholderScreen title="🍳 ¡Hagamos el platillo!"    onNext={next} onPrev={prev} />}
      {step === 5 && <PlaceholderScreen title="🎉 ¡Lección completada!"     onNext={null} onPrev={prev} />}
    </div>
  );
}

function PlaceholderScreen({ title, onNext, onPrev }) {
  return (
    <div className="mt-6 space-y-4 rounded-3xl border-2 border-dashed border-stone-300 p-8 text-center">
      <p className="font-display text-2xl font-bold text-stone-700">{title}</p>
      <p className="text-sm text-stone-400">Esta pantalla se construye en la próxima tanda.</p>
      <div className="flex gap-3 pt-2">
        {onPrev && (
          <button onClick={onPrev} className="flex-1 rounded-2xl border border-stone-300 py-3 text-stone-600 hover:bg-stone-100">
            ← Atrás
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="flex-1 rounded-2xl bg-forest py-3 font-bold text-white hover:bg-forest-dark">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
```

### Paso 3 — Mejorar la UI de `App.jsx` para mostrar el XP

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { LessonFlow } from "./components/lesson/LessonFlow";
import { useProgress } from "./hooks/useProgress";

export default function App() {
  const lesson = getLesson("overnight-oats");
  const { xp, addXp } = useProgress();

  return (
    <main className="mx-auto min-h-screen max-w-md bg-cream px-5 py-6">
      
      {/* Header con XP total del usuario */}
      <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Tu progreso</p>
            <p className="font-display text-2xl font-bold text-forest">
              ✨ {xp} XP
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400">Nivel</p>
            <p className="font-display text-2xl font-bold text-amber">
              {Math.floor(xp / 100) + 1}
            </p>
          </div>
        </div>
        {/* Barra de nivel: cada 100 XP es un nivel */}
        <div className="mt-2 h-2 rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-amber transition-all duration-500"
            style={{ width: `${(xp % 100)}%` }}
          />
        </div>
      </header>

      <LessonFlow lesson={lesson} onEarnXp={addXp} />
    </main>
  );
}
```

### Paso 4 — Probarlo

1. Recarga la app. Deberías ver el header con "0 XP · Nivel 1".
2. Avanza a la pantalla 2: ganas 15 XP (la barra de nivel sube 15%).
3. Avanza a la 3: +10 XP (total 25 XP).
4. Avanza a la 4: +40 XP (total 65 XP).
5. Avanza a la 5: +10 XP (total 75 XP).
6. Recarga la página: el XP persiste. 🎉

## 🤔 Decisión de diseño

### ¿Por qué `onEarnXp` se llama dentro de `next()` y no al final de cada pantalla?

Porque el XP se gana **por completar** la pantalla, no por verla. El momento en que haces click en "Siguiente" es cuando demuestras que completaste la pantalla actual. Si llamaras `onEarnXp` al montar la pantalla, ganarías XP solo por llegar, sin hacer nada.

En la pantalla 4/5 real (quizzes), el XP se ganará **al responder correctamente**, no al avanzar. Pero en las pantallas sin quiz (compra, prep), "avanzar" es el indicador de completitud.

### ¿Por qué `XP_PER_SCREEN` es un objeto y no un array?

```js
// ❌ Array: dependes del índice
const XP_PER_SCREEN = [0, 15, 10, 40, 10];
const xp = XP_PER_SCREEN[step - 1]; // -1 porque step empieza en 1

// ✅ Objeto: el step es la clave directa
const XP_PER_SCREEN = { 1: 0, 2: 15, 3: 10, 4: 40, 5: 10 };
const xp = XP_PER_SCREEN[step];
```

El objeto es más legible: ves `4: 40` y sabes "la pantalla 4 otorga 40 XP". Con array necesitas contar posiciones. Y si algún día empiezas los pasos en 0 en lugar de 1, el objeto no se rompe.

### ¿Por qué el nivel se calcula como `Math.floor(xp / 100) + 1`?

- 0-99 XP → Nivel 1
- 100-199 XP → Nivel 2
- 200-299 XP → Nivel 3

La fórmula: `Math.floor(xp / 100)` da 0, 1, 2… sumamos +1 para que empiece en Nivel 1. Es una progresión lineal simple. Si quisieras progresión exponencial (cada nivel necesita más XP que el anterior), la fórmula sería distinta, pero la lógica de derivarlo del XP total es la misma.

### ¿Por qué el estado del XP vive en `App` y no en `LessonFlow`?

Porque el XP es **global del usuario**, no local de una lección. Cuando termines la lección de Overnight Oats y empieces Lentejas Guisadas, el XP debe seguir ahí. Si viviera en `LessonFlow`, al destruir ese componente para montar uno nuevo (otra lección), el XP se perdería.

Además, en la Tanda 4 añadirás un navbar con el XP visible en todas las rutas. El navbar es hermano de `LessonFlow`, no su hijo. El XP debe vivir en el ancestro común: `App`.

## 🏋️ Ejercicio

1. Modifica `XP_PER_SCREEN` para que la pantalla 4 otorgue XP variable basado en `lesson.totalXp` (usa `lesson.totalXp` en lugar de 40 hardcodeado). Pasa `lesson` como prop a `LessonFlow` — ya lo tienes.
2. Añade un botón "Reiniciar lección" en la pantalla 5 que haga `setStep(1)` sin otorgar XP. ¿Puedes avanzar de nuevo y ganar XP otra vez? ¿Debería ser así?
3. **Pregunta de diseño**: si quisieras que cada lección solo se pueda completar una vez (no ganar XP infinito repitiéndola), ¿dónde guardarías el array de `completedLessons`? ¿En `LessonFlow` o en `useProgress`?
   <details><summary>💡 Respuesta</summary>
   En `useProgress`. Si guardas `completedLessons` en `LessonFlow`, cada lección tendría su propio array (sin sentido). El hook debe exponer `markLessonComplete(lessonId)` y al intentar completar una lección ya completada, `addXp` no hace nada. El chequeo: `if (!completedLessons.includes(lessonId)) { markComplete(lessonId); addXp(points); }`.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 3

Ya sabes:

- ✅ Crear custom hooks con `useState` + `useEffect`
- ✅ Persistir datos en `localStorage` automáticamente
- ✅ Lazy initialization para optimizar lecturas pesadas
- ✅ El ciclo de vida de `useEffect` y sus dependencias
- ✅ Lifting state up: cuándo el estado debe vivir en el padre
- ✅ El patrón "data down, events up" a escala de app

**Logros desbloqueados:**

- El XP persiste entre sesiones.
- Puedes ver tu nivel y progreso global.
- El estado vive donde debe vivir (no duplicado).

**Antes de la Tanda 4**, verifica que:

1. El XP se guarda en `localStorage` y persiste al recargar.
2. El header muestra el XP total y el nivel calculado.
3. Cada pantalla otorga XP distinto (15, 10, 40, 10).
4. Puedes resetear el progreso y volver a empezar.

Cuando estés listo, escribe **"sigue"** y arranco la **Tanda 4**: Tailwind v4 con `@theme` para el sistema de diseño completo (L7) y React Router DOM v6 para navegación entre Home, Lecciones, Perfil (L8).

> ❓ Si `useEffect` o el flujo de datos padre→hijo no quedó claro, pregunta ahora.

---

# 🎨 Tanda 4 — Sistema de diseño y navegación

Hasta ahora todo vive en una sola "página". En esta tanda vas a construir el shell de la app (sidebar + bottom nav) y agregar rutas para Home, Lecciones y Perfil.

---

# Lección 7 — Tailwind v4 con `@theme` (sistema de diseño completo)

## 🎯 Objetivo

Expandir el sistema de tokens de Tailwind v4 con espaciados, radios, sombras y construir el `AppShell` — el componente que envuelve toda la app con sidebar en desktop y bottom nav en móvil. Al terminar entenderás cómo los design tokens hacen que cambiar el look completo de la app tome 5 minutos.

## 💡 Concepto clave: design tokens como fuente de verdad visual

Los **design tokens** son variables de diseño (colores, espaciados, tipografía, sombras) definidas en un solo lugar y usadas en toda la app. Cambias un token, se propaga a 50 componentes. Sin tokens, harías find-replace de `#1B5C3E` en 50 archivos.

En Tailwind v4, los tokens viven en el bloque `@theme` de tu CSS, no en un archivo JS de configuración. Ventajas:

1. **Variables CSS nativas** — funcionan con cualquier librería, no solo Tailwind.
2. **Hot reload instantáneo** — cambias un color, el navegador actualiza sin recompilar.
3. **Typed automáticamente** — el plugin de Vite genera las clases (`bg-forest`, `text-amber`) al vuelo.

> **Analogía**: los tokens son como las constantes en programación. `const PRIMARY_COLOR = "#1B5C3E"` una vez, usas `PRIMARY_COLOR` mil veces. Si hardcodeas `#1B5C3E` mil veces, el día que cambias de color pasas 3 horas con find-replace rogando no romper nada.

## 🛠️ Manos a la obra

### Paso 1 — Expandir `@theme` en `src/index.css`

Ya tienes colores y fuentes. Ahora añade espaciados, radios, sombras, breakpoints custom:

```css
@import "tailwindcss";

@theme {
  /* ===== COLORES ===== */
  --color-cream:        #F5E3C8;
  --color-forest:       #1B5C3E;
  --color-forest-dark:  #144A31;
  --color-forest-light: #2A7A54; /* para hover de links */
  --color-amber:        #F5A623;
  --color-amber-dark:   #E09410;
  --color-orange:       #E8843A;
  --color-orange-dark:  #D4601A;
  
  /* ===== TIPOGRAFÍA ===== */
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body:    "Inter", sans-serif;
  
  /* ===== ESPACIADO ===== */
  /* Tailwind usa una escala de 4px (1 = 0.25rem = 4px).
     Sobrescribimos algunos valores para el look de la app. */
  --spacing-18: 4.5rem;  /* 72px — altura del sidebar */
  --spacing-20: 5rem;    /* 80px — altura del bottom nav móvil */
  
  /* ===== BORDER RADIUS ===== */
  /* Usamos radios grandes para el look "friendly" de la app */
  --radius-xl:  1rem;    /* 16px — cards pequeñas */
  --radius-2xl: 1.5rem;  /* 24px — cards medianas */
  --radius-3xl: 2rem;    /* 32px — hero cards */
  
  /* ===== SOMBRAS ===== */
  /* Sombras sutiles para dar profundidad sin ser intrusivas */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-nav:  0 -2px 8px rgba(0, 0, 0, 0.06);
  
  /* ===== BREAKPOINTS ===== */
  /* Tailwind ya tiene sm:640 md:768 lg:1024 xl:1280.
     Añadimos uno custom para el switch sidebar ↔ bottom nav */
  --breakpoint-nav: 768px; /* a partir de aquí, sidebar; antes, bottom nav */
}

/* ===== ESTILOS GLOBALES ===== */
body {
  font-family: var(--font-body);
  background-color: var(--color-cream);
  color: #292524; /* stone-800 */
}

/* Smooth scroll para anclas */
html {
  scroll-behavior: smooth;
}

/* Ocultar scrollbar en listas horizontales (ingredientes, etc.) pero mantener scroll */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE y Edge */
  scrollbar-width: none;     /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
```

### Paso 2 — Crear `src/components/layout/AppShell.jsx`

Este componente envuelve toda la app. Muestra sidebar en desktop, bottom nav en móvil.

```jsx
// src/components/layout/AppShell.jsx
import { NavLink } from "react-router-dom"; // usaremos esto en la L8

/**
 * Shell de la app: sidebar (desktop) o bottom nav (móvil).
 * Los hijos se renderizan en el área de contenido.
 */
export function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      
      {/* SIDEBAR — visible solo en md: (≥768px) */}
      <aside className="fixed left-0 top-0 hidden h-screen w-18 flex-col items-center bg-forest py-6 md:flex">
        <nav className="flex flex-col gap-6">
          <NavItem href="/" icon="🏠" label="Inicio" />
          <NavItem href="/recipes" icon="📖" label="Recetas" />
          <NavItem href="/profile" icon="👤" label="Perfil" />
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      {/* En desktop: margen izquierdo de 72px (ancho del sidebar).
          En móvil: sin margen, pero padding-bottom de 80px (altura del bottom nav) */}
      <main className="pb-20 md:ml-18 md:pb-0">
        {children}
      </main>

      {/* BOTTOM NAV — visible solo en móvil (< md:) */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-stone-200 bg-white py-3 shadow-nav md:hidden">
        <NavItem href="/" icon="🏠" label="Inicio" isMobile />
        <NavItem href="/recipes" icon="📖" label="Recetas" isMobile />
        <NavItem href="/profile" icon="👤" label="Perfil" isMobile />
      </nav>

    </div>
  );
}

/**
 * Item de navegación. Funciona tanto en sidebar como en bottom nav.
 */
function NavItem({ href, icon, label, isMobile = false }) {
  // Por ahora usamos <a> simple; en L8 lo cambiaremos a NavLink de react-router
  const isActive = window.location.pathname === href; // temporal — react-router lo hará mejor

  if (isMobile) {
    return (
      <a
        href={href}
        className={`flex flex-col items-center gap-1 transition-colors ${
          isActive ? "text-forest" : "text-stone-400"
        }`}
      >
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </a>
    );
  }

  // Sidebar (desktop)
  return (
    <a
      href={href}
      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
        isActive
          ? "bg-forest-light text-white"
          : "text-white/60 hover:bg-forest-dark hover:text-white"
      }`}
      title={label}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
    </a>
  );
}
```

### Paso 3 — Usar `AppShell` en `App.jsx`

```jsx
// src/App.jsx
import { getLesson } from "./data/lessons";
import { LessonFlow } from "./components/lesson/LessonFlow";
import { useProgress } from "./hooks/useProgress";
import { AppShell } from "./components/layout/AppShell"; // 👈 nuevo

export default function App() {
  const lesson = getLesson("overnight-oats");
  const { xp, addXp } = useProgress();

  return (
    <AppShell>
      {/* Todo el contenido va envuelto en AppShell */}
      <div className="mx-auto max-w-md px-5 py-6">
        
        {/* Header con XP */}
        <header className="mb-6 rounded-2xl bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Tu progreso</p>
              <p className="font-display text-2xl font-bold text-forest">
                ✨ {xp} XP
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400">Nivel</p>
              <p className="font-display text-2xl font-bold text-amber">
                {Math.floor(xp / 100) + 1}
              </p>
            </div>
          </div>
          <div className="mt-2 h-2 rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-amber transition-all duration-500"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
        </header>

        <LessonFlow lesson={lesson} onEarnXp={addXp} />
      </div>
    </AppShell>
  );
}
```

### Paso 4 — Probarlo

1. En **desktop** (pantalla ≥ 768px): deberías ver el sidebar verde a la izquierda con 3 íconos.
2. En **móvil** (< 768px): el sidebar desaparece, aparece el bottom nav blanco pegado abajo.
3. Redimensiona la ventana del navegador — el cambio entre sidebar y bottom nav es instantáneo.

Abre DevTools → Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M) para probar en tamaño móvil sin redimensionar la ventana.

## 🤔 Decisión de diseño

### ¿Por qué `md:ml-18` en el `<main>` y no un padding?

```css
/* ❌ Padding: el contenido se "encoge" */
main { padding-left: 72px; }

/* ✅ Margin: el contenido se "desplaza", mantiene su ancho */
main { margin-left: 72px; }
```

Con padding, el contenido interior tiene menos espacio. Con margin, el contenido mantiene su ancho natural y solo se desplaza. Para un sidebar fijo, margin es la convención.

### ¿Por qué `w-18` (72px) de ancho en el sidebar?

Es el mínimo para que un ícono de 24px + padding de 12px a cada lado entre cómodamente:

```
| 12px | 🏠 (24px) | 12px | → total 48px
```

Pero 48px se siente apretado. 72px da aire y es divisible por 4 (escala de Tailwind). Si quieres sidebar con texto ("Inicio" completo), necesitas `w-64` (256px).

### ¿Por qué `hidden md:flex` en el sidebar y no `display: none` directo?

Tailwind usa **mobile-first**: las clases sin prefijo aplican a todos los tamaños, los prefijos (`md:`) sobrescriben a partir de ese breakpoint.

```jsx
// hidden → display: none en móvil
// md:flex → display: flex a partir de 768px
className="hidden md:flex"
```

Es más legible que escribir media queries a mano en CSS.

### ¿Por qué `pb-20` (padding-bottom) en el `<main>` móvil?

El bottom nav tiene altura fija de ~64px. Si no agregas padding al contenido, el último elemento queda tapado por el nav. El padding de 80px (`pb-20`) asegura que siempre haya espacio scrolleable abajo.

### ¿Por qué `shadow-nav` en el bottom nav y no `shadow-card`?

El bottom nav va **pegado al borde** de la pantalla. Las sombras hacia arriba (`0 -2px 8px`) dan sensación de "flotando sobre el contenido". Las sombras hacia abajo (`0 1px 3px`) son para cards que flotan sobre el fondo. Contexto distinto, sombra distinta.

## ⚠️ Errores comunes con responsive

| Síntoma | Causa | Arreglo |
|---|---|---|
| El sidebar aparece en móvil | Olvidaste `hidden` | Añade `hidden md:flex` |
| El bottom nav aparece en desktop | Olvidaste `md:hidden` | Añade `md:hidden` al bottom nav |
| El contenido queda tapado abajo en móvil | Falta padding-bottom | Añade `pb-20` al `<main>` |
| El sidebar no tiene el ancho correcto | Usaste `w-18` sin el plugin de Tailwind | Verifica que `@tailwindcss/vite` esté en `vite.config.js` |

## 🏋️ Ejercicio

1. Cambia `--color-forest` a `#2563EB` (azul) en `index.css`. Verifica que el sidebar, los botones y los textos cambian de color automáticamente. Vuelve a verde.
2. Añade un cuarto ítem de navegación: `href="/challenges"`, `icon="🎯"`, `label="Retos"`. Debe aparecer tanto en sidebar como en bottom nav.
3. **Pregunta de diseño**: si quisieras que el sidebar tenga ancho variable (colapsado: 72px, expandido: 256px) al hacer hover, ¿dónde viviría el estado `isExpanded`? ¿En `AppShell`, en `NavItem`, o en ningún lado (solo CSS)?
   <details><summary>💡 Respuesta</summary>
   **Solo CSS** para el hover (transición instantánea sin estado). Si quieres un botón de toggle que mantenga el sidebar expandido, entonces sí necesitas `useState` en `AppShell`. El patrón: `const [isExpanded, setIsExpanded] = useState(false)` + clases condicionales `${isExpanded ? 'w-64' : 'w-18'}`. Pero para hover simple, `group-hover:w-64` + `transition-all` es suficiente.
   </details>

---

# Lección 8 — React Router DOM v6 (navegación entre páginas)

## 🎯 Objetivo

Configurar React Router DOM v6 para tener 3 rutas funcionando: `/` (Home), `/recipes` (Recetas), `/profile` (Perfil). Al terminar entenderás rutas anidadas, `<Outlet />`, `NavLink` con clase activa automática, y navegación programática con `useNavigate`.

## 💡 Concepto clave: SPA routing (Single Page Application)

En una app tradicional multi-página, cada link hace un request al servidor que devuelve HTML nuevo. La página se recarga completa (flash blanco, estado perdido).

En una **SPA**, el navegador **nunca recarga**. El router intercepta los clicks en links, cambia la URL del navegador, y muestra/oculta componentes según la ruta — todo sin tocar el servidor.

React Router es la librería estándar para esto. La v6 es radicalmente más simple que la v5: menos APIs, mejor tree-shaking, rutas como datos.

> **Analogía**: El router es como un switchboard telefónico antiguo. Ves la URL `/recipes`, el router conecta el cable a `<RecipesPage />`. Cambias a `/profile`, desconecta `RecipesPage` y conecta `<ProfilePage />`. Todo pasa en la central (tu navegador), sin llamar afuera (servidor).

## 🛠️ Manos a la obra

### Paso 1 — Instalar React Router DOM

```bash
npm install react-router-dom
```

### Paso 2 — Crear las páginas vacías

```jsx
// src/pages/Home.jsx
export function Home() {
  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <h1 className="font-display text-3xl font-bold text-forest">
        🏠 Inicio
      </h1>
      <p className="mt-2 text-stone-600">
        Aquí irá el dashboard con lecciones disponibles, progreso semanal, etc.
      </p>
    </div>
  );
}
```

```jsx
// src/pages/Recipes.jsx
export function Recipes() {
  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <h1 className="font-display text-3xl font-bold text-forest">
        📖 Recetario
      </h1>
      <p className="mt-2 text-stone-600">
        Aquí se mostrarán todas las lecciones completadas con sus recetas desbloqueadas.
      </p>
    </div>
  );
}
```

```jsx
// src/pages/Profile.jsx
import { useProgress } from "../hooks/useProgress";

export function Profile() {
  const { xp } = useProgress();
  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <h1 className="font-display text-3xl font-bold text-forest">
        👤 Perfil
      </h1>
      
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm text-stone-400">Nivel</p>
          <p className="font-display text-5xl font-bold text-amber">{level}</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm text-stone-400">Experiencia total</p>
          <p className="font-display text-5xl font-bold text-forest">{xp} XP</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm text-stone-400">Lecciones completadas</p>
          <p className="font-display text-5xl font-bold text-stone-800">0</p>
          <p className="mt-1 text-xs text-stone-400">
            Completa tu primera lección para desbloquear badges
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Paso 3 — Configurar el router en `App.jsx`

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Home } from "./pages/Home";
import { Recipes } from "./pages/Recipes";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
```

### Paso 4 — Actualizar `AppShell` para usar `NavLink`

`NavLink` es como `<a>` pero añade automáticamente la clase `active` cuando la ruta coincide.

```jsx
// src/components/layout/AppShell.jsx
import { NavLink } from "react-router-dom";

export function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-18 flex-col items-center bg-forest py-6 md:flex">
        <nav className="flex flex-col gap-6">
          <NavItem to="/" icon="🏠" label="Inicio" />
          <NavItem to="/recipes" icon="📖" label="Recetas" />
          <NavItem to="/profile" icon="👤" label="Perfil" />
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="pb-20 md:ml-18 md:pb-0">
        {children}
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-stone-200 bg-white py-3 shadow-nav md:hidden">
        <NavItem to="/" icon="🏠" label="Inicio" isMobile />
        <NavItem to="/recipes" icon="📖" label="Recetas" isMobile />
        <NavItem to="/profile" icon="👤" label="Perfil" isMobile />
      </nav>

    </div>
  );
}

/**
 * Item de navegación con NavLink.
 * La prop `isActive` la inyecta react-router automáticamente.
 */
function NavItem({ to, icon, label, isMobile = false }) {
  if (isMobile) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-colors ${
            isActive ? "text-forest" : "text-stone-400"
          }`
        }
      >
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </NavLink>
    );
  }

  // Sidebar
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
          isActive
            ? "bg-forest-light text-white"
            : "text-white/60 hover:bg-forest-dark hover:text-white"
        }`
      }
      title={label}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
    </NavLink>
  );
}
```

### Paso 5 — Probarlo

1. Abre la app. Deberías estar en `/` (Home).
2. Haz click en "📖 Recetas" (sidebar o bottom nav). La URL cambia a `/recipes` **sin recargar la página**.
3. Haz click en "👤 Perfil". Ves tu XP, nivel y lecciones completadas.
4. El botón activo tiene estilo distinto (fondo más claro en sidebar, color verde en bottom nav).

## 🤔 Decisión de diseño

### ¿Por qué `<BrowserRouter>` y no `<HashRouter>`?

| Router | URLs | Cuándo usar |
|---|---|---|
| `<BrowserRouter>` | `/recipes` | Apps modernas con servidor que soporta history API |
| `<HashRouter>` | `/#/recipes` | Apps estáticas sin servidor (GitHub Pages sin config) |

`BrowserRouter` da URLs limpias. `HashRouter` funciona en cualquier host tonto (el `#` previene que el navegador haga request al servidor). Para deploy en Vercel/Netlify, usa `BrowserRouter` + un archivo `_redirects` o `vercel.json` que redirija todo a `/index.html`.

### ¿Por qué `className={({ isActive }) => ...}` con función?

`NavLink` pasa un objeto `{ isActive, isPending }` a la prop `className` si es una función. Así puedes aplicar clases condicionales sin `useState` manual:

```jsx
// ✅ React Router maneja isActive por ti
<NavLink className={({ isActive }) => isActive ? "activo" : "inactivo"} />

// ❌ Sin router tendrías que hacer esto manualmente
const isActive = window.location.pathname === "/recipes";
<a className={isActive ? "activo" : "inactivo"} />
```

### ¿Por qué las rutas están en `App.jsx` y no en un archivo separado?

Con 3 rutas, vivir en `App.jsx` está bien. A partir de 10+ rutas, conviene un `src/routes.jsx`:

```jsx
// src/routes.jsx
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/recipes", element: <Recipes /> },
  // ...
];

// App.jsx
import { routes } from "./routes";
<Routes>
  {routes.map(r => <Route key={r.path} {...r} />)}
</Routes>
```

Pero por ahora, 3 rutas en `App.jsx` son legibles.

### ¿Qué pasa si el usuario escribe `/algo-que-no-existe` en la URL?

React Router no muestra nada (pantalla blanca). Deberías añadir una ruta catch-all:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/recipes" element={<Recipes />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<NotFound />} /> {/* 👈 catch-all */}
</Routes>

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-6xl">🤷</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Página no encontrada</h1>
        <a href="/" className="mt-2 text-forest underline">Volver al inicio</a>
      </div>
    </div>
  );
}
```

## 🔥 Bonus: Navegación programática con `useNavigate`

A veces necesitas navegar **desde código** (no desde un click). Ejemplo: al completar una lección, redirigir a `/recipes`.

```jsx
import { useNavigate } from "react-router-dom";

function LessonCompleted() {
  const navigate = useNavigate();

  const goToRecipes = () => {
    navigate("/recipes"); // cambia la ruta programáticamente
  };

  return (
    <button onClick={goToRecipes}>
      Ver mi recetario →
    </button>
  );
}
```

`navigate(-1)` → volver atrás (como el botón "Back" del navegador).
`navigate("/recipes", { replace: true })` → reemplaza la entrada actual del historial (el usuario no puede volver con "Back").

## 🏋️ Ejercicio

1. Crea una página `src/pages/NotFound.jsx` con un 404 personalizado. Añade la ruta `<Route path="*" element={<NotFound />} />` al final de `<Routes>`. Visita `/ruta-inventada` para verla.
2. En `Home.jsx`, importa `lessons` y muestra una tarjeta por cada lección con su emoji, nombre y un botón "Empezar". El botón debe navegar a `/lesson/:id` (todavía no existe esa ruta, ponlo como placeholder).
3. **Pregunta de diseño**: si quisieras que `/recipes` tenga pestañas "Completadas" y "Favoritas" (`/recipes/completed`, `/recipes/favorites`), ¿usarías rutas anidadas o estado local?
   <details><summary>💡 Respuesta</summary>
   **Rutas anidadas**. URLs compartibles > estado volátil. Si el usuario comparte el link `/recipes/completed`, debe abrirse directo en esa pestaña. Con estado local, siempre abre en la primera pestaña. Patrón:
   ```jsx
   <Route path="/recipes" element={<RecipesLayout />}>
     <Route path="completed" element={<Completed />} />
     <Route path="favorites" element={<Favorites />} />
   </Route>
   ```
   `RecipesLayout` renderiza `<Outlet />` donde van las subrutas.
   </details>

---

# 🛑 Pausa — Fin de la Tanda 4

Ya sabes:

- ✅ Configurar un sistema de design tokens completo con `@theme`
- ✅ Construir un layout responsivo (sidebar + bottom nav) con clases utility
- ✅ Configurar React Router DOM v6 con rutas básicas
- ✅ Usar `NavLink` con estilos activos automáticos
- ✅ Navegar programáticamente con `useNavigate`

**Logros desbloqueados:**

- La app tiene 3 páginas navegables sin recargar.
- El diseño es responsivo (sidebar en desktop, bottom nav en móvil).
- Cambiar un color en `@theme` actualiza toda la app.

**Antes de la Tanda 5**, verifica que:

1. Puedes navegar entre Home, Recetas y Perfil con el nav (sidebar o bottom).
2. El ítem activo tiene estilo distinto (fondo claro en sidebar, texto verde en bottom nav).
3. La página de Perfil muestra el XP y nivel reales (persistidos de la Tanda 3).
4. Al redimensionar la ventana, el layout cambia de sidebar a bottom nav y viceversa.

Cuando estés listo, escribe **"sigue"** y arranco la **Tanda 5** (final): persistencia avanzada con sincronización entre pestañas (L9) y build + deploy + optimizaciones de producción (L10).

> ❓ Si algo de tokens, responsive o routing no quedó claro, pregunta ahora.