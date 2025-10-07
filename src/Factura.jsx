import React from "react";

/**
 * FacturacionExcelPreview.jsx
 * UI estática y de muestra (sin lógica, sin estado).
 * Basado en tus pestañas FACTURA y FACTURA_SEDE de "REGISTRO AGOSTO 2025".
 */

const MES_LABEL = "AGOSTO 2025";

// === MUESTRAS por SEDE (nombres y códigos reales del Excel) ===
// SEC, SEDE, #OP, DÍAS, DOMINGO + tarifas/total de ejemplo (estáticos).
const SEDES_SAMPLE = [
  {
    sec: "SS",
    sede: "ARCHIGENERALSANBENITO",
    op: 1,
    dias: 21,
    domingo: "SS",
    tarifa: 120000,
    total: 2520000,
  },
  {
    sec: "SS",
    sede: "ARCHIGENERALSANBENITO",
    op: 2,
    dias: 21,
    domingo: "",
    tarifa: 120000,
    total: 5040000,
  },
  {
    sec: "SS",
    sede: "BODEGAPBELEN",
    op: 1,
    dias: 21,
    domingo: "CC",
    tarifa: 120000,
    total: 2520000,
  },
  {
    sec: "SS",
    sede: "BOMBEROS12DEOCTUBRE",
    op: 1,
    dias: 21,
    domingo: "MA",
    tarifa: 120000,
    total: 2520000,
  },
  {
    sec: "SS",
    sede: "BOMBEROSANANTONIO",
    op: 1,
    dias: 22,
    domingo: "SG",
    tarifa: 120000,
    total: 2640000,
  },
  {
    sec: "SS",
    sede: "BOMBEROSBUENOSAIRES",
    op: 1,
    dias: 22,
    domingo: "NV",
    tarifa: 120000,
    total: 2640000,
  },
  {
    sec: "SS",
    sede: "BOMBEROSCAMPOVALDES",
    op: 1,
    dias: 22,
    domingo: "SP",
    tarifa: 120000,
    total: 2640000,
  },
  {
    sec: "SS",
    sede: "BOMBEROSCARIBE",
    op: 1,
    dias: 21,
    domingo: "",
    tarifa: 120000,
    total: 2520000,
  },
];

// === MUESTRAS por OPERARIO (cedulas y sedes reales del Excel) ===
// Cédula, Sede, DÍAS MES, DOMINGO (código). Todo estático.
const OPERARIOS_SAMPLE = [
  {
    cedula: "43595257",
    sede: "CC_ARCHIVOHISTORICO-MARLENY-VELEZ-SUPER3-LS",
    dias: 30,
    domingo: "SS",
  },
  {
    cedula: "1128478422",
    sede: "CC_B50PALMITAS-YULI-MUÑOZ-SUPER6-LS",
    dias: 30,
    domingo: "CC",
  },
  {
    cedula: "1017124493",
    sede: "CC_B70ALTAVISTA-OLGA-TABORDA-SUPER6-LS",
    dias: 30,
    domingo: "MA",
  },
  {
    cedula: "1128435650",
    sede: "CC_B90SANTAELENA-YUDI-AGUIRRE-SUPER6-LS",
    dias: 30,
    domingo: "SG",
  },
  {
    cedula: "30322213",
    sede: "CC_BAVILA-ROCIO-GUTIERREZ-SUPER3-LS",
    dias: 30,
    domingo: "NV",
  },
  {
    cedula: "43142253",
    sede: "CC_BCOCCIDENTAL-SONIA-HURTADO-SUPER5-LS",
    dias: 30,
    domingo: "SP",
  },
  {
    cedula: "50996080",
    sede: "CC_BGRANIZAL-MERCEDES-DIAZ-SUPER1-LV",
    dias: 30,
    domingo: "SUMINISTROS",
  },
  {
    cedula: "43321990",
    sede: "CC_BLIMONAR-MARIA-ARTEAGA-SUPER6-LS",
    dias: 16,
    domingo: "PALTURAS",
  },
];

