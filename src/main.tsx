import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import DatabasePage from "./pages/Database";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        <BrowserRouter>
          {/* navbar stays outside the routes to show it on all pages */}
          <Navbar />

          {/* here are all the routes/pages of the application */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* :gameId is a dynamic parameter we can read from the component */}
            {/* this allows us to use this one page for all kinds of games */}
            <Route path="/game/:gameId" element={<GameDetailsPage />} />
            {/* database page */}
            <Route path="/database" element={<DatabasePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
