import { Avatar, Typography } from "@mui/material";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GameView.css";
import Evalbar from "../evalbar/Evalbar";
import { type StockfishResponse } from "../../hooks/useStockfish";
import { BLACK, Chess, WHITE } from "chess.js";
import { useNavigate } from "react-router";

/**
 * Defines the properties for the {@link GameView} component.
 */
type GameViewProps = {
  /** The standard Forsynth-Edwards Notation string representing the current board state. */
  fen: string;
  /** The display name of the player with the white pieces. */
  whitePlayerName: string;
  /** The formatted time string (e.g., "10:00", "05:23") for the player with the white pieces. */
  whitePlayerTime: string;
  /** The unique UUID of the player with the white pieces from the database. */
  whitePlayerId: string;
  /** The display name of the player with the black pieces. */
  blackPlayerName: string;
  /** The formatted time string (e.g., "10:00", "05:23") for the player with the black pieces. */
  blackPlayerTime: string;
  /** The unique UUID of the player with the black pieces from the database. */
  blackPlayerId: string;
  /**
   * The current phase or turn state of the game. Used to highlight active timers.
   * Must be one of the following:
   * - "WHITE_TO_MOVE"
   * - "BLACK_TO_MOVE"
   * - "PENDING"
   * - "FINISHED"
   */
  status: "WHITE_TO_MOVE" | "BLACK_TO_MOVE" | "PENDING" | "FINISHED";
  /** Optional evaluation from the Stockfish engine. */
  stockfishData?: StockfishResponse | null;
};

/**
 * A component that renders the main chess viewing area, including the board,
 * player profiles, timers, and an engine evaluation bar.
 *
 * **Logic:**
 * This component parses the `fen` locally using `chess.js` to immediately detect terminal
 * states (checkmate, stalemate). This prevents the UI from waiting on asynchrounous data
 * to render game-over evaluations.
 */
export default function GameView({
  fen,
  whitePlayerName,
  whitePlayerTime,
  whitePlayerId,
  blackPlayerName,
  blackPlayerTime,
  blackPlayerId,
  status,
  stockfishData,
}: GameViewProps) {
  const navigate = useNavigate();

  // analyze position locally to check if game is over (checkmate or stalemate)
  const game = new Chess(fen);
  // default state for eval bar if loading
  let evalbarProps = { height: 50, label: 0.0 };
  // determine what to show on the bar
  if (game.isCheckmate()) {
    // if it is checkmate, check whos turn it is to determine who lost
    if (game.turn() === WHITE) {
      // if white's turn, they lost, black won
      evalbarProps = { height: 0, label: -100 };
    } else if (game.turn() === BLACK) {
      // white won
      evalbarProps = { height: 100, label: 100 };
    }
  } else if (
    game.isDraw() ||
    game.isStalemate() ||
    game.isThreefoldRepetition()
  ) {
    // draw
    evalbarProps = { height: 50, label: 0 };
  }

  if (stockfishData && !stockfishData.error) {
    // game is ongoing with no error
    evalbarProps = {
      height: stockfishData.winChance,
      label: stockfishData.eval,
    };
  }

  const options: ChessboardOptions = {
    position: fen,
    boardStyle: { borderRadius: "16px" },
  };

  return (
    <div className="game-view">
      <div className="player-info">
        <div
          className="flex-row"
          onClick={() => navigate(`/player/${blackPlayerId}`)}
          style={{ cursor: "pointer" }}
        >
          <Avatar />
          <Typography variant="subtitle2">{blackPlayerName}</Typography>
        </div>
        <Typography
          className={"time " + (status === "BLACK_TO_MOVE" ? "active" : "")}
        >
          {blackPlayerTime}
        </Typography>
      </div>

      <div className="board-eval">
        <Evalbar
          winChance={evalbarProps.height}
          evalLabel={evalbarProps.label}
        />
        <Chessboard options={options} />
      </div>

      <div className="player-info">
        <div
          className="flex-row"
          onClick={() => navigate(`/player/${whitePlayerId}`)}
          style={{ cursor: "pointer" }}
        >
          <Avatar />
          <Typography variant="subtitle2">{whitePlayerName}</Typography>
        </div>
        <Typography
          className={"time " + (status === "WHITE_TO_MOVE" ? "active" : "")}
        >
          {whitePlayerTime}
        </Typography>
      </div>
    </div>
  );
}
