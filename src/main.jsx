import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Factura } from "./Factura";
import { ExtraerExcel } from "./ExtraerExcel";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/excel" element={<ExtraerExcel />} />
        <Route path="/factura" element={<Factura />} />
      </Routes>
    </Router>
  </StrictMode>
);
