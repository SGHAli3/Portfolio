import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Persist session in-memory for the session duration
    return sessionStorage.getItem("is_auth") === "true";
  });

  const login = (email: string, pass: string) => {
    // Environment variables preferred for security. 
    // Fallback for local dev/testing.
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@sugeeth.com";
    const adminPass = import.meta.env.VITE_ADMIN_PASS || "YourStrongPassword123";

    if (email === adminEmail && pass === adminPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("is_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("is_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
