import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GamePreview.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";

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
  blackPlayerTime: string;
  /** The display name of the player with the white pieces. */
  whitePlayerName: string;
  /** The formatted time string (e.g., "10:00", "05:23") for the player with the white pieces. */
  whitePlayerTime: string;
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
  blackPlayerName: player1Name,
  blackPlayerTime: player1Time,
  whitePlayerName: player2Name,
  whitePlayerTime: player2Time,
}: GamePreviewType) {
  const navigate = useNavigate();

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
        <p className="no-padding-margin">{player1Name}</p>
        <p className="no-padding-margin">{player1Time}</p>
      </div>
      <Chessboard options={options} />
      <div className="player-wrapper">
        <p className="no-padding-margin">{player2Name}</p>
        <p className="no-padding-margin">{player2Time}</p>
      </div>
    </div>
  );
}
