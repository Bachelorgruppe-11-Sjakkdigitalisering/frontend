import {
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GamePreview from "../components/chessboards/GamePreview";
import { useState } from "react";

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

  return (
    <div className={isDesktop ? "desktop-margins" : "mobile-margins centered"}>
      {/* logo */}
      <div>
        <h1>LOGO</h1>
      </div>

      {/* switch between live games and newly played games */}
      {!isDesktop && (
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
      )}

      {/* game previews */}
      <GamePreview
        gameId="1"
        fen="rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14"
        player1Name="Herman Lundby-Holen"
        player1Time="00:23"
        player2Name="Dennis Johansen"
        player2Time="00:14"
      />
      <GamePreview
        gameId="1"
        fen="rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14"
        player1Name="Herman Lundby-Holen"
        player1Time="00:23"
        player2Name="Dennis Johansen"
        player2Time="00:14"
      />
      <GamePreview
        gameId="1"
        fen="rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14"
        player1Name="Herman Lundby-Holen"
        player1Time="00:23"
        player2Name="Dennis Johansen"
        player2Time="00:14"
      />
    </div>
  );
}
