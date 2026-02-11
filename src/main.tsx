import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/navbar/Navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Navbar />
    </ThemeProvider>
  </StrictMode>,
);
