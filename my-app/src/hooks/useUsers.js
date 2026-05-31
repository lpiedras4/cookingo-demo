import { useState } from "react";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";
export function useUsers() { 
  const navigate = useNavigate();

  const [user, setUser]       = useState(() =>{
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });  // usuario logueado

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Inicia sesión
  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const loggedUser = await userService.login(
        formData.email,
        formData.password,
      );

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      if(loggedUser.xp !== undefined) {
        localStorage.setItem("cookingo-progress", JSON.stringify({...JSON.parse(localStorage.getItem("cookingo-progress") || "{}"), xp: loggedUser.xp,}));
      }
      if(loggedUser.role == "ADMIN"){
        navigate("/admin");
      }else{
        navigate("/")
      }

      return loggedUser;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Registra un usuario nuevo
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: userData.name,
        age:Number(userData.age),
        email:userData.email,
        password:userData.password,
      };
      /*
      console.log("Datos enviados a Backend: ", payload);
      */
    
      const newUser = await userService.create(payload);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/diagnostic");
      return newUser;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    } 
  };

  // Cierra sesión 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user")
    navigate("/sign-in");
  };

  return { user, loading, error, login, register, logout };
}