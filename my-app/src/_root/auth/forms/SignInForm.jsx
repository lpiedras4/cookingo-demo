import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const SignInForm = ({
  onSubmit,
  logoText = "COOKINGO",
  title = "Aprende a cocinar con Cookingo ",
  subtitle = "Inicia sesión para continuar con tu experiencia",
}) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleCreateAccount = () => {
    navigate("/sign-up")
  }


  return (
    <div className="w-full max-w-95 rounded-md border-2 border-green-700 bg-white px-10 py-12 shadow-xl">
      <div className="text-center mb-5">
        <h1 className="text-4xl font-extrabold tracking-[0.18em]">
          <span className="text-green-800">COOKIN</span>
          <span className="text-orange-400">GO</span>
        </h1>
      </div>

      <div className="text-center mb-7">
        <h2 className="text-lg font-bold text-green-800">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-green-700"
          >
            Usuario
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Nombre del usuario"
            className="w-full rounded-md border border-green-400 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-green-700"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full rounded-md border border-green-400 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-green-800 py-3 text-sm font-bold text-white transition hover:bg-green-900 active:scale-[0.98]"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">o</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <div className="text-center text-sm text-gray-600">
        <span>¿No tienes una cuenta? </span>
        <button
          type="button"
          onClick={handleCreateAccount}
          className="font-semibold text-orange-500 underline-offset-2 hover:underline"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
