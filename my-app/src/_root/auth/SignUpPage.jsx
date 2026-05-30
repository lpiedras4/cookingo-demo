import React from 'react'
import SignupForm from "./forms/SignupForm";
import {useUsers} from "./../../hooks/useUsers"
const SignUpPage = () => {
  const { register, loading, error } = useUsers();

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try{
      await register(data);
    }catch(e){
      console.error("Error al registrar:", e.message);
    }
    
  };

  return (
    <div>
      <SignupForm onSubmit={handleRegister} />

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-600">
          Creando cuenta...
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

export default SignUpPage
