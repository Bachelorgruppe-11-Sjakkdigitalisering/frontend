import { Box, Button, Typography, useTheme } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";

/**
 * Represents a single executed chess move.
 */
export type Move = {
  /** Standard Algebraic Notation (e.g., "Nf3", "e4", "O-O") */
  san: string;
  /** Forsynth-Edwards Notation string representing the board state after this move. */
  fen: string;
  /**
   * The color of the piece that made the move:
   * - "w" for white
   * - "b" for black
   */
  color: "w" | "b";
};

/**
 * Properties for the {@link MoveList} component.
 */
type MoveListProps = {
  /** An array of all moves made in the game so far. */
  history: Move[];
  /**
   * The index of the currently viewed move in the history array.
   * A value of `-1` indicates the starting position (no moves played or viewed).
   */
  currentMoveIndex: number;
  /** Callback fired when a user clicks a specific move to review that board state. */
  onMoveClick: (index: number) => void;
};

type MoveButtonProps = {
  move: Move;
  isActive: boolean;
  onClick: () => void;
};

/**
 * A scrollable list displaying the history of chess moves in standard paired notation.
 * * Automatically groups a `history` array into White/Black turn pairs.
 * * Automatically scrolls the active move into view when `currentMoveIndex` changes.
 */
export default function MoveList({
  history,
  currentMoveIndex,
  onMoveClick,
}: MoveListProps) {
  const theme = useTheme();
  const activeRef = useRef<HTMLButtonElement>(null);

  // Make sure the currently active move is always visible in the scrllable area
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentMoveIndex]);

  // Transform the history array into turn pairs (e.g., [1. e4 e5], [2. Nf3 Nc6])
  const movePairs = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1] || null, // Handle incomplete turns (White moved, Black hasn't)
      whiteIndex: i,
      blackIndex: i + 1,
    });
  }

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "16px",
        padding: { xs: "0.5em 1em", md: "1em" },
        display: "grid",
        gridTemplateColumns: "30px 1fr 1fr",
        alignContent: "start",
        gap: { xs: "0", md: ".5rem" },
      }}
    >
      {movePairs.map((pair) => (
        <div key={pair.moveNumber} style={{ display: "contents" }}>
          {/* move number */}
          <Typography
            variant="body2"
            sx={{ alignContent: "center", color: theme.palette.text.secondary }}
          >
            {pair.moveNumber}.
          </Typography>
          {/* white move */}
          <MoveButton
            move={pair.white}
            isActive={currentMoveIndex === pair.whiteIndex}
            onClick={() => onMoveClick(pair.whiteIndex)}
            ref={currentMoveIndex === pair.whiteIndex ? activeRef : null}
          />
          {/* black move */}
          {pair.black ? (
            <MoveButton
              move={pair.black}
              isActive={currentMoveIndex === pair.blackIndex}
              onClick={() => onMoveClick(pair.blackIndex)}
              ref={currentMoveIndex === pair.blackIndex ? activeRef : null}
            />
          ) : (
            <div />
          )}
        </div>
      ))}
    </Box>
  );
}

/**
 * Internal helper component representing a single clickable move.
 * Uses `forwardRef` to allow the parent `MoveList` to manage scroll position.
 */
const MoveButton = forwardRef<HTMLButtonElement, MoveButtonProps>(
  ({ move, isActive, onClick }, ref) => {
    const theme = useTheme();

    return (
      <Button
        ref={ref}
        onClick={onClick}
        sx={{
          backgroundColor: isActive
            ? theme.palette.primary.main
            : "transparent",
          color: theme.palette.text.secondary,
          border: "none",
          cursor: "pointer",
          padding: { xs: "0.2em 1em", md: ".5em 1em" },
          borderRadius: "16px",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: "0.9rem",
          textTransform: "none",
        }}
      >
        {move.san}
      </Button>
    );
  },
);
