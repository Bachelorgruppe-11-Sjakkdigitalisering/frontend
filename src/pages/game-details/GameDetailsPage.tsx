import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import GameView from "../../components/chessboards/GameView";
import {
  FastForward,
  FastRewind,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import MoveList from "../../components/movelist/MoveList";
import { useStockfish } from "../../hooks/useStockfish";
import { useParams } from "react-router";
import useGame from "../../hooks/useGame";
import useLiveGame from "../../hooks/useLiveGame";
import type { PieceDropHandlerArgs } from "react-chessboard";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const pageLayoutStyles = {
  ml: { xs: 0, lg: "13rem" },
  mb: { xs: "64px", lg: 0 },
  p: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  height: { xs: "auto", md: "90dvh", lg: "100dvh" },
  boxSizing: "border-box",
};

export default function GameDetailsPage({
  isLive = false,
}: {
  isLive?: boolean;
}) {
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
  const [copyFenSuccess, setCopyFenSuccess] = useState(false);
  const [copyPgnSuccess, setCopyPgnSuccess] = useState(false);

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
    setCopyFenSuccess(true);
    setTimeout(() => {
      setCopyFenSuccess(false);
    }, 5000);
  };

  /**
   * Copies the PGN of the game to the user's clipboard.
   */
  const handleCopyPgn = () => {
    navigator.clipboard.writeText(gameData.pgn);
    setCopyPgnSuccess(true);
    setTimeout(() => {
      setCopyPgnSuccess(false);
    }, 5000);
  };

  // fetch stockfish data
  const { data: stockfishData, isLoading } = useStockfish(currentFen);

  return (
    <Box sx={pageLayoutStyles}>
      {/* Loading state */}
      {isGameLoading && (
        <>
          <Topbar title="..." route="/" />
          <CircularProgress />
        </>
      )}

      {/* Error states */}
      {!isGameLoading && (isGameError || !gameData) && (
        <>
          <Topbar title="..." route="/" />
          <Alert severity="error">Kunne ikke laste partiet.</Alert>
        </>
      )}

      {/* Success state */}
      {!isGameLoading && !isGameError && gameData && (
        <>
          <Topbar
            title={`${gameData.white_player_name} vs ${gameData.black_player_name}`}
            route="/database"
          />

          {/* PGN error state */}
          {hasPgnError && (
            <Alert severity="warning">
              Vi oppdaget et ulovlig trekk eller en feil i PGN-filen for dette
              partiet. <br />
              Partiet kan ikke spilles av.
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "0.5rem",
              margin: { xs: "0 auto", md: "0" },
              height: { xs: "auto", md: "100%" },
              width: "100%",
              overflow: "hidden",
            }}
          >
            {/* left column */}
            <Box
              sx={{
                flex: { xs: "none", md: "2" },
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
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ p: "0.5em", textWrap: "nowrap" }}
                      onClick={handleReturnToGame}
                    >
                      Tilbake til partiet
                    </Button>
                  }
                  sx={{
                    py: "0.5em",
                    alignItems: "center",
                    mb: "0.5em",
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
            </Box>

            {/* Right column */}
            <Box
              sx={{
                flex: { xs: 0, md: "1" },
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                height: "100%",
                minWidth: 0,
                width: "100%",
              }}
            >
              <ButtonGroup
                variant="contained"
                disableElevation
                aria-label="Buttons for going backwards and forwards in the game"
                fullWidth
                sx={{
                  order: { xs: "0", md: "3" },
                  flexShrink: 0,
                }}
              >
                <Button onClick={handleStart} sx={{ bgcolor: "primary.dark" }}>
                  <FastRewind fontSize="small" />
                </Button>

                <Button onClick={handlePrev} sx={{ bgcolor: "primary.dark" }}>
                  <SkipPrevious fontSize="small" />
                </Button>

                <Button onClick={handleNext} sx={{ bgcolor: "primary.dark" }}>
                  <SkipNext fontSize="small" />
                </Button>

                <Button onClick={handleEnd} sx={{ bgcolor: "primary.dark" }}>
                  <FastForward fontSize="small" />
                </Button>
              </ButtonGroup>

              {/* FEN and PGN copy buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                  order: "5",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
              >
                {copyPgnSuccess && (
                  <Alert
                    severity="success"
                    sx={{
                      width: "100%",
                      boxSizing: "border-box",
                      "& .MuiAlert-message": {
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                  >
                    Kopierte PGN: {gameData.pgn}
                  </Alert>
                )}
                {copyFenSuccess && (
                  <Alert
                    severity="success"
                    sx={{
                      width: "100%",
                      boxSizing: "border-box",
                      "& .MuiAlert-message": {
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}
                  >
                    Kopierte FEN: {currentFen}
                  </Alert>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button variant="contained" onClick={handleCopyFen}>
                    Kopier FEN
                  </Button>
                  <Button variant="contained" onClick={handleCopyPgn}>
                    Kopier PGN
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  padding: "0.5rem 1rem",
                  bgcolor: "primary.dark",
                  borderRadius: "16px",
                  color: "text.secondary",
                  order: { xs: "2", md: "1" },
                  flexShrink: 0,
                }}
              >
                <h3 style={{ margin: 0 }}>Stockfish anbefaler:</h3>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* Move and Evaluation */}
                    <span>{stockfishData.san}</span>
                    <span>
                      {stockfishData.eval > 0 ? "+" : ""}
                      {stockfishData.eval}
                    </span>
                  </div>
                )}
              </Box>

              <Box
                sx={{
                  order: { xs: "1", md: "2" },
                  flex: 1,
                  minHeight: 0,
                  maxHeight: { xs: "100px", md: "100%" },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MoveList
                  history={activeHistory}
                  currentMoveIndex={currentMoveIndex}
                  onMoveClick={handleMoveClick}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
