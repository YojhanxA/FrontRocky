import React from "react";
import { Icon } from "./icons";
import logoRocky from "../../../image/Rocky.jpeg";
import { Link } from "react-router-dom";

export const Topbar = ({ onToggleSidebar }) => (
  <header className="af-topbar">
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

      {/* Logo + Marca */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
          src={logoRocky}
          alt="Logo Rocky"
          style={{
            height: 34,
            width: 34,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 0 4px rgba(0,0,0,0.15)",
            border: "2px solid #117dd4",
          }}
        />
        <span
          className="af-brand"
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "#0f172a",
            letterSpacing: "-0.3px",
          }}
        >
          Rocky
        </span>
      </div>
    </div>

    <nav className="af-topnav">
      <a href="/">Inicio</a>
      <Link to="/carga"> Asistencia</Link>
      <Link to="/factura">Factura</Link>
      <a href="/reportes">Reportes</a>
      <a href="#bell" aria-label="Notificaciones" style={{ marginLeft: 10 }}>
        <Icon.bell />
      </a>
    </nav>
  </header>
);
9167