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
import type { PieceDropHandlerArgs } from "react-chessboard";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

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

  const [isExploring, setIsExploring] = useState(false); // tracks if the user is exploring a position
  const [customHistory, setCustomHistory] = useState<Move[]>([]);
  const [manualMoveIndex, setManualMoveIndex] = useState<number | null>(
    isLive ? null : 0,
  );

  const { officialHistory, hasPgnError } = useMemo(() => {
    if (!gameData || !gameData.pgn)
      return { officialHistory: [], hasPgnError: false };

    try {
      const game = new Chess();
      game.loadPgn(gameData.pgn);
      const historyWithFens: Array<Move> = [];
      const tempGame = new Chess();

      game.history().forEach((moveSan) => {
        tempGame.move(moveSan);
        historyWithFens.push({
          san: moveSan,
          fen: tempGame.fen(),
          color: tempGame.turn() === "w" ? "b" : "w",
        });
      });

      return { officialHistory: historyWithFens, hasPgnError: false };
    } catch (error) {
      console.error("Feil ved lasting av PGN:", error);
      return { officialHistory: [], hasPgnError: true };
    }
  }, [gameData]);

  const activeHistory = isExploring ? customHistory : officialHistory;
  let currentMoveIndex: number;

  if (isExploring) {
    currentMoveIndex = manualMoveIndex ?? customHistory.length - 1;
  } else if (manualMoveIndex !== null) {
    currentMoveIndex = manualMoveIndex;
  } else {
    currentMoveIndex =
      officialHistory.length > 0 ? officialHistory.length - 1 : -1;
  }

  const currentFen =
    currentMoveIndex === -1
      ? DEFAULT_FEN
      : activeHistory[currentMoveIndex]?.fen || DEFAULT_FEN;
  const currentTurn = currentFen.split(" ")[1];

  const handlePieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!sourceSquare || !targetSquare) return false;

    try {
      const game = new Chess(currentFen);
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move) {
        const newHistory = activeHistory.slice(0, currentMoveIndex + 1);
        newHistory.push({ san: move.san, fen: game.fen(), color: move.color });

        setCustomHistory(newHistory);
        setIsExploring(true);
        setManualMoveIndex(newHistory.length - 1);
        return true;
      }
    } catch (error) {
      console.error("Kunne ikke gjøre trekk:", error);
      return false;
    }
    return false;
  };

  const handleReturnToGame = () => {
    setIsExploring(false);
    setManualMoveIndex(isLive ? null : officialHistory.length - 1);
  };

  // handle move and button clicks
  const handleNext = () =>
    setManualMoveIndex(
      Math.min(currentMoveIndex + 1, activeHistory.length - 1),
    );
  const handlePrev = () =>
    setManualMoveIndex(Math.max(currentMoveIndex - 1, -1));
  const handleStart = () => setManualMoveIndex(-1);
  const handleEnd = () => setManualMoveIndex(activeHistory.length - 1);
  const handleMoveClick = (index: number) => {
    // If they click the very last move of a live game, re-enable auto-sync
    if (isLive && !isExploring && index === officialHistory.length - 1) {
      setManualMoveIndex(null);
    } else {
      setManualMoveIndex(index);
    }
  };

  /**
   * Copies the FEN string of the current position to the user's clipboard.
   */
  const handleCopyFen = () => {
    navigator.clipboard.writeText(currentFen);
  };

  /**
   * Copies the PGN of the game to the user's clipboard.
   */
  const handleCopyPgn = () => {
    navigator.clipboard.writeText(gameData.pgn);
  };

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

      {/* if pgn error, show error message */}
      {hasPgnError && (
        <Alert severity="warning">
          Vi oppdaget et ulovlig trekk eller en feil i PGN-filen for dette
          partiet. <br />
          Partiet kan ikke spilles av.
        </Alert>
      )}

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
            alignContent: "center",
            height: "100%",
            position: "relative",
          }}
        >
          {/* banner and button if user is exploring on their own */}
          {isExploring && (
            <Alert
              severity="info"
              action={
                <Button size="small" onClick={handleReturnToGame}>
                  Tilbake til partiet
                </Button>
              }
              sx={{
                alignItems: "center",
                position: isDesktop ? "absolute" : "relative",
                top: isDesktop ? 0 : "auto",
                left: isDesktop ? 0 : "auto",
                right: isDesktop ? 0 : "auto",
                zIndex: isDesktop ? 10 : "auto",
                mb: isDesktop ? 0 : ".5em",
              }}
            >
              Du analyserer en egen variant.
            </Alert>
          )}

          <GameView
            fen={currentFen}
            whitePlayerName={gameData.white_player_name}
            whitePlayerTime={gameData.white_time}
            whitePlayerId={gameData.white_player_id}
            blackPlayerName={gameData.black_player_name}
            blackPlayerTime={gameData.black_time}
            blackPlayerId={gameData.black_player_id}
            status={
              currentMoveIndex === -1
                ? "PENDING"
                : currentTurn === "w"
                  ? "WHITE_TO_MOVE"
                  : "BLACK_TO_MOVE"
            }
            stockfishData={stockfishData}
            onPieceDrop={handlePieceDrop}
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

          {/* FEN and PGN copy buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              order: "5",
            }}
          >
            <Button variant="contained" onClick={handleCopyFen}>
              Kopier FEN
            </Button>
            <Button variant="contained" onClick={handleCopyPgn}>
              Kopier PGN
            </Button>
          </div>

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
              history={activeHistory}
              currentMoveIndex={currentMoveIndex}
              onMoveClick={handleMoveClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
