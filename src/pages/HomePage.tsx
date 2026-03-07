import {
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GamePreview from "../components/chessboards/GamePreview";
import { useState } from "react";
import useAllLiveGames, {
  type AllLiveGamesResponse,
} from "../hooks/useAllLiveGames";

export default function HomePage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [gameType, setGameType] = useState("live");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newGameType: string,
  ) => {
    setGameType(newGameType);
  };

  const {
    data: liveGames,
    isLoading: liveGamesLoading,
    isError: liveGamesError,
  } = useAllLiveGames();

  return (
    <div
      className={
        isDesktop ? "desktop-margins centered" : "mobile-margins centered"
      }
      style={isDesktop ? { maxWidth: "800px" } : {}}
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
          value="players"
          sx={{
            borderRadius: 100,
            fontSize: "0.8rem",
          }}
        >
          Nylig spilte partier
        </ToggleButton>
      </ToggleButtonGroup>

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
        {liveGamesLoading && (
          <GamePreview
            gameId=""
            fen=""
            blackPlayerName=""
            blackPlayerTime=""
            whitePlayerName=""
            whitePlayerTime=""
            loading={true}
          />
        )}

        {liveGamesError && (
          <Alert severity="warning">
            Klarte ikke hente partier. Prøv igjen senere.
          </Alert>
        )}

        {liveGames?.length === 0 ? (
          // <Typography variant="body2">
          //   Det finnes for øyeblikket ingen aktive partier.
          // </Typography>
          <Alert severity="info">
            Det finnes for øyeblikket ingen pågående partier.
          </Alert>
        ) : (
          liveGames?.map((game: AllLiveGamesResponse) => (
            <GamePreview
              gameId={game.board_id.toString()}
              fen={game.fen}
              blackPlayerName={game.black_player_name}
              whitePlayerName={game.white_player_name}
              blackPlayerTime={game.black_time}
              whitePlayerTime={game.white_time}
            />
          ))
        )}
      </div>
    </div>
  );
}
