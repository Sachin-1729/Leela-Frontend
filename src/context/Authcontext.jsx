import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../api/users";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

     const checkAuth = async () => {
      try {
        if (!token) {
          setUser(null);
          return;
        }
        const response = await users();
        setUser(response?.data?.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}