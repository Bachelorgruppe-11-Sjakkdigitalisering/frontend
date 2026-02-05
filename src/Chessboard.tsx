import { Chessboard } from "react-chessboard";

export default function ChessboardView() {
  const options = {
    // denne posisjonen er hentet fra et random parti jeg har spilt
    position: "rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14",
    // finnes utrolig mange "options" (sjekk docs for å se alle)
    // denne under tillater å tegne piler feks
    allowDrawingArrows: true,
  };

  return (
    <div>
      <h1>Eksempelposisjon fra et random parti jeg har spilt:</h1>
      <div
        className="wrapper"
        style={{
          width: 500,
        }}
      >
        <Chessboard options={options} />
      </div>
    </div>
  );
}
