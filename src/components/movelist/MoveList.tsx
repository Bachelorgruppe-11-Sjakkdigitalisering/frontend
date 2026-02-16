import { Box, Typography, useTheme } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";

type Move = {
  san: string;
  fen: string;
  color: "w" | "b";
};

type MoveListProps = {
  history: Move[];
  currentMoveIndex: number; // -1 means start of game
  onMoveClick: (index: number) => void;
};

type MoveButtonProps = {
  move: Move;
  isActive: boolean;
  onClick: () => void;
};

export default function MoveList({
  history,
  currentMoveIndex,
  onMoveClick,
}: MoveListProps) {
  const theme = useTheme();
  const activeRef = useRef<HTMLButtonElement>(null);

  // auto-scroll to the active move
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentMoveIndex]);

  // group moves into pairs
  const movePairs = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1] || null, // black might not have moved yet
      whiteIndex: i,
      blackIndex: i + 1,
    });
  }

  return (
    <Box>
      {movePairs.map((pair) => (
        <div key={pair.moveNumber} style={{ display: "contents" }}>
          {/* move number */}
          <Typography>{pair.moveNumber}</Typography>
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

const MoveButton = forwardRef<HTMLButtonElement, MoveButtonProps>(
  ({ move, isActive, onClick }, ref) => {
    const theme = useTheme();

    return (
      <button ref={ref} onClick={onClick} style={{}}>
        {move.san}
      </button>
    );
  },
);