// === Helpers SOLO para formateo visual (no hay lógica de negocio) ===
const fmtCOP = (n) =>
  (n ?? 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

const codeToClass = (c) => `tag-${String(c || "none").toLowerCase()}`;

export const Factura = () => {
  const styles = `
    .hero-grad { background: linear-gradient(90deg, #5a30c2 0%, #0b6bff 100%); color: #fff; border-radius: 12px; }
    .card-pro { border-radius: 12px; box-shadow: 0 8px 24px rgba(15,23,42,0.06); }
    .btn-pill { border-radius: 999px; }
    .kpi-card { border-radius: 14px; }
    .table-pro thead th { border-bottom: 1px solid rgba(0,0,0,.06); font-size: .9rem; }
    .table-pro tbody td { vertical-align: middle; font-size: .95rem; }
    .truncate { max-width: 460px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; }
    @media (max-width: 992px) { .truncate { max-width: 260px; } }

    /* Chips suaves para DOMINGO */
    .badge-soft { padding: .35rem .6rem; border-radius: 999px; font-weight: 600; }
    .tag-ss  { background: rgba(13,110,253,.12); color: #0d6efd; }        /* SS  */
    .tag-cc  { background: rgba(255,193,7,.18); color: #b58100; }         /* CC  */
    .tag-ma  { background: rgba(25,135,84,.12); color: #198754; }         /* MA  */
    .tag-sg  { background: rgba(108,117,125,.18); color: #6c757d; }       /* SG  */
    .tag-nv  { background: rgba(220,53,69,.12); color: #dc3545; }         /* NV  */
    .tag-sp  { background: rgba(13,202,240,.15); color: #0aa2c0; }        /* SP  */
    .tag-suministros { background: rgba(111,66,193,.15); color: #6f42c1; }/* SUMINISTROS */
    .tag-palturas    { background: rgba(102,16,242,.15); color: #6610f2; }/* PALTURAS    */
    .tag-none { background: rgba(33,37,41,.08); color: #212529; }         /* vacío */
  `;

  return (
    <div className="container my-4">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="card card-pro overflow-hidden mb-3">
        <div className="p-4 hero-grad d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h3 className="mb-1">Facturación · {MES_LABEL}</h3>
            <small className="opacity-75">
              Vista de ejemplo (UI estática) basada en FACTURA y FACTURA_SEDE
            </small>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light btn-sm btn-pill"
              disabled
              title="Solo UI"
            >
              <i className="bi bi-google me-1"></i> Cargar desde Sheet
            </button>
            <button
              className="btn btn-outline-light btn-sm btn-pill"
              disabled
              title="Solo UI"
            >
              <i className="bi bi-cloud-arrow-down me-1"></i> Sync backend
            </button>
          </div>
        </div>

        {/* KPIs (muestra) */}
        <div className="p-3">
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="card kpi-card shadow-sm">
                <div className="card-body">
                  <div className="text-muted small">Total facturado</div>
                  <div className="fs-5 fw-bold">{fmtCOP(10752000)}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card kpi-card shadow-sm">
                <div className="card-body">
                  <div className="text-muted small">Sedes activas</div>
                  <div className="fs-5 fw-bold">8</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card kpi-card shadow-sm">
                <div className="card-body">
                  <div className="text-muted small">Operarios</div>
                  <div className="fs-5 fw-bold">8</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card kpi-card shadow-sm">
                <div className="card-body">
                  <div className="text-muted small">Días promedio</div>
                  <div className="fs-5 fw-bold">≈ 22</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA: POR SEDE */}
        <div className="px-3 pb-3">
          <h5 className="mb-2">Por sede</h5>
          <div className="table-responsive" style={{ maxHeight: 420 }}>
            <table className="table table-hover mb-0 table-pro align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: 90 }}>SEC</th>
                  <th style={{ minWidth: 200 }}>SEDE</th>
                  <th style={{ minWidth: 90 }} className="text-center">
                    #OP
                  </th>
                  <th style={{ minWidth: 110 }} className="text-center">
                    DÍAS
                  </th>
                  <th style={{ minWidth: 140 }}>DOMINGO</th>
                  <th style={{ minWidth: 130 }} className="text-end">
                    TARIFA
                  </th>
                  <th style={{ minWidth: 140 }} className="text-end">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {SEDES_SAMPLE.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span className="badge-soft tag-none">{r.sec}</span>
                    </td>
                    <td className="truncate" title={r.sede}>
                      {r.sede}
                    </td>
                    <td className="text-center">{r.op}</td>
                    <td className="text-center">{r.dias}</td>
                    <td>
                      <span className={`badge-soft ${codeToClass(r.domingo)}`}>
                        {r.domingo || "—"}
                      </span>
                    </td>
                    <td className="text-end">{fmtCOP(r.tarifa)}</td>
                    <td className="text-end">{fmtCOP(r.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA: POR OPERARIO */}
        <div className="px-3 pb-4">
          <h5 className="mb-2">Por operario</h5>
          <div className="table-responsive" style={{ maxHeight: 420 }}>
            <table className="table table-hover mb-0 table-pro align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: 140 }}>CÉDULA</th>
                  <th style={{ minWidth: 320 }}>SEDE</th>
                  <th style={{ minWidth: 120 }} className="text-center">
                    DÍAS MES
                  </th>
                  <th style={{ minWidth: 140 }}>DOMINGO</th>
                </tr>
              </thead>
              <tbody>
                {OPERARIOS_SAMPLE.map((r) => (
                  <tr key={r.cedula}>
                    <td>{r.cedula}</td>
                    <td className="truncate" title={r.sede}>
                      {r.sede}
                    </td>
                    <td className="text-center">{r.dias}</td>
                    <td>
                      <span className={`badge-soft ${codeToClass(r.domingo)}`}>
                        {r.domingo || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación (decorativa) */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Mostrando <strong>1</strong> -{" "}
              <strong>{OPERARIOS_SAMPLE.length}</strong> de{" "}
              <strong>{OPERARIOS_SAMPLE.length}</strong>
            </small>
            <div className="btn-group">
              <button className="btn btn-outline-secondary btn-sm" disabled>
                <i className="bi bi-chevron-double-left"></i>
              </button>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn btn-outline-secondary btn-sm disabled">
                Página 1/1
              </button>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                <i className="bi bi-chevron-right"></i>
              </button>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                <i className="bi bi-chevron-double-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
