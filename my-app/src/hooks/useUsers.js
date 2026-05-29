import { useState } from "react";
import { userService } from "../services/userService";

export function useUser() { 
  const [user, setUser]       = useState(null);  // usuario logueado
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Inicia sesión
  const login = async (username, password) => {
    setLoading(true);
    try {
      const loggedUser = await userService.login(username, password);
      setUser(loggedUser);
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
    try {
      const newUser = await userService.create(userData);
      setUser(newUser);
      return newUser;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Cierra sesión
  const logout = () => setUser(null);

  return { user, loading, error, login, register, logout };
}