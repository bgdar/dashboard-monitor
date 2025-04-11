import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SistemProvider } from "./sistemContextManagement/sistemContext.jsx";
import { JsonProvider } from "./sistemContextManagement/jsonContext.jsx";

createRoot(document.getElementById("main")).render(
  <StrictMode>
    {/* urutan setiap provider menjadi masalah jika provider di bawah perlu data dari provider di atas */}
    <SistemProvider>
      <JsonProvider>
        <App />
      </JsonProvider>
    </SistemProvider>
  </StrictMode>
);
