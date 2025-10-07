// ExtractorSheetProFixed.jsx
import React, { useMemo, useState } from "react";

/* ======== Config API ======== */
const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8081/asifact";

/* ======== DATOS DE EJEMPLO (SIN CAMBIOS) ======== */
const SAMPLE = [
  {
    hora: "17.12",
    fecha: "31-7-2025",
    numeroCel: "SE_SENCARGADA-NORBEY-AGUIRRE",
    nombre: "Norbey",
    documento: "71993147",
    novedad: "1",
    codigo: "",
  },
  {
    hora: "4.39",
    fecha: "1-8-2025",
    numeroCel: "SS_CADPISO04-ELIANA-ANTIVAR-SUPER4-LV",
    nombre: "Eliana Antivar",
    documento: "43481639",
    novedad: "1",
    codigo: "",
  },
  {
    hora: "4.39",
    fecha: "1-8-2025",
    numeroCel: "SS_PLAZAMAYOR-SANDRA-VELEZ-SUPER4-LV",
    nombre: "Sandra Velez",
    documento: "32258580",
    novedad: "1",
    codigo: "",
  },
  {
    hora: "4.43",
    fecha: "1-8-2025",
    numeroCel: "SSAL_PALTURAS-FERNANDO-RESTREPO-COALTURAS-LS",
    nombre: "Luis Fernando Restrepo Botero",
    documento: "71695851",
    novedad: "1",
    codigo: "",
  },
  {
    hora: "4.43",
    fecha: "1-8-2025",
    numeroCel: "SS_ESPACIOPUBLICO-JULIANA-MOSQUERA-SUPER3-LV",
    nombre: "Juliana Mosquera",
    documento: "1128395214",
    novedad: "3",
    codigo: "NOVEDAD",
  },
];

/* ======== ICONOS SVG ======== */
const Icon = {
  home: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path fill="currentColor" d="M12 3l9 7h-2v9h-5v-6H10v6H5v-9H3z" />
    </svg>
  ),
  upload: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M5 20h14v-2H5v2zM12 2l5 5h-3v6h-4V7H7l5-5z"
      />
    </svg>
  ),
  file: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V8z"
      />
      <path fill="currentColor" d="M14 2v6h6" />
    </svg>
  ),
  building: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M3 22h18v-2H3v2zm2-4h14V3H5v15zm2-2V5h10v11H7z"
      />
    </svg>
  ),
  calendar: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 8H4v10h16V10z"
      />
    </svg>
  ),
  sheet: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M4 3h11l5 5v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      />
      <path fill="currentColor" d="M15 3v6h6" />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"
      />
    </svg>
  ),
};

/* ======== CHIP NOVEDAD ======== */
const BadgeNovedad = ({ value }) => (
  <span className={`af-badge-nov ${value === "3" ? "danger" : "neutral"}`}>
    {value}
  </span>
);

/* ======== Helpers de mapeo/normalización ======== */
const normalizeFecha = (v) => {
  if (!v) return "";
  const s = String(v);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/); // "2025-08-01 00:00:00" -> "2025-08-01"
  return m ? m[1] : s;
};

// Recibe una fila del engine Python y la adapta al modelo del front
const mapFromEngineRow = (r) => ({
  hora: r.HORA ?? r.col1 ?? "",
  fecha: normalizeFecha(r.FECHA ?? r.col2 ?? ""),
  numeroCel: r["NUMERO CEL"] ?? r.NUMERO_CEL ?? r.col3 ?? "",
  nombre: r.NOMBRE ?? r.col4 ?? "",
  documento: r.DOCUMENTO ?? r.col5 ?? "",
  novedad: r.NOVEDAD ?? r.col6 ?? "",
  codigo: r.CODIGO ?? r.col7 ?? "",
});

