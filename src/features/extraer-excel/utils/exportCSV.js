export function exportCSV(rows) {
  const csv = [
    ["HORA", "FECHA", "NUMERO CEL", "NOMBRE", "DOCUMENTO", "NOVEDAD", "CODIGO"],
    ...rows.map((r) => [
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
}
