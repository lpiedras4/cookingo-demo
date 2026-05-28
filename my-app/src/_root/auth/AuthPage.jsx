import React from "react";
import { Outlet } from "react-router-dom";
import SignInForm from "./forms/SignInForm";
import SignupForm from "./forms/SignupForm";

const AuthPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen w-full bg-green-mint px-5 py-6 md:px-8 ">
      <div className="flex flex-col items-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
