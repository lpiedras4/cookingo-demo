# Cookingo

> An interactive learning app for cooking healthy, accessible meals, built around a gamified experience: a placement exam, an XP/leveling system, and step-by-step guided lessons for each recipe.

[![Watch Demo](https://img.shields.io/badge/🎥-Watch%20Demo-red)](YOUR_YOUTUBE_LINK_HERE)
[![Backend Repo](https://img.shields.io/badge/backend-repo-blue)](YOUR_BACKEND_LINK_HERE)

![Cookingo demo](docs/demo.gif)
<!-- 5-8s looping GIF: placement exam → home screen with XP → a full lesson -->

** [Watch the full demo video](YOUR_YOUTUBE_LINK_HERE)** — a narrated walkthrough covering technical decisions

## Overview

Cookingo teaches healthy recipes through guided lessons instead of just listing them. After signing up, the user takes a placement exam that sets their starting level; from there, they progress by completing recipes structured as lessons (ingredients → prep order → cooking → results), earning XP and leveling up along the way.

## Features

- **Placement exam (diagnostic exam):** determines the user's starting level before they begin
- **Gamified progress system:** XP, levels (every 100 XP = 1 level), and badges, with local persistence and backend synchronization
- **Step-by-step lesson flow:** each recipe is taught as a lesson with welcome, ingredients, prep order, cooking, and results screens
- **Recipe catalog by category** (Breakfast, Lunch, Dinner) with nutritional info (calories, protein)
- **Authentication** with protected routes (`ProtectedRoute`)
- **User profile and settings**
- **Responsive layout:** sidebar on desktop, bottom navigation bar on mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Icons | Heroicons |
| Progress state | Custom hook (`useProgress`) over `localStorage`, with cross-tab and backend sync |
| API communication | Native `fetch`, one service module per resource |

**Backend:** [cookingo-api](YOUR_BACKEND_LINK_HERE) — Spring Boot + MySQL

## 🚀 Local Setup

**Prerequisites:** Node 18+, npm, and the [backend](YOUR_BACKEND_LINK_HERE) running locally (see `DatabaseGuide.md` in this repo to set up the database)

```bash
git clone https://github.com/lpiedras4/cookingo-demo.git
cd cookingo-demo/my-app
npm install
npm run dev
```

App available at `http://localhost:5173`

> ⚠️ The backend URL is hardcoded directly in each file under `src/services/` (e.g. `http://localhost:8080/cookingo/recipes`). If your API runs on a different host or port, update the `BASE_URL` constant in those files.

## 📁 Project Structure

```
cookingo-demo/
├── DatabaseGuide.md      # Guide for setting up the backend database
└── my-app/
    └── src/
        ├── _root/
        │   ├── auth/          # Sign in / Sign up
        │   └── pages/         # Home, Profile, Recipes, Settings, DiagnosticExam
        ├── components/
        │   ├── layout/        # AppShell (sidebar + bottom nav)
        │   ├── lesson/         # Step-by-step lesson flow
        │   ├── diagnosticExam/ # Placement exam
        │   └── ui/
        ├── hooks/               # useRecipes, useCategories, useIngredients, useUsers, useProgress
        ├── services/            # API access layer (fetch per resource)
        ├── data/                # Static lesson and exam question data
        └── routes/              # ProtectedRoute
```

## Design Decisions

- **Hybrid local + backend progress:** `useProgress` stores XP and completed lessons in `localStorage` optimistically (the UI responds instantly) and syncs with the backend in the background when a user is authenticated, without blocking interaction if the sync fails.
- **Combined leveling:** the level shown to the user combines the level assigned by the placement exam with the level derived from accumulated XP — [add here why combining both was chosen instead of using just one].
- [Add 1-2 real challenges you faced — for example, something about the placement exam design or how you structured the lesson flow.]


## 📄 License

MIT

**Author:** Leonardo — [LinkedIn](#) · [Backend repo for this project](YOUR_BACKEND_LINK_HERE)
