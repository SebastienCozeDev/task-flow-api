"use client";

import {
  getAccessToken,
  isAuthenticated as checkIsAuthenticated,
  removeAccessToken,
} from "@/lib/auth-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  refreshAuth: () => void;
  logout: () => void;
};



const AuthContext = createContext<AuthContextValue | undefined>(undefined);



export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const refreshAuth = () => {
    const currentToken = getAccessToken();
    setToken(currentToken);
    setIsAuthenticated(checkIsAuthenticated());
    setIsLoading(false);
  };

  const logout = () => {
    removeAccessToken();
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      token,
      refreshAuth,
      logout,
    }),
    [isLoading, isAuthenticated, token],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};



export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
