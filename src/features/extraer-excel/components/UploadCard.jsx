import React from "react";

export const UploadCard = ({
  onUpload,
  disabled,
  loadingImport,
  loadingExtract,
  rowsLength,
}) => (
  <div className="af-card">
    <h3>Subir Datos de Asistencia</h3>
    <div className="af-drop">
      <div style={{ marginBottom: 8, color: "#94a3b8" }}>
        {/* Ícono lo muestra Topbar/Sidebar, aquí solo el área visual */}
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          style={{ color: "#94a3b8" }}
        >
          <path
            fill="currentColor"
            d="M5 20h14v-2H5v2zM12 2l5 5h-3v6h-4V7H7l5-5z"
          />
        </svg>
      </div>
      <div>Click para subir o arrastra y suelta</div>
      <small>CSV (MAX. 5MB)</small>
    </div>
    <div style={{ marginTop: 12 }}>
      <button
        className="af-btn af-btn-primary"
        onClick={onUpload}
        disabled={
          disabled || loadingImport || loadingExtract || rowsLength === 0
        }
      >
        {loadingImport ? "Procesando..." : "Cargar a base de datos"}
      </button>
    </div>
  </div>
);
