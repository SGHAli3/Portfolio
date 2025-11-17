// src/AuthContext.tsx
import React, { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // No real auth yet – just a placeholder provider
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
