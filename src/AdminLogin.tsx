import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(email, pass)) {
      setError("");
      navigate("/admin");
    } else {
      setError("Invalid credentials. Access Denied.");
      // Security: Clear password field on error
      setPass("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-zinc-900 rounded-xl border border-zinc-800 w-[90%] max-w-sm shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h1 className="text-xl font-light tracking-widest uppercase">Secure Admin Access</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-3 mb-4 rounded text-red-500 text-xs text-center animate-shake">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1 block">Identifier</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full px-3 py-3 bg-black border border-zinc-800 text-sm focus:border-white transition-colors outline-none rounded-sm"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-zinc-500 tracking-wider mb-1 block">Security Key</label>
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm focus:border-white transition-colors outline-none rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-zinc-200 transition-all duration-300"
          >
            Authorize session
          </button>
          <p className="text-[9px] text-zinc-600 text-center uppercase tracking-widest pt-4">
            Encryption active · VAPT Compliant Environment
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
