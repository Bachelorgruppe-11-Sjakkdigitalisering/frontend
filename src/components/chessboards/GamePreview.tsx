import { Chessboard, type ChessboardOptions } from "react-chessboard";

type GamePreviewType = {
  fen: string;
  player1Name: string;
  player1Time: string;
  player2Name: string;
  player2Time: string;
};

export default function GamePreview({
  fen,
  player1Name,
  player1Time,
  player2Name,
  player2Time,
}: GamePreviewType) {
  const options: ChessboardOptions = {
    position: fen,
    boardStyle: { borderRadius: 16 },
  };

  return (
    <div
      style={{
        width: 180,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p style={{ padding: 0, margin: 0 }}>{player1Name}</p>
        <p style={{ padding: 0, margin: 0 }}>{player1Time}</p>
      </div>
      <Chessboard options={options} />
      <div>
        <p>{player2Name}</p>
        <p>{player2Time}</p>
      </div>
    </div>
  );
}
