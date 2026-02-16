import { Button, ButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import Topbar from "../components/topbar/Topbar";
import GameView from "../components/chessboards/GameView";
import {
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import MoveList from "../components/movelist/MoveList";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

// example PGN for testing
const SAMPLE_PGN = `
[Event "FIDE World Cup 2023"]
[White "Carlsen, Magnus"]
[Black "Praggnanandhaa, R"]
1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6 5. a4 d6 6. c3 a6 7. O-O Ba7 8. Re1 O-O 9. Nbd2 Ne7 10. Bb3 Ng6 11. Nc4 c6
`;

export default function GameDetailsPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // state to track the current move index (-1 = start position)
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  // load PGN and parse the history once
  const { history, startFen } = useMemo(() => {
    const game = new Chess();
    game.loadPgn(SAMPLE_PGN); // TODO: load PGN fra backend her i fremtiden

    // extract fen after every move
    const historyWithFens: Array<Move> = [];
    const tempGame = new Chess(); // start fresh

    // get the simple move list
    const moves = game.history();

    moves.forEach((moveSan) => {
      tempGame.move(moveSan);
      historyWithFens.push({
        san: moveSan,
        fen: tempGame.fen(),
        color: tempGame.turn() === "w" ? "b" : "w",
      });
    });

    return {
      history: historyWithFens,
      startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    };
  }, []);

  // determine the fen to display based on the index
  const currentFen =
    currentMoveIndex === -1 ? startFen : history[currentMoveIndex].fen;

  // handle move and button clicks
  const handleNext = () =>
    setCurrentMoveIndex((prev) => Math.min(prev + 1, history.length - 1));
  const handlePrev = () =>
    setCurrentMoveIndex((prev) => Math.max(prev - 1, -1));
  const handleStart = () => setCurrentMoveIndex(-1);
  const handleEnd = () => setCurrentMoveIndex(history.length - 1);
  const handleMoveClick = (index: number) => setCurrentMoveIndex(index);

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
          fen={currentFen}
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
            <Button
              onClick={handleStart}
              style={{ backgroundColor: theme.palette.primary.dark }}
            >
              <FastRewind />
            </Button>

            <Button
              onClick={handlePrev}
              style={{ backgroundColor: theme.palette.primary.dark }}
            >
              <SkipPrevious />
            </Button>

            <Button
              onClick={handleNext}
              style={{ backgroundColor: theme.palette.primary.dark }}
            >
              <SkipNext />
            </Button>

            <Button
              onClick={handleEnd}
              style={{ backgroundColor: theme.palette.primary.dark }}
            >
              <FastForward />
            </Button>
          </ButtonGroup>

          <div
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              backgroundColor: theme.palette.primary.dark,
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
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.text.secondary,
              borderRadius: "16px",
              padding: "0.5rem 1rem",
            }}
          >
            <MoveList
              history={history}
              currentMoveIndex={currentMoveIndex}
              onMoveClick={handleMoveClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
