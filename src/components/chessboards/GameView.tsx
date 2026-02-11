import { Avatar, Slider, Typography } from "@mui/material";
import { Chessboard, type ChessboardOptions } from "react-chessboard";

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
    <div>
      <div>
        <div>
          <div>
            <Avatar />
            <Typography>{blackPlayerName}</Typography>
          </div>
          <Typography>{blackPlayerTime}</Typography>
        </div>

        <div>
          <Slider
            aria-label="Game Evaluation"
            defaultValue={0}
            min={-100}
            max={100}
            valueLabelDisplay="on"
          />
          <Chessboard options={options} />
        </div>

        <div>
          <div>
            <Avatar />
            <Typography>{whitePlayerName}</Typography>
          </div>
          <Typography>{whitePlayerTime}</Typography>
        </div>
      </div>
    </div>
  );
}
