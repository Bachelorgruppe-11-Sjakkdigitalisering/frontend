import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../../main.css";
import { CopyAll } from "@mui/icons-material";
import GameCard from "../../components/game-card/GameCard";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router";
import { usePlayerGames, usePlayerProfile } from "../../hooks/usePlayer";
import PlayerStats from "../../components/player-stats/PlayerStats";
import { useState } from "react";
import type { ArchivedGame } from "../../types";

export default function PlayerPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // get player id from parameter
  const { playerId } = useParams<{ playerId: string }>();

  // fetch data
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = usePlayerProfile(playerId);
  const {
    data: gamesData,
    isLoading: gamesLoading,
    isError: gamesError,
  } = usePlayerGames(playerId);

  const isLoading = profileLoading || gamesLoading;
  const isError = profileError || gamesError;

  const [copyPlayerIdSuccess, setCopyPlayerIdSuccess] = useState(false);

  /**
   * Copies the player's id to the clipboard.
   */
  const handleCopyPlayerId = () => {
    if (profileData) {
      navigator.clipboard.writeText(`${profileData.player.id}`);
      setCopyPlayerIdSuccess(true);
      setTimeout(() => {
        setCopyPlayerIdSuccess(false);
      }, 5000);
    }
  };

  return (
    <div
      className={isDesktop ? "desktop-margins" : "mobile-margins"}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto 64px auto",
        gap: "0.5em",
        maxWidth: "800px",
      }}
    >
      {/* top bar */}
      <Topbar title="Spillerprofil" route="/database" />

      {/* loading and error states */}
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Kunne ikke hente spillerdata.</Alert>}

      {/* player name and stats */}
      {!isLoading && !isError && profileData && gamesData && (
        <div>
          <Avatar />
          <Typography variant="h3">{profileData.player.name}</Typography>
          {/* player id with button to copy */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="subtitle1">
              Spiller ID: #{profileData.player.id}
            </Typography>
            <Button role="copy-button" onClick={handleCopyPlayerId}>
              <CopyAll />
            </Button>
            {copyPlayerIdSuccess && (
              <Alert severity="success">
                Spiller ID: {profileData.player.id}, ble kopiert til
                utklippstavlen!
              </Alert>
            )}
          </div>
          {gamesData?.length > 0 && (
            <PlayerStats
              wins={profileData.stats.wins}
              draws={profileData.stats.draws}
              losses={profileData.stats.losses}
              totalGames={profileData.stats.total_games}
            />
          )}
        </div>
      )}

      {/* game cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {gamesData?.length === 0 ? (
          <Typography variant="body2">
            Ingen partier funnet for denne spilleren.
          </Typography>
        ) : (
          gamesData?.map((game: ArchivedGame) => (
            <GameCard
              key={game.id}
              whiteName={game.white_player_name}
              blackName={game.black_player_name}
              result={game.result}
              gameId={game.id.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
}
