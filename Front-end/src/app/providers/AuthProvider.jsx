// src/app/providers/AuthProvider.jsx
import { createContext, useContext, useMemo, useState } from "react";
import * as authApi from "../../services/authService";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  // LOGIN via API
  const login = async ({ email, password }) => {

    const u = await authApi.login({ email, password });
    const auth = {
      id: u.id,
      email: u.email,
      name: u.name ?? u.email,
      roles: u.roles || [],
      permissions: u.permissions || [],
      ts: Date.now(),
    };

    localStorage.setItem("auth", JSON.stringify(auth));
    setUser(auth);
    return auth;
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  const hasRole = (...roles) =>
    !!user && roles.some((r) => user.roles?.includes(r));

  const hasPermission = (...perms) =>
    !!user && perms.some((p) => user.permissions?.includes(p));

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      hasRole,
      hasPermission,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
