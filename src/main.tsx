import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChessboardView from "./Chessboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChessboardView />
  </StrictMode>,
);
