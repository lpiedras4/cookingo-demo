import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const SignupForm = ({
  onSubmit,
  title = "Crea tu cuenta en CookinGo",
  subtitle = "Únete y empieza a disfrutar de una experiencia única.",
}) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (onSubmit) {
      onSubmit(data);
    }
  };

  const onGoToLogin = () =>{
    navigate("/sign-in")
  }

  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#f3faf2] px-4">
      <div className="w-full max-w-115 rounded-md border-2 border-green-700  bg-white px-14 py-14 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-[0.18em]">
            <span className="text-green-800">COOKIN</span>
            <span className="text-orange-400">GO</span>
          </h1>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-green-800">{title}</h2>

          <p className="mt-2 text-sm font-medium text-gray-600">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-green-700"
            >
              Nombre de usuario
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nombre del usuario"
              className="w-full rounded-md border border-green-600 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-green-800 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-green-700"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-full rounded-md border border-green-600 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-green-800 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-green-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              className="w-full rounded-md border border-green-600 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-green-800 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-green-700"
            >
              Confirmar contraseña
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirma tu contraseña"
              className="w-full rounded-md border border-green-600 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-500 focus:border-green-800 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-md bg-green-800 py-3 text-base font-bold text-white transition hover:bg-green-900 active:scale-[0.98]"
          >
            Crear cuenta
          </button>
        </form>

        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-600">o</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="text-center text-sm font-medium text-gray-600">
          <span>¿Ya tienes una cuenta? </span>

          <button
            type="button"
            onClick={onGoToLogin}
            className="font-semibold text-orange-500 underline-offset-2 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
