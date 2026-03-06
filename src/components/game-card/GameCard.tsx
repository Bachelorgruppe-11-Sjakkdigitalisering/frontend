import { EmojiEvents, StarHalf } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import "./GameCard.css";
import { useNavigate } from "react-router";

type GameCardProps = {
  whiteName: string;
  blackName: string;
  result: "1-0" | "1/2-1/2" | "0-1";
  gameId: string;
};

export default function GameCard({
  whiteName,
  blackName,
  result,
  gameId,
}: GameCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/archive/${gameId}`);
  };

  const whiteWon = result === "1-0";
  const blackWon = result === "0-1";
  const isDraw = result === "1/2-1/2";

  return (
    <div
      className="game-card"
      style={{
        backgroundColor: theme.palette.background.nav,
        color: theme.palette.text.secondary,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div className="player-trophy-wrapper">
        {whiteWon ? <EmojiEvents sx={{ fontSize: 40 }} /> : null}
        {isDraw ? <StarHalf sx={{ fontSize: 40 }} /> : null}
        <Typography variant="body1">{whiteName}</Typography>
      </div>

      <Typography variant="body1"> vs </Typography>

      <div className="player-trophy-wrapper">
        <Typography variant="body1">{blackName}</Typography>
        {blackWon ? <EmojiEvents sx={{ fontSize: 40 }} /> : null}
        {isDraw ? <StarHalf sx={{ fontSize: 40 }} /> : null}
      </div>
    </div>
  );
}
