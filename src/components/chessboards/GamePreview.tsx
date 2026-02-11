import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GamePreview.css";
import { Skeleton } from "@mui/material";

type GamePreviewType = {
  loading?: boolean;
  width?: number;
  fen: string;
  player1Name: string;
  player1Time: string;
  player2Name: string;
  player2Time: string;
};

export default function GamePreview({
  loading = false,
  width = 180,
  fen,
  player1Name,
  player1Time,
  player2Name,
  player2Time,
}: GamePreviewType) {
  const options: ChessboardOptions = {
    position: fen,
    boardStyle: { borderRadius: 8, width: width },
    allowDragging: false,
    allowDrawingArrows: false,
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
    <div style={{ width: width, cursor: "pointer" }}>
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
