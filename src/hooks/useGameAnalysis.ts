import { Chess } from "chess.js";
import { useEffect, useMemo, useState } from "react";
import type { PieceDropHandlerArgs } from "react-chessboard";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/**
 * Manages the chess board state, including official history and custom variant exploration.
 * @param pgn The official Portable Game Notation string of the game.
 * @param isLive Whether the game is currently being played live.
 */
export function useGameAnalysis(pgn?: string, isLive?: boolean) {
  const [isExploring, setIsExploring] = useState(false);
  const [customHistory, setCustomHistory] = useState<Move[]>([]);
  const [manualMoveIndex, setManualMoveIndex] = useState<number | null>(
    isLive ? null : 0,
  );

  // Parse official game history
  const { officialHistory, hasPgnError } = useMemo(() => {
    if (!pgn)
      return {
        officialHistory: [],
        hasPgnError: false,
      };

    try {
      const game = new Chess();
      game.loadPgn(pgn);
      const historyWithFens: Move[] = [];
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
  }, [pgn]);

  const activeHistory = isExploring ? customHistory : officialHistory;

  const currentMoveIndex = useMemo(() => {
    if (isExploring) {
      return manualMoveIndex ?? customHistory.length - 1;
    }
    if (manualMoveIndex !== null) {
      return manualMoveIndex;
    }
    return officialHistory.length > 0 ? officialHistory.length - 1 : -1;
  }, [
    isExploring,
    manualMoveIndex,
    customHistory.length,
    officialHistory.length,
  ]);

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
    } catch {
      return false;
    }
    return false;
  };

  const handleReturnToGame = () => {
    setIsExploring(false);
    setManualMoveIndex(isLive ? null : officialHistory.length - 1);
  };

  const navigateMoves = {
    start: () => setManualMoveIndex(-1),
    prev: () => setManualMoveIndex(Math.max(currentMoveIndex - 1, -1)),
    next: () =>
      setManualMoveIndex(
        Math.min(currentMoveIndex + 1, activeHistory.length - 1),
      ),
    end: () => setManualMoveIndex(activeHistory.length - 1),
    goTo: (index: number) => {
      if (isLive && !isExploring && index === officialHistory.length - 1) {
        setManualMoveIndex(null);
      } else {
        setManualMoveIndex(index);
      }
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          navigateMoves.prev();
          break;
        case "ArrowRight":
          navigateMoves.next();
          break;
        case "ArrowUp":
          event.preventDefault();
          navigateMoves.start();
          break;
        case "ArrowDown":
          event.preventDefault();
          navigateMoves.end();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return {
    isExploring,
    hasPgnError,
    activeHistory,
    currentMoveIndex,
    currentFen,
    currentTurn,
    handlePieceDrop,
    handleReturnToGame,
    navigateMoves,
  };
}
