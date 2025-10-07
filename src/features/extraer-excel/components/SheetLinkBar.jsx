import React from "react";

export const SheetLinkBar = ({
  sheetLink,
  onChange,
  onExtract,
  onExport,
  loadingExtract,
  loadingImport,
  msg,
}) => (
  <div className="af-card" style={{ marginBottom: 16 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
      <input
        className="af-input"
        placeholder="Pega el link público del Excel (Google Sheets publicado .xlsx)"
        value={sheetLink}
        onChange={(e) => onChange(e.target.value)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="af-btn af-btn-outline"
          onClick={onExtract}
          disabled={loadingExtract || loadingImport}
        >
          {loadingExtract ? "Extrayendo..." : "Extraer datos"}
        </button>
        <button className="af-btn af-btn-outline" onClick={onExport}>
          Exportar CSV
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
