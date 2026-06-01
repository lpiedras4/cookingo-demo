import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../hooks/useProgress";
import { useUsers } from "../../hooks/useUsers";

const tabItems = [
  { key: "account", label: "Cuenta" },
  { key: "experience", label: "Experiencia" },
  { key: "team", label: "Equipo de Cookingo" },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { resetProgress } = useProgress();
  const { user, logout, refreshUser } = useUsers();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    refreshUser();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Estás seguro de cerrar tu cuenta, guardará tu progreso y podrás volver a iniciar sesión cuando quieras.",
    );

    if (confirmed) {
      resetProgress();
      logout();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-4">
            <div className="rounded-3xl border-2 border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Nombre</p>
              <p className="font-display text-lg font-bold text-stone-800">{user?.name || "Nombre del usuario"}</p>
            </div>
            <div className="rounded-3xl border-2 border-stone-200 bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-wide text-stone-400">Correo</p>
              <p className="font-display text-lg font-bold text-stone-800">{user?.email || "Sin correo registrado"}</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-forest-dark"
            >
              Editar perfil
            </button>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <p className="text-sm text-stone-600">
              Personaliza tu experiencia en Cookingo y revisa tu actividad reciente. Aquí puedes ver tu progreso, tus lecciones completadas y tus logros.
            </p>
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-forest-dark"
            >
              Ir al inicio
            </button>
          </div>
        );

      case "team":
        return (
          <div className="space-y-4">
            <p className="text-sm text-stone-600">
              Conoce al equipo que hace posible Cookingo. Nuestro equipo de instructores y diseñadores está aquí para ayudarte a mejorar cada receta.
            </p>
            <div className="rounded-3xl border-2 border-stone-200 bg-stone-50 p-4">
              <p className="font-display text-base font-bold text-stone-800">Equipo Cookingo</p>
              <p className="mt-2 text-sm text-stone-600">
                Soporte, creatividad y recetas diseñadas para ayudarte a crecer como chef.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-800">Configuración</h1>
          <p className="mt-2 text-sm text-stone-500">
            Ajusta tu cuenta, revisa tu experiencia y administra tu sesión con la misma estructura que el resto de las páginas.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border-2 border-stone-200 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-display text-xl font-bold text-stone-800">Secciones</h2>
          <div className="space-y-3">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "border-2 border-forest bg-forest-dark text-white"
                    : "border-2 border-stone-200 bg-stone-50 text-stone-700 hover:border-forest hover:bg-forest/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-800">{tabItems.find((tab) => tab.key === activeTab)?.label}</h2>
              <p className="mt-1 text-sm text-stone-500">
                {activeTab === "account"
                  ? "Información de tu cuenta y accesos."
                  : activeTab === "experience"
                  ? "Avanza en Cookingo con recomendaciones personalizadas."
                  : "Descubre quién está detrás de la app."}
              </p>
            </div>
            {activeTab === "account" && (
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            )}
          </div>

          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
