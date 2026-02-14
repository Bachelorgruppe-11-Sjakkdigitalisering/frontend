import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GamePreview.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";

type GamePreviewType = {
  gameId: string;
  loading?: boolean;
  width?: number;
  fen: string;
  player1Name: string;
  player1Time: string;
  player2Name: string;
  player2Time: string;
};

export default function GamePreview({
  gameId,
  loading = false,
  width = 180,
  fen,
  player1Name,
  player1Time,
  player2Name,
  player2Time,
}: GamePreviewType) {
  const navigate = useNavigate();

  const options: ChessboardOptions = {
    position: fen,
    boardStyle: { borderRadius: 8, width: width, pointerEvents: "none" },
    allowDragging: false,
    allowDrawingArrows: false,
  };

  const handleClick = () => {
    navigate(`/game/${gameId}`);
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
    <div
      onClick={handleClick}
      style={{
        width: width,
        cursor: "pointer",
        transition: "transform 0.1s ease-in-out",
      }}
    >
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
