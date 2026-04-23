import {
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GamePreview from "../../components/chessboards/GamePreview";
import { useState } from "react";
import useAllLiveGames from "../../hooks/useAllLiveGames";
import { useDatabase } from "../../hooks/useDatabase";
import GameCard from "../../components/game-card/GameCard";
import type { ArchivedGame, LiveGameState } from "../../types";

export default function HomePage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [gameType, setGameType] = useState<"live" | "archive">("live");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newGameType: "live" | "archive",
  ) => {
    if (
      newGameType !== null &&
      (newGameType === "live" || newGameType === "archive")
    ) {
      setGameType(newGameType);
    }
  };

  const {
    data: liveGames,
    isLoading: liveGamesLoading,
    isError: liveGamesError,
  } = useAllLiveGames();

  const {
    data: archivedGames,
    isLoading: archivedGamesLoading,
    isError: archivedGamesError,
  } = useDatabase("");

  const isLoading =
    gameType === "live" ? liveGamesLoading : archivedGamesLoading;
  const isError = gameType === "live" ? liveGamesError : archivedGamesError;

  /**
   * Extratcs whose turn it is from the FEN string
   */
  const getGameStatus = (
    game: LiveGameState,
  ): "WHITE_TO_MOVE" | "BLACK_TO_MOVE" | "PENDING" | "FINISHED" => {
    if (!game.is_active) {
      // If the game isn't active, assume it's finished
      return "FINISHED";
    }

    if (!game.fen) {
      return "PENDING";
    }

    // Split the FEN string by space and grab the second item (index 1)
    const turnIndicator = game.fen.split(" ")[1];

    return turnIndicator === "w" ? "WHITE_TO_MOVE" : "BLACK_TO_MOVE";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        ...(isDesktop
          ? {
              maxWidth: "800px",
              margin: "0 auto",
            }
          : {}),
      }}
      className={
        isDesktop ? "desktop-margins centered" : "mobile-margins centered"
      }
    >
      {/* logo */}
      <div>
        <h1>LOGO</h1>
      </div>

      {/* switch between live games and newly played games */}
      <ToggleButtonGroup
        color="primary"
        aria-label="Velg mellom live parti og tidligere spilte partier"
        value={gameType}
        exclusive
        onChange={handleChange}
        fullWidth={true}
      >
        <ToggleButton
          value="live"
          sx={{
            borderRadius: 100,
            fontSize: "0.8rem",
          }}
        >
          Pågående partier
        </ToggleButton>
        <ToggleButton
          value="archive"
          sx={{
            borderRadius: 100,
            fontSize: "0.8rem",
          }}
        >
          Nylig spilte partier
        </ToggleButton>
      </ToggleButtonGroup>

      {/* loading and error states */}
      {isLoading && <CircularProgress />}

      {isError && (
        <Alert severity="warning">
          Klarte ikke hente partier. Prøv igjen senere.
        </Alert>
      )}

      {/* game previews */}
      <div
        style={
          isDesktop
            ? {
                display: "flex",
                flexWrap: "wrap",
                cursor: "pointer",
                width: "100%",
              }
            : {}
        }
      >
        {gameType === "live" ? (
          <>
            {liveGames?.length === 0 ? (
              <Alert severity="info" sx={{ margin: "0 auto" }}>
                Det finnes for øyeblikket ingen pågående partier.
              </Alert>
            ) : (
              liveGames?.map((game: LiveGameState) => (
                <GamePreview
                  key={game.board_id}
                  gameId={game.board_id.toString()}
                  fen={game.fen}
                  blackPlayerName={game.black_player_name}
                  whitePlayerName={game.white_player_name}
                  blackPlayerTime={game.black_time}
                  whitePlayerTime={game.white_time}
                  status={getGameStatus(game)}
                />
              ))
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
              width: "100%",
            }}
          >
            {archivedGames?.length === 0 ? (
              <Alert severity="info" sx={{ margin: "0 auto" }}>
                Det finnes for øyeblikket ingen tidligere spilte partier.
              </Alert>
            ) : (
              archivedGames?.map((game: ArchivedGame) => (
                <GameCard
                  key={game.id}
                  gameId={game.id.toString()}
                  whiteName={game.white_player_name}
                  blackName={game.black_player_name}
                  result={game.result}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
