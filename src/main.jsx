import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";   // ✅ change here if your file is app.css
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