/* =================== COMPONENTE =================== */
export const ExtraerExcel = () => {
  const [sheetLink, setSheetLink] = useState("");
  const [rows, setRows] = useState(SAMPLE);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [engineRows, setEngineRows] = useState([]); // <--- NUEVO

  const [msg, setMsg] = useState(null);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.hora, r.fecha, r.numeroCel, r.nombre, r.documento, r.novedad, r.codigo]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [q, rows]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  /* === PREVIEW: front -> backend -> engine === */
  // --- reemplaza COMPLETO tu handleExtraer por esto ---
  const handleExtraer = async () => {
    if (!sheetLink.trim()) {
      setMsg("⚠️ Pega primero el link público del Excel.");
      return;
    }
    setMsg(null);
    setLoadingExtract(true);
    try {
      const qs = new URLSearchParams({
        url: sheetLink,
        onlyNumericSheets: "true",
      });
      const res = await fetch(`${API_BASE}/preview?${qs.toString()}`, {
        method: "GET",
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok)
        throw new Error(data?.message || data?.error || res.statusText);

      const mapped = (data.rows || []).map(mapFromEngineRow);
      setRows(mapped);
      setEngineRows(data.rows || []); // <--- GUARDA CRUDO PARA IMPORTAR

      setPage(1);
      setMsg(
        `✅ Hojas: ${data.sheets_processed}/${data.sheets_total}. Registros: ${mapped.length}.`
      );
    } catch (e) {
      setMsg(`❌ Error al extraer: ${e.message || e}`);
    } finally {
      setLoadingExtract(false);
    }
  };

  /* === IMPORT: front -> backend (persistir en Postgres) === */
  const handleSubir = async () => {
    if (!sheetLink.trim()) {
      setMsg("⚠️ Pega el link primero.");
      return;
    }
    if (!engineRows || engineRows.length === 0) {
      setMsg("⚠️ Primero pulsa 'Extraer datos' para tener filas que subir.");
      return;
    }
    setMsg(null);
    setLoadingImport(true);
    try {
      const res = await fetch(`${API_BASE}/import/rows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(engineRows),
      });

      const txt = await res.text();
      const data = txt ? JSON.parse(txt) : {};
      if (!res.ok)
        throw new Error(data?.message || data?.error || res.statusText);

      setMsg(
        `✅ Insertados: ${data.inserted} (recibidos ${data.received_rows}).`
      );
    } catch (e) {
      setMsg(`❌ Error al subir: ${e.message || e}`);
    } finally {
      setLoadingImport(false);
    }
  };

  const exportCSV = () => {
    const csv = [
      [
        "HORA",
        "FECHA",
        "NUMERO CEL",
        "NOMBRE",
        "DOCUMENTO",
        "NOVEDAD",
        "CODIGO",
      ],
      ...filtered.map((r) => [
        r.hora,
        r.fecha,
        r.numeroCel,
        r.nombre,
        r.documento,
        r.novedad,
        r.codigo,
      ]),
    ]
      .map((r) =>
        r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registros_preview.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = `
    :root{ --border:#e5e7eb; --text:#0f172a; --muted:#64748b; --bg:#f8fafc; --card:#ffffff; --primary:#1e88e5; --primary-700:#1769aa; }
    *{box-sizing:border-box}
    .af-app{min-height:100vh; background:var(--bg); color:var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;}
    .af-topbar{height:60px; background:#fff; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 24px;}
    .af-brand{font-weight:700; font-size:18px;}
    .af-topnav a{font-size:14px; color:var(--muted); text-decoration:none; margin-left:18px}
    .af-topnav a.active{color:var(--primary); font-weight:600}
    .af-body{display:flex; min-height:calc(100vh - 60px);}
    .af-sidebar{width:240px; background:#fff; border-right:1px solid var(--border); padding:16px 14px; display:flex; flex-direction:column; justify-content:space-between;}
    .af-menu{display:flex; flex-direction:column; gap:6px}
    .af-item{display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:12px; color:#475569; font-weight:600; cursor:pointer}
    .af-ico{width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background:#f1f5f9; color:#64748b}
    .af-item:hover{background:#f8fafc}
    .af-item.active{background:#eaf3ff; color:#1e88e5}
    .af-item.active .af-ico{background:#dbeafe; color:#1e88e5}
    .af-main{flex:1; padding:24px 28px;}
    .af-title{font-size:24px; font-weight:800; margin:8px 0 18px 0;}
    .af-grid{display:grid; grid-template-columns: 1fr; gap:16px; margin-bottom:16px;}
    @media (min-width: 992px){ .af-grid{grid-template-columns: 1fr 1fr;} }
    .af-card{background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px;}
    .af-card h3{margin:0 0 12px 0; font-size:16px}
    .af-drop{border:2px dashed #d1d9e6; border-radius:12px; min-height:160px; display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; padding:16px; color:#475569}
    .af-drop small{color:#94a3b8}
    .af-btn{border:0; border-radius:12px; padding:12px 14px; font-weight:700; cursor:pointer}
    .af-btn-primary{background:var(--primary); color:#fff; width:100%}
    .af-btn-primary:hover{background:var(--primary-700)}
    .af-btn-outline{background:#eef6ff; color:#1e88e5; border:1px solid #cfe1ff; width:100%}
    .af-btn-outline:hover{background:#e4f0ff}
    .af-form{display:grid; grid-template-columns:1fr 1fr; gap:12px}
    .af-field{display:flex; flex-direction:column}
    .af-label{font-size:12px; color:#475569; font-weight:700}
    .af-input{margin-top:6px; height:42px; border:1px solid var(--border); border-radius:12px; padding:0 12px; font-size:14px; outline:none}
    .af-input:focus{border-color:#cbd5e1; box-shadow:0 0 0 3px #e0f2fe}
    .af-card-head{display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--border)}
    .af-card-head h4{margin:0; font-size:15px}
    .af-tools{display:flex; align-items:center; gap:10px}
    .af-search{display:flex; align-items:center; border:1px solid var(--border); border-radius:10px; padding:8px 10px; background:#fff}
    .af-search input{border:0; outline:none; font-size:14px; margin-left:6px; width:220px}
    .af-table-wrap{overflow:auto; max-height:420px}
    table.af-table{width:100%; border-collapse:separate; border-spacing:0}
    .af-table thead th{position:sticky; top:0; background:#f8fafc; border-bottom:1px solid var(--border); text-align:left; font-size:12px; letter-spacing:.04em; color:#6b7280; padding:12px}
    .af-table tbody td{padding:14px 12px; border-bottom:1px solid #f1f5f9; font-size:14px; color:#0f172a; vertical-align:middle}
    .af-row:hover{background:#fbfdff}
    .cell-trunc{max-width:420px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
    .af-foot{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; color:#64748b; font-size:13px}
    .af-pager button{border:1px solid var(--border); background:#fff; border-radius:8px; padding:6px 10px; margin-left:6px; cursor:pointer}
    .af-pager button:disabled{opacity:.5; cursor:not-allowed}
    .af-footer{padding:22px 0; text-align:center; color:#94a3b8; font-size:12px}
    .af-badge-nov{ display:inline-flex; align-items:center; justify-content:center; min-width:28px; height:24px; padding:0 10px; border-radius:999px; font-size:12px; font-weight:700; border:1px solid transparent; }
    .af-badge-nov.neutral{ background:#f1f5f9; color:#475569; }
    .af-badge-nov.danger{ background:#fef2f2; color:#b91c1c; }
  `;

  return (
    <div className="af-app">
      <style>{styles}</style>
      <header className="af-topbar">
        <div className="af-brand">AsisFact</div>
        <nav className="af-topnav">
          <a href="#inicio">Inicio</a>
          <a href="#asistencia" className="active">
            Asistencia
          </a>
          <a href="#facturacion">Facturación</a>
          <a href="#reportes">Reportes</a>
          <a
            href="#bell"
            aria-label="Notificaciones"
            style={{ marginLeft: 10 }}
          >
            <Icon.bell />
          </a>
        </nav>
      </header>

      <div className="af-body">
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

        <main className="af-main">
          <h1 className="af-title">Subida de Datos / Base de Datos</h1>

          <div className="af-grid">
            <div className="af-card">
              <h3>Subir Datos de Asistencia</h3>
              <div className="af-drop">
                <div style={{ marginBottom: 8, color: "#94a3b8" }}>
                  <Icon.upload />
                </div>
                <div>Click para subir o arrastra y suelta</div>
                <small>CSV (MAX. 5MB)</small>
              </div>
              <div style={{ marginTop: 12 }}>
                <button
                  className="af-btn af-btn-primary"
                  onClick={handleSubir}
                  disabled={
                    loadingImport || loadingExtract || rows.length === 0
                  }
                >
                  {loadingImport ? "Procesando..." : "Cargar a base de datos"}
                </button>
              </div>
            </div>

            <div className="af-card">
              <h3>Registrar Asistencia Manualmente</h3>
              <div className="af-form">
                <div className="af-field">
                  <label className="af-label">Nombre del Empleado</label>
                  <input
                    className="af-input"
                    placeholder="Ej. Nombre Apellido"
                  />
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
          </div>

          <div className="af-card" style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
              }}
            >
              <input
                className="af-input"
                placeholder="Pega el link público del Excel (Google Sheets publicado .xlsx)"
                value={sheetLink}
                onChange={(e) => setSheetLink(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="af-btn af-btn-outline"
                  onClick={handleExtraer}
                  disabled={loadingExtract || loadingImport}
                >
                  {loadingExtract ? "Extrayendo..." : "Extraer datos"}
                </button>

                <button className="af-btn af-btn-outline" onClick={exportCSV}>
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

          <div className="af-card" style={{ padding: 0 }}>
            <div className="af-card-head">
              <h4>Datos Subidos</h4>
              <div className="af-tools">
                <div className="af-search">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    style={{ color: "#94a3b8" }}
                  >
                    <path
                      fill="currentColor"
                      d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
                    />
                  </svg>
                  <input
                    placeholder="Buscar por nombre, código, documento…"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
                <button className="af-btn af-btn-outline" onClick={exportCSV}>
                  Exportar CSV
                </button>
              </div>
            </div>

            <div className="af-table-wrap">
              <table className="af-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: 70 }}>HORA</th>
                    <th style={{ minWidth: 110 }}>FECHA</th>
                    <th style={{ minWidth: 360 }}>NUMERO CEL</th>
                    <th style={{ minWidth: 220 }}>NOMBRE</th>
                    <th style={{ minWidth: 140 }}>DOCUMENTO</th>
                    <th style={{ minWidth: 100 }}>NOVEDAD</th>
                    <th style={{ minWidth: 260 }}>CODIGO</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "28px",
                          color: "#64748b",
                        }}
                      >
                        No hay datos — pulsa <strong>Extraer datos</strong>
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((r, i) => (
                      <tr key={i} className="af-row">
                        <td>{r.hora}</td>
                        <td>{r.fecha}</td>
                        <td>
                          <div className="cell-trunc" title={r.numeroCel}>
                            {r.numeroCel || "-"}
                          </div>
                        </td>
                        <td>
                          <div
                            className="cell-trunc"
                            title={r.nombre}
                            style={{ maxWidth: 220 }}
                          >
                            {r.nombre}
                          </div>
                        </td>
                        <td>{r.documento}</td>
                        <td>
                          <BadgeNovedad value={r.novedad} />
                        </td>
                        <td>
                          <div className="cell-trunc" title={r.codigo}>
                            {r.codigo || "-"}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="af-foot">
              <div>
                Mostrando{" "}
                <strong>
                  {(page - 1) * perPage + (pageRows.length ? 1 : 0)}
                </strong>{" "}
                - <strong>{(page - 1) * perPage + pageRows.length}</strong> de{" "}
                <strong>{filtered.length}</strong>
              </div>
              <div className="af-pager">
                <button onClick={() => setPage(1)} disabled={page === 1}>
                  «
                </button>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹
                </button>
                <button disabled>
                  {" "}
                  Página {page}/{totalPages}{" "}
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          </div>

          <div className="af-footer">
            © 2024 AsisFact. Todos los derechos reservados.
          </div>
        </main>
      </div>
    </div>
  );
};
