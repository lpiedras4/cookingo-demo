import React from "react";

const SignInForm = () => {
  return (
    <div className="px-4 py-4 w-90 rounded-xl bg-amber">
      <form className="max-w-sm mx-auto ">
        <div className="mb-5">
          <label
            for="email-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Usuario
          </label>
          <input
            type="username"
            id="username-alternative"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            placeholder="leo_pp4"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password-alternative"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="flex flex-col items-center mb-5 space-y-5">
        
         <p>
          No tienes una cuenta? <a className="hover:underline hover:text-blue-700"> Crear cuenta </a>
         </p>
            <button
          type="submit"
          className="text-white bg-orange-500 hover:bg-orange rounded-lg box-border border border-transparent hover:bg-brand-strong focus:ring-2 focus:ring-brand-medium shadow-xs  font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Iniciar Sesión
        </button>
        </div>
      
      </form>
    </div>
  );
};

export default SignInForm;
