import React from "react";
import SignInForm from "./forms/SignInForm";

const AuthPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <h1 className="font-display text-3xl font-bold text-stone-800">
        Aprende a cocinar con Cookin<span className="text-orange">Go</span>
      </h1>
      <SignInForm />
    </div>
  );
};

export default AuthPage;
