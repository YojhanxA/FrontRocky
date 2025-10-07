import React from "react";
import { Icon } from "./icons";

export const Topbar = () => (
  <header className="af-topbar">
    <div className="af-brand">Rocky</div>
    <nav className="af-topnav">
      <a href="#inicio">Inicio</a>
      <a href="#asistencia" className="active">
        Asistencia
      </a>
      <a href="#facturacion">Facturación</a>
      <a href="#reportes">Reportes</a>
      <a href="#bell" aria-label="Notificaciones" style={{ marginLeft: 10 }}>
        <Icon.bell />
      </a>
    </nav>
  </header>
);
