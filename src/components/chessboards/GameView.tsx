import { Avatar, Typography } from "@mui/material";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GameView.css";
import Evalbar from "../evalbar/Evalbar";
import { useStockfish } from "../../hooks/useStockfish";

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
  const { data, isLoading, error } = useStockfish(fen);
  console.log(data);

  // default state for eval bar if loading or error
  let evalbarProps = { height: 50, label: 0.0 };

  if (data) {
    evalbarProps = { height: data.winChance, label: data.eval };
  }

  const options: ChessboardOptions = {
    position: fen,
    boardStyle: { borderRadius: "16px" },
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
        <Evalbar
          winChance={evalbarProps.height}
          evalLabel={evalbarProps.label}
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
