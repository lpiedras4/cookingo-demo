import React from 'react'
import SignInForm from "./forms/SignInForm";
import { useUsers } from "../../hooks/useUsers";
const SignInPage = () => {
 const { login, loading, error } = useUsers();

  return (
    <div>
      <SignInForm onSubmit={login} />

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-600">
          Iniciando sesión...
        </p>
      )}

      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default SignInPage
