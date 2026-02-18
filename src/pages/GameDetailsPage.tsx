import {
  Button,
  ButtonGroup,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import { useStockfish } from "../hooks/useStockfish";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

// example PGN for testing
const SAMPLE_PGN = `
[Event "casual correspondence game"]
[Site "https://lichess.org/bYQcuyrd"]
[Date "2026.02.15"]
[Round "-"]
[White "lichess AI level 4"]
[Black "Hermzy"]
[Result "0-1"]
[GameId "bYQcuyrd"]
[UTCDate "2026.02.15"]
[UTCTime "13:39:11"]
[WhiteElo "?"]
[BlackElo "1500"]
[Variant "Standard"]
[TimeControl "-"]
[ECO "B12"]
[Opening "Caro-Kann Defense"]
[Termination "Normal"]
[Annotator "lichess.org"]

1. e4 c6 2. d4 d5 { B12 Caro-Kann Defense } 3. Bd3 dxe4 4. Bxe4 Nf6 5. Bf3 Bf5 6. c3 e6 7. Bf4 Bd6 8. Ne2 O-O 9. Bxd6 Qxd6 10. Na3 Bg4 11. Nc4 Qc7 12. Nd2 Nbd7 13. O-O Rfe8 14. Ng3 e5 15. Bxg4 Nxg4 16. Nf5 Ndf6 17. f3 Nxh2 18. Kxh2 exd4+ 19. f4 dxc3 20. bxc3 Rad8 21. Qc2 Ng4+ 22. Kg3 Ne3 23. Nxe3 Rxe3+ 24. Kh2 Re2 25. Qe4 Rxe4 26. Nxe4 Re8 27. Nd2 g5 28. Nc4 gxf4 29. Rae1 Rxe1 30. Rxe1 f3+ 31. Re5 f6 32. gxf3 fxe5 33. Ne3 e4+ 34. Kh1 exf3 35. Ng4 Qf4 36. Nf2 Qh4+ 37. Kg1 Qg3+ 38. Kf1 Qg2+ 39. Ke1 Qg1+ 40. Kd2 Qxf2+ 41. Kc1 Qe1+ 42. Kb2 f2 43. Kc2 f1=Q 44. Kb3 Qb1+ 45. Ka3 Qa6# { Black wins by checkmate. } 0-1
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
  const currentTurn = currentFen.split(" ")[1]; // "w" or "b"

  // handle move and button clicks
  const handleNext = () =>
    setCurrentMoveIndex((prev) => Math.min(prev + 1, history.length - 1));
  const handlePrev = () =>
    setCurrentMoveIndex((prev) => Math.max(prev - 1, -1));
  const handleStart = () => setCurrentMoveIndex(-1);
  const handleEnd = () => setCurrentMoveIndex(history.length - 1);
  const handleMoveClick = (index: number) => setCurrentMoveIndex(index);

  // fetch stockfish data
  const { data: stockfishData, isLoading } = useStockfish(currentFen);

  return (
    <div
      style={{
        marginLeft: isDesktop ? "13rem" : "0px",
        marginBottom: isDesktop ? "0" : "64px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: isDesktop ? "100dvh" : "auto",
        boxSizing: "border-box",
      }}
    >
      <Topbar title="Sjakk-VM runde 1" route="/" />

      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "0.5rem",
          height: isDesktop ? "100%" : "auto",
          overflow: "hidden",
        }}
      >
        {/* left column */}
        <div
          style={{
            flex: isDesktop ? "2" : "none",
            height: "100%",
          }}
        >
          <GameView
            fen={currentFen}
            whitePlayerName="Dennis Johansen"
            whitePlayerTime="10:00"
            blackPlayerName="Herman Lundby-Holen"
            blackPlayerTime="10:00"
            status={
              currentMoveIndex === -1
                ? "PENDING"
                : currentTurn === "w"
                  ? "WHITE_TO_MOVE"
                  : "BLACK_TO_MOVE"
            }
            stockfishData={stockfishData}
          />
        </div>

        {/* right column */}
        <div
          style={{
            flex: isDesktop ? "1" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            height: "100%",
          }}
        >
          <ButtonGroup
            variant="contained"
            disableElevation
            aria-label="Buttons for going backwards and forwards in the game"
            fullWidth
            sx={{
              order: isDesktop ? "3" : "1",
              flexShrink: 0,
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
              padding: "0.5rem 1rem",
              backgroundColor: theme.palette.primary.dark,
              borderRadius: "16px",
              color: theme.palette.text.secondary,
              order: isDesktop ? "1" : "2",
              flexShrink: 0,
            }}
          >
            <h3 style={{ margin: 0 }}>Stockfish anbefaler:</h3>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Move and Evaluation */}
                <span>{stockfishData.san}</span>
                <span>
                  {stockfishData.eval > 0 ? "+" : ""}
                  {stockfishData.eval}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              order: isDesktop ? "2" : "3",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
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
