import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
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
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import useLiveGame from "../hooks/useLiveGame";
import "../main.css";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

export default function GameDetailsPage({
  isLive = false,
}: {
  isLive?: boolean;
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { gameId } = useParams<{ gameId: string }>();
  const {
    data: liveData,
    isLoading: isLiveLoading,
    isError: isLiveError,
  } = useLiveGame(gameId, isLive);
  const {
    data: archiveData,
    isLoading: isArchiveLoading,
    isError: isArchiveError,
  } = useGame(gameId, isLive);

  // merge states based on the mode
  const gameData = isLive ? liveData : archiveData;
  const isGameLoading = isLive ? isLiveLoading : isArchiveLoading;
  const isGameError = isLive ? isLiveError : isArchiveError;

  // state to track the current move index (-1 = start position)
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  // load PGN and parse the history once
  const { history, startFen } = useMemo(() => {
    // if data hasn't loaded yet, return empty defaults
    if (!gameData || !gameData.pgn) {
      return {
        history: [],
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      };
    }

    const game = new Chess();
    game.loadPgn(gameData.pgn);

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
  }, [gameData]); // rerun if game data changes

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

  // loading state
  // TODO: endre dette til skeleton i fremtiden?
  if (isGameLoading) {
    return (
      <div className={isDesktop ? "desktop-margins" : "mobile-margins"}>
        <CircularProgress />
      </div>
    );
  }

  // error handling
  if (isGameError || !gameData) {
    return (
      <div className={isDesktop ? "desktop-margins" : "mobile-margins"}>
        <Alert severity="error">Kunne ikke laste partiet.</Alert>
      </div>
    );
  }

  return (
    <div
      className={isDesktop ? "desktop-margins" : "mobile-margins"}
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: isDesktop ? "100dvh" : "auto",
        boxSizing: "border-box",
      }}
    >
      <Topbar
        title={`${gameData.white_player_name} vs ${gameData.black_player_name}`}
        route="/database"
      />

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
            whitePlayerName={gameData.white_player_name}
            whitePlayerTime="10:00"
            blackPlayerName={gameData.black_player_name}
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
