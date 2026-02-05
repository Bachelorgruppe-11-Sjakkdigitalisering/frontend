import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chessboard from "./Chessboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Chessboard />
  </StrictMode>,
);
