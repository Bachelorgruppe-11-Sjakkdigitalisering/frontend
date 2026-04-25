import { Avatar, Typography } from "@mui/material";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GameView.css";
import Evalbar from "../evalbar/Evalbar";
import { BLACK, Chess, WHITE } from "chess.js";
import { useNavigate } from "react-router";
import type { StockfishResponse } from "../../types";
import { useChessClock } from "../../hooks/chess-clock/useChessClock";
import { useChessStore } from "../../store/useChessStore";

const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

/**
 * Defines the properties for the {@link GameView} component.
 */
type GameViewProps = {
  /** The standard Forsynth-Edwards Notation string representing the current board state. */
  fen: string;
  /** The display name of the player with the white pieces. */
  whitePlayerName: string;
  /** The unformatted time for the player with the white pieces. */
  whitePlayerTime: number;
  /** The unique UUID of the player with the white pieces from the database. */
  whitePlayerId: number;
  /** The display name of the player with the black pieces. */
  blackPlayerName: string;
  /** The unformatted time for the player with the black pieces. */
  blackPlayerTime: number;
  /** The unique UUID of the player with the black pieces from the database. */
  blackPlayerId: number;
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
  /** Optional method to allow dragging and dropping pieces on the board. */
  onPieceDrop?: ChessboardOptions["onPieceDrop"];
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
  onPieceDrop,
}: GameViewProps) {
  const navigate = useNavigate();

  // Initialize clock hooks
  const whiteClock = useChessClock(whitePlayerTime, status === "WHITE_TO_MOVE");
  const blackClock = useChessClock(blackPlayerTime, status === "BLACK_TO_MOVE");

  // Global state for displaying stockfish or not
  const isStockfishEnabled = useChessStore((state) => state.isStockfishEnabled);

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
    showNotation: false,
    onPieceDrop: onPieceDrop,
  };

  return (
    <div className="game-view">
      {/* Black player info */}
      <div className="player-info">
        <div
          className="flex-row"
          onClick={() => navigate(`/player/${blackPlayerId}`)}
          style={{ cursor: "pointer" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem" }} />
          <Typography variant="subtitle2">{blackPlayerName}</Typography>
        </div>
        <Typography
          className={"time " + (status === "BLACK_TO_MOVE" ? "active" : "")}
        >
          {blackClock.fomattedTime}
        </Typography>
      </div>

      <div className="board-eval">
        {/* Eval bar */}
        {isStockfishEnabled && (
          <Evalbar
            winChance={evalbarProps.height}
            evalLabel={evalbarProps.label}
          />
        )}

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div style={{ display: "flex", flex: 1 }}>
            {/* Custom outside notation (Y-axis) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                paddingRight: ".5em",
              }}
            >
              {RANKS.map((rank) => (
                <div key={rank}>{rank}</div>
              ))}
            </div>

            {/* Chessboard */}
            <div style={{ flex: 1 }}>
              <Chessboard options={options} />
            </div>
          </div>

          {/* Custom outside notation (X-axis) */}
          <div
            style={{
              display: "flex",
              paddingLeft: "1em",
            }}
          >
            {FILES.map((file) => (
              <div
                key={file}
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* White player info */}
      <div className="player-info">
        <div
          className="flex-row"
          onClick={() => navigate(`/player/${whitePlayerId}`)}
          style={{ cursor: "pointer" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem" }} />
          <Typography variant="subtitle2">{whitePlayerName}</Typography>
        </div>
        <Typography
          className={"time " + (status === "WHITE_TO_MOVE" ? "active" : "")}
        >
          {whiteClock.fomattedTime}
        </Typography>
      </div>
    </div>
  );
}
