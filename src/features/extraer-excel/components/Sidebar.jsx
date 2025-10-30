import React from "react";
import { Icon } from "./icons";

export const Sidebar = () => (
  <aside className="af-sidebar">
    <nav className="af-menu">
      <div className="af-item">
        <span className="af-ico">
          <Icon.home />
        </span>
        <span className="af-item-text">Inicio</span>
      </div>

      <div className="af-item active">
        <span className="af-ico">
          <Icon.upload />
        </span>
        <span className="af-item-text">Subida</span>
      </div>

      <div className="af-item">
        <span className="af-ico">
          <Icon.file />
        </span>
        <span className="af-item-text">Factura</span>
      </div>

      <div className="af-item">
        <span className="af-ico">
          <Icon.building />
        </span>
        <span className="af-item-text">Sede</span>
      </div>

      <div className="af-item">
        <span className="af-ico">
          <Icon.calendar />
        </span>
        <span className="af-item-text">Mes</span>
      </div>

      <div className="af-item">
        <span className="af-ico">
          <Icon.sheet />
        </span>
        <span className="af-item-text">Prefactura</span>
      </div>
    </nav>

    <div
      className="af-user"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#94a3b8",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#e2e8f0",
        }}
      />
      <small className="af-item-text">@usuario</small>
    </div>
  </aside>
);
