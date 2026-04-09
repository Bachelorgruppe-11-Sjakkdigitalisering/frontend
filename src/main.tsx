import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import GameDetailsPage from "./pages/game-details/GameDetailsPage";
import DatabasePage from "./pages/database/DatabasePage";
import PlayerPage from "./pages/player/PlayerPage";

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
            {/* home page */}
            <Route path="/" element={<HomePage />} />
            {/* game page for both live and archived games */}
            <Route
              path="/live/:gameId"
              element={<GameDetailsPage isLive={true} />}
            />
            <Route
              path="/archive/:gameId"
              element={<GameDetailsPage isLive={false} />}
            />
            {/* player page */}
            <Route path="/player/:playerId" element={<PlayerPage />} />
            {/* database page */}
            <Route path="/database" element={<DatabasePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
