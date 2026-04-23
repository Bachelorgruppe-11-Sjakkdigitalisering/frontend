import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GamePreview.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import { useChessClock } from "../../hooks/chess-clock/useChessClock";

/**
 * Defines the properties for the {@link GamePreview} component.
 */
type GamePreviewType = {
  /** The unique UUID of the game in the database. */
  gameId: string;
  /** Optional loading boolean to tell the component if we are loading or not. */
  loading?: boolean;
  /** Optional width number to tell the component how wide it should be */
  width?: number;
  /** The standard Forsynth-Edwards Notation string representing the current board state. */
  fen: string;
  /** The display name of the player with the black pieces. */
  blackPlayerName: string;
  /** The formatted time string (e.g., "10:00", "05:23") for the player with the black pieces. */
  blackPlayerTime: number;
  /** The display name of the player with the white pieces. */
  whitePlayerName: string;
  /** The formatted time string (e.g., "10:00", "05:23") for the player with the white pieces. */
  whitePlayerTime: number;
  /**
   * The current phase or turn state of the game.
   * Must be one of the following:
   * - "WHITE_TO_MOVE"
   * - "BLACK_TO_MOVE"
   * - "PENDING"
   * - "FINISHED"
   */
  status: "WHITE_TO_MOVE" | "BLACK_TO_MOVE" | "PENDING" | "FINISHED";
};

/**
 * A UI component that displays a preview of a live chess game.
 * It displays the names of the two players along with their time left, and the current board state.
 */
export default function GamePreview({
  gameId,
  loading = false,
  width = 180,
  fen,
  blackPlayerName,
  blackPlayerTime,
  whitePlayerName,
  whitePlayerTime,
  status,
}: GamePreviewType) {
  const navigate = useNavigate();

  const whiteClock = useChessClock(whitePlayerTime, status === "WHITE_TO_MOVE");
  const blackClock = useChessClock(blackPlayerTime, status === "BLACK_TO_MOVE");

  const options: ChessboardOptions = {
    position: fen,
    boardStyle: {
      borderRadius: 8,
      width: width,
      height: width,
      pointerEvents: "none",
    },
    allowDragging: false,
    allowDrawingArrows: false,
    showNotation: false,
  };

  const handleClick = () => {
    navigate(`/live/${gameId}`);
  };

  if (loading) {
    return (
      <div>
        <Skeleton variant="text" width={width} />
        <Skeleton variant="rounded">
          <Chessboard options={options} />
        </Skeleton>
        <Skeleton variant="text" width={width} />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="game-preview">
      <div className="player-wrapper">
        <p className="no-padding-margin">{blackPlayerName}</p>
        <p className="no-padding-margin">{blackClock.fomattedTime}</p>
      </div>
      <Chessboard options={options} />
      <div className="player-wrapper">
        <p className="no-padding-margin">{whitePlayerName}</p>
        <p className="no-padding-margin">{whiteClock.fomattedTime}</p>
      </div>
    </div>
  );
}
