import React, { useState } from "react";
import "../styles/taiwild.css";
import logoRocky from "../image/Rocky.jpeg";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      alert("Login enviado (demo)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-[Inter] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-3">
            {/* Logo Rocky agrandado */}
            <img
              src={logoRocky}
              alt="Logo Rocky"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#117dd4]/30 shadow-sm"
            />
            <span className="text-[18px] font-semibold text-[#0f172a] tracking-tight">
              Rocky
            </span>
          </div>
        </nav>
      </header>

      {/* Card centrada */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-8">
          <h2 className="text-center text-[28px] font-bold text-[#111827]">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Inputs */}
            <div className="space-y-3">
              <div
                className="rounded-xl bg-[#f1f5f9] border border-[#e5e7eb] transition
                              focus-within:border-[#117dd4] focus-within:ring-2 focus-within:ring-[#117dd4]/25"
              >
                <label htmlFor="email" className="sr-only">
                  Usuario / Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Usuario / Email"
                  className="w-full bg-transparent border-0 focus:ring-0 outline-none
                             px-3 py-2.5 text-[14px] text-[#0f172a] placeholder-[#94a3b8]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className="rounded-xl bg-[#f1f5f9] border border-[#e5e7eb] transition
                              focus-within:border-[#117dd4] focus-within:ring-2 focus-within:ring-[#117dd4]/25"
              >
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  className="w-full bg-transparent border-0 focus:ring-0 outline-none
                             px-3 py-2.5 text-[14px] text-[#0f172a] placeholder-[#94a3b8]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Extras */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#374151]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#d1d5db] text-[#117dd4] focus:ring-[#117dd4]"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Recordarme
              </label>

              <a
                href="#"
                className="text-sm font-medium text-[#117dd4] hover:opacity-80"
              >
                ¿Olvidé mi contraseña?
              </a>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg text-white text-sm font-semibold
                         bg-[#117dd4] hover:bg-[#0e6bb6] transition disabled:opacity-60"
            >
              {loading ? "Ingresando…" : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
