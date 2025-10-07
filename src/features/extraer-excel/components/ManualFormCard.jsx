import React from "react";

export const ManualFormCard = () => (
  <div className="af-card">
    <h3>Registrar Asistencia Manualmente</h3>
    <div className="af-form">
      <div className="af-field">
        <label className="af-label">Nombre del Empleado</label>
        <input className="af-input" placeholder="Ej. Nombre Apellido" />
      </div>
      <div className="af-field">
        <label className="af-label">Fecha</label>
        <input type="date" className="af-input" />
      </div>
      <div className="af-field">
        <label className="af-label">Hora de Entrada</label>
        <input type="time" className="af-input" />
      </div>
      <div className="af-field">
        <label className="af-label">Hora de Salida</label>
        <input type="time" className="af-input" />
      </div>
      <div className="af-field" style={{ gridColumn: "1 / -1" }}>
        <button className="af-btn af-btn-outline" type="button">
          Registrar Asistencia
        </button>
      </div>
    </div>
  </div>
);
