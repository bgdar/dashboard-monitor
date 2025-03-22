import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SistemProvider } from "./sistem/sistemContext.jsx";

createRoot(document.getElementById("main")).render(
  <StrictMode>
    <SistemProvider>
      <App />
    </SistemProvider>
  </StrictMode>
);
