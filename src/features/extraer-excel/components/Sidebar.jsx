import React from "react";
import { Icon } from "./icons";

export const Sidebar = () => (
  <aside className="af-sidebar">
    <div className="af-menu">
      <div className="af-item">
        <span className="af-ico">
          <Icon.home />
        </span>{" "}
        Inicio
      </div>
      <div className="af-item active">
        <span className="af-ico">
          <Icon.upload />
        </span>{" "}
        Subida
      </div>
      <div className="af-item">
        <span className="af-ico">
          <Icon.file />
        </span>{" "}
        Factura
      </div>
      <div className="af-item">
        <span className="af-ico">
          <Icon.building />
        </span>{" "}
        Sede
      </div>
      <div className="af-item">
        <span className="af-ico">
          <Icon.calendar />
        </span>{" "}
        Mes
      </div>
      <div className="af-item">
        <span className="af-ico">
          <Icon.sheet />
        </span>{" "}
        Prefactura
      </div>
    </div>

    <div
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
      <small>@usuario</small>
    </div>
  </aside>
);
