import React from "react";

export const SheetLinkBar = ({
  sheetLink,
  onChange,
  onExtract,
  onExport,
  loadingExtract,
  loadingImport,
  msg,

  // nuevos:
  onUploadTop, // función para subir a BD desde arriba
  canUploadTop = false, // habilitación del botón
}) => (
  <div className="af-card" style={{ marginBottom: 16 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
      <input
        className="af-input"
        placeholder="Pega el link público del Excel (Google Sheets publicado .xlsx)"
        value={sheetLink}
        onChange={(e) => onChange(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className="af-btn af-btn-outline"
          onClick={onExtract}
          disabled={loadingExtract || loadingImport || !sheetLink.trim()}
          title={!sheetLink.trim() ? "Pega el link primero" : "Extraer datos"}
        >
          {loadingExtract ? "Extrayendo..." : "Extraer datos"}
        </button>

        <button
          className="af-btn af-btn-outline"
          onClick={onExport}
          disabled={loadingExtract || loadingImport}
        >
          Exportar CSV
        </button>

        {/* ➕ Botón superior para cargar a BD */}
        <button
          className="af-btn af-btn-primary"
          onClick={onUploadTop}
          disabled={!canUploadTop}
          title={
            !canUploadTop
              ? "Pega el link y pulsa 'Extraer datos' primero"
              : "Cargar a base de datos"
          }
          style={{ whiteSpace: "nowrap" }}
        >
          {loadingImport ? "Procesando..." : "Cargar a base de datos"}
        </button>
      </div>
    </div>

    {msg && (
      <div
        style={{
          marginTop: 10,
          color: "#0f766e",
          background: "#ecfeff",
          border: "1px solid #a5f3fc",
          padding: "8px 10px",
          borderRadius: 8,
        }}
      >
        {msg}
      </div>
    )}
  </div>
);
