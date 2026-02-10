import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChessboardView from "./components/Chessboard";
import { appTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <ChessboardView />
      <Navbar />
    </ThemeProvider>
  </StrictMode>,
);
