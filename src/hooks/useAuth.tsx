import { useState } from "react";

const TOKEN_KEY = "sessionId";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const login = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const isLoggedIn = !!token;

  return { token, login, logout, isLoggedIn };
};
