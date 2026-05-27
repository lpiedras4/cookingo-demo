import React from "react";
import SignInForm from "./forms/SignInForm";

const AuthPage = () => {
  return (
    <div className=" flex flex-col items-center min-h-screen w-full bg-forest px-5 py-6 md:px-8 ">
      <h1 className="font-display text-3xl font-bold text-white my-10">
        Aprende a cocinar con Cookin<span className="text-orange">Go</span>
      </h1>
      <div className="flex flex-col items-center justify-center">
        <SignInForm />
      </div>
      
    </div>
  );
};

export default AuthPage;
