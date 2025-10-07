import { normalizeFecha } from "./normalizeFecha";

export const mapFromEngineRow = (r) => ({
  hora: r.HORA ?? r.col1 ?? "",
  fecha: normalizeFecha(r.FECHA ?? r.col2 ?? ""),
  numeroCel: r["NUMERO CEL"] ?? r.NUMERO_CEL ?? r.col3 ?? "",
  nombre: r.NOMBRE ?? r.col4 ?? "",
  documento: r.DOCUMENTO ?? r.col5 ?? "",
  novedad: r.NOVEDAD ?? r.col6 ?? "",
  codigo: r.CODIGO ?? r.col7 ?? "",
});
