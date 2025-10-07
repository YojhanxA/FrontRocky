// Topbar.jsx
import React from "react";
import { Icon } from "./icons";

export const Topbar = ({ onToggleSidebar }) => (
  <header className="af-topbar">
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* visible solo en móvil por .af-menu-btn */}
      <button
        className="af-menu-btn"
        onClick={onToggleSidebar}
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="currentColor"
            d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
          />
        </svg>
      </button>
      <div className="af-brand">Rocky</div>
    </div>

    <nav className="af-topnav">
      <a href="/">Inicio</a>
      <a href="/asistencia" className="active">
        Asistencia
      </a>
      <a href="/factura">Facturación</a>
      <a href="/reportes">Reportes</a>
      <a href="#bell" aria-label="Notificaciones" style={{ marginLeft: 10 }}>
        <Icon.bell />
      </a>
    </nav>
  </header>
);
