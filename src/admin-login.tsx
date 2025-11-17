import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Simple credentials – change these to what you want
    const correctEmail = "admin@sugeeth.com";
    const correctPass = "YourStrongPassword123";

    if (email === correctEmail && pass === correctPass) {
      setError("");
      // SPA redirect to admin dashboard
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-zinc-900 rounded-xl border border-zinc-800 w-[90%] max-w-sm"
      >
        <h1 className="text-xl mb-4 font-light">Admin Access</h1>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 bg-black border border-zinc-700 text-sm"
        />

        <input
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 bg-black border border-zinc-700 text-sm"
        />

        <button
          type="submit"
          className="w-full py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
