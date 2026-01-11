import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import { AuthProvider } from "./AuthContext";

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Fallback so you don't see a pure blank page */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "black",
                  color: "white",
                }}
              >
                Page not found
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// 🛡️ SECURITY DETERRENT: Block common inspection methods
// Note: This is a deterrent, not absolute security but improves VAPT posture.
if (import.meta.env.PROD) {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
      (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'c' || e.key === 'j'))
    ) {
      e.preventDefault();
    }
  });

  console.log(
    "%c 🛡️ SECURITY STATUS: ACTIVE ",
    "background: #ff0000; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;"
  );
  console.log(
    "%cAccess to source code is restricted. Please contact the administrator for official inquiries.",
    "font-size: 14px;"
  );
}
