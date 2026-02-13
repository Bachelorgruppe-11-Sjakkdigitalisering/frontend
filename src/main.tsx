import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Navbar />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
