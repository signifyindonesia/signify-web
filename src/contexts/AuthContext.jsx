import { createContext, useContext, useEffect, useState } from "react";
import { getUser, logout as logoutUser } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());

  const login = () => setUser(getUser());
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  useEffect(() => {
    // Optional: keep user updated if localStorage changes from another tab
    const handleStorage = () => setUser(getUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
