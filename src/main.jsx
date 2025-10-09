// src/main.jsx
import { StrictMode, useState, useEffect } from "react";
//import "./styles/af.css"; // 👈 que esté, y sin errores de ruta
//import "./styles/taiwild.css"
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Ajusta estos imports si tus exports son default o named:
import { Topbar } from "./features/extraer-excel/components/Topbar";
import { Sidebar } from "./features/extraer-excel/components/Sidebar";
import { ExtraerExcel } from "./pages/ExtraerExcel";
import { Factura } from "./pages/Factura";
import { LoginPage } from "./pages/LoginPage"; // si exportas default: import LoginPage from "./pages/LoginPage";
import "./styles/af.css";

/* -------- Layout sólo para páginas autenticadas -------- */
function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("af-sidebar-open", sidebarOpen);
    return () => document.body.classList.remove("af-sidebar-open");
  }, [sidebarOpen]);

  return (
    <div className="af-app">
      <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div
        className="af-body"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {/* evita que los clicks dentro del sidebar lo cierren */}
        <div onClick={(e) => e.stopPropagation()}>
          <Sidebar />
        </div>

        <main className="af-main">
          {/* Aquí se renderizan las páginas internas */}
          <Outlet />

          <div className="af-footer">
            © 2025 Rocky. Todos los derechos reservados.
          </div>
        </main>
      </div>
    </div>
  );
}

/* -------- Layout minimal para login (sin topbar/sidebar/footer) -------- */
function AuthShell() {
  return (
    <div className="af-auth min-h-screen">
      {/* Si tu LoginPage ya dibuja todo el fondo/centrado, con esto basta */}
      <Outlet />
    </div>
  );
}

function RootRouter() {
  return (
    <Routes>
      {/* Grupo AUTH (login) */}
      <Route element={<AuthShell />}>
        <Route path="/" element={<LoginPage />} />
        {/* si prefieres /login: <Route path="/login" element={<LoginPage />} /> */}
      </Route>

      {/* Grupo APP (protegido) */}
      <Route element={<AppShell />}>
        <Route path="/carga" element={<ExtraerExcel />} />
        <Route path="/factura" element={<Factura />} />
      </Route>

      {/* 404 opcional
      <Route path="*" element={<NotFound />} />
      */}
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <RootRouter />
    </Router>
  </StrictMode>
);
