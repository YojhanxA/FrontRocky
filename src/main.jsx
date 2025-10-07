// src/main.jsx
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Topbar } from "./features/extraer-excel/components/Topbar";
import { Sidebar } from "./features/extraer-excel/components/Sidebar";
import { ExtraerExcel } from "./pages/ExtraerExcel";
import { Factura } from "./pages/Factura";
import "./styles/af.css";

function AppLayout() {
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
          <Routes>
            <Route path="/" element={<ExtraerExcel />} />
            <Route path="/factura" element={<Factura />} />
          </Routes>

          <div className="af-footer">
            © 2025 Rocky. Todos los derechos reservados.
          </div>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AppLayout />
    </Router>
  </StrictMode>
);
