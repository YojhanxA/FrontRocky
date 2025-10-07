// src/pages/ExtraerExcel.jsx
import React, { useMemo, useState } from "react";
import { UploadCard } from "../features/extraer-excel/components/UploadCard";
import { ManualFormCard } from "../features/extraer-excel/components/ManualFormCard";
import { SheetLinkBar } from "../features/extraer-excel/components/SheetLinkBar";
import { DataTable } from "../features/extraer-excel/components/DataTable";
import { SAMPLE } from "../features/extraer-excel/data/sample";
import { mapFromEngineRow } from "../features/extraer-excel/utils/mapFromEngineRow";
import { exportCSV } from "../features/extraer-excel/utils/exportCSV";
import {
  previewSheet,
  importRowsToDb,
} from "../features/extraer-excel/services/extractorService";

export const ExtraerExcel = () => {
  const [sheetLink, setSheetLink] = useState("");
  const [rows, setRows] = useState(SAMPLE);
  const [engineRows, setEngineRows] = useState([]);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
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

  const handleExtraer = async () => {
    if (!sheetLink.trim()) {
      setMsg("⚠️ Pega primero el link público del Excel.");
      return;
    }
    setMsg(null);
    setLoadingExtract(true);
    try {
      const data = await previewSheet(sheetLink);
      const mapped = (data.rows || []).map(mapFromEngineRow);
      setRows(mapped);
      setEngineRows(data.rows || []);
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

  const handleSubir = async () => {
    if (!sheetLink.trim()) {
      setMsg("⚠️ Pega el link primero.");
      return;
    }
    if (!engineRows.length) {
      setMsg("⚠️ Primero pulsa 'Extraer datos'.");
      return;
    }
    setMsg(null);
    setLoadingImport(true);
    try {
      const data = await importRowsToDb(engineRows);
      setMsg(
        `✅ Insertados: ${data.inserted} (recibidos ${data.received_rows}).`
      );
    } catch (e) {
      setMsg(`❌ Error al subir: ${e.message || e}`);
    } finally {
      setLoadingImport(false);
    }
  };

  const onExportCSV = () => exportCSV(filtered);

  return (
    <>
      <h1 className="af-title">Subida de Datos / Base de Datos</h1>

      <div className="af-grid">
        <UploadCard
          onUpload={handleSubir}
          disabled={loadingImport || loadingExtract || rows.length === 0}
          loadingImport={loadingImport}
          loadingExtract={loadingExtract}
          rowsLength={rows.length}
        />
        <ManualFormCard />
      </div>

      <SheetLinkBar
        sheetLink={sheetLink}
        onChange={setSheetLink}
        onExtract={handleExtraer}
        onExport={onExportCSV}
        loadingExtract={loadingExtract}
        loadingImport={loadingImport}
        msg={msg}
      />

      <DataTable
        q={q}
        setQ={setQ}
        onExport={onExportCSV}
        pageRows={pageRows}
        page={page}
        setPage={setPage}
        perPage={perPage}
        totalPages={totalPages}
        filteredCount={filtered.length}
      />
    </>
  );
};
