import { Avatar, Slider, Typography } from "@mui/material";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GameView.css";

/* TODO: man må kanskje hente avatar her hvis vi skal ha med det? */
type GameViewProps = {
  fen: string;
  whitePlayerName: string;
  whitePlayerTime: string;
  blackPlayerName: string;
  blackPlayerTime: string;
  status: "WHITE_TO_MOVE" | "BLACK_TO_MOVE" | "PENDING" | "FINISHED";
};

export default function GameView({
  fen,
  whitePlayerName,
  whitePlayerTime,
  blackPlayerName,
  blackPlayerTime,
  status,
}: GameViewProps) {
  const options: ChessboardOptions = {
    position: fen,
  };

  return (
    <div className="game-view">
      <div className="player-info">
        <div className="flex-row">
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
        <Slider /* TODO: lage gene eval bar komponent?? må hvertfall styles bedre */
          aria-label="Game Evaluation"
          orientation="vertical"
          sx={{ height: "inherit" }}
          value={50}
          max={100}
          disabled
        />
        <Chessboard options={options} />
      </div>

      <div className="player-info">
        <div className="flex-row">
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
