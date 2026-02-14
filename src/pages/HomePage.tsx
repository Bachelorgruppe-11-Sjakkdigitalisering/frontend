import GamePreview from "../components/chessboards/GamePreview";

export default function HomePage() {
  return (
    <div>
      <h1>Her kommer hjemskjermen til å leve</h1>
      <GamePreview
        gameId="1"
        fen="rn3rk1/4Qpp1/p1p4p/2p1p3/2P3b1/3P1NP1/PP2PPBP/R4RK1 b - - 0 14"
        player1Name="Herman Lundby-Holen"
        player1Time="00:23"
        player2Name="Dennis Johansen"
        player2Time="00:14"
      />
    </div>
  );
}
