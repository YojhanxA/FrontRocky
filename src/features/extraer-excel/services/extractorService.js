import { API_BASE } from "./config";

export async function previewSheet(sheetLink) {
  const qs = new URLSearchParams({
    url: sheetLink,
    onlyNumericSheets: "true",
  });
  const res = await fetch(`${API_BASE}/preview?${qs.toString()}`, {
    method: "GET",
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data?.message || data?.error || res.statusText);
  return data; // { rows, sheets_processed, sheets_total, ... }
}

export async function importRowsToDb(engineRows) {
  const res = await fetch(`${API_BASE}/import/rows`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(engineRows),
  });
  const txt = await res.text();
  const data = txt ? JSON.parse(txt) : {};
  if (!res.ok) throw new Error(data?.message || data?.error || res.statusText);
  return data; // { inserted, received_rows, ... }
}
