import React from "react";
import { BadgeNovedad } from "./BadgeNovedad";
import { Pagination } from "./Pagination";

export const DataTable = ({
  q,
  setQ,
  onExport,
  pageRows,
  page,
  setPage,
  perPage,
  totalPages,
  filteredCount,
}) => (
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
        <button className="af-btn af-btn-outline" onClick={onExport}>
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

    <Pagination
      page={page}
      setPage={setPage}
      perPage={perPage}
      pageRowsLength={pageRows.length}
      totalPages={totalPages}
      filteredCount={filteredCount}
    />
  </div>
);
