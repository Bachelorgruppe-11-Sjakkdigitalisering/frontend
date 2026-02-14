import { Button, ButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import Topbar from "../components/topbar/Topbar";
import GameView from "../components/chessboards/GameView";
import {
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";

export default function GameDetailsPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div
      style={{
        marginLeft: isDesktop ? "13rem" : "0px",
        marginBottom: isDesktop ? "0" : "64px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Topbar title="Sjakk-VM runde 1" route="/" />
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "0.5rem",
        }}
      >
        <GameView
          fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
          whitePlayerName="Dennis Johansen"
          whitePlayerTime="10:00"
          blackPlayerName="Herman Lundby-Holen"
          blackPlayerTime="10:00"
          status="PENDING"
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <ButtonGroup
            variant="contained"
            disableElevation
            aria-label="Buttons for going backwards and forwards in the game"
            sx={{
              display: "flex",
              justifyContent: "center",
              order: isDesktop ? "3" : "1",
            }}
          >
            <Button>
              <FastRewind />
            </Button>

            <Button>
              <SkipPrevious />
            </Button>

            <Button>
              <SkipNext />
            </Button>

            <Button>
              <FastForward />
            </Button>
          </ButtonGroup>

          <div
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "16px",
              color: theme.palette.text.secondary,
              order: isDesktop ? "1" : "2",
            }}
          >
            <h3 style={{ margin: 0 }}>Stockfish anbefaler:</h3>
            <p style={{ margin: 0 }}>+0.2 3.Nc3 d5</p>
            <p style={{ margin: 0 }}>+0.2 3.Nc3 d5</p>
          </div>

          <div
            style={{
              order: isDesktop ? "2" : "3",
              height: "100%",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.secondary,
              borderRadius: "16px",
              padding: "0.5rem 1rem",
            }}
          >
            <p style={{ margin: 0 }}>1. e4 e5</p>
            <p style={{ margin: 0 }}>2. d4 d5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
