export const normalizeFecha = (v) => {
  if (!v) return "";
  const s = String(v);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/); // "2025-08-01 00:00:00" -> "2025-08-01"
  return m ? m[1] : s;
};
