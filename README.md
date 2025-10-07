# Secure Sheets Frontend (React + Vite)

UI para conectarse al backend **secure-sheets-backend** (Google Sheets API con Service Account).

## Uso
1) Inicia el backend (Java):
```bash
mvn spring-boot:run
# por defecto: http://localhost:8080
```
2) Inicia el frontend:
```bash
npm install
npm run dev
# abre http://localhost:5173
```
3) En la UI:
- Base URL: `http://localhost:8080`
- Token: el que configuraste (por defecto `supersecreto`)
- Modo: `sheetId` ó `folderId`.
- Range por defecto: `Hoja1!A1:Z`
- Tamaño de página: 50

> La app intentará llamar a **/api/preview-paged** (si existe). Si ese endpoint no está en tu backend, cae automáticamente a **/api/preview** y desactiva la paginación.

## Habilitar /api/preview-paged (opcional)
Para paginado real en backend, agrega `limit` y `offset` al request y crea el endpoint `/api/preview-paged`:

### `PreviewRequest.java` (añade campos)
```java
private Integer limit;
private Integer offset;
```
### `PreviewController.java` (nuevo endpoint)
```java
@PostMapping("/preview-paged")
public ResponseEntity<PreviewResponse> previewPaged(@RequestBody PreviewRequest req) { 
  // igual a /api/preview pero tomando limit/offset del request
}
```
