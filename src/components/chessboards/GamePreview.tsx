import { Chessboard, type ChessboardOptions } from "react-chessboard";
import "./GamePreview.css";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";

type GamePreviewType = {
  gameId: string;
  loading?: boolean;
  width?: number;
  fen: string;
  blackPlayerName: string;
  blackPlayerTime: string;
  whitePlayerName: string;
  whitePlayerTime: string;
};

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
