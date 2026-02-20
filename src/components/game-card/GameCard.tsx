import { EmojiEvents } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import "./GameCard.css";
import { useNavigate } from "react-router";

type GameCardProps = {
  whiteName: string;
  blackName: string;
  whiteWin: boolean;
  gameId: string;
};

export default function GameCard({
  whiteName,
  blackName,
  whiteWin,
  gameId,
}: GameCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${gameId}`);
  };

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
        {whiteWin ? <EmojiEvents sx={{ fontSize: 40 }} /> : null}
        <Typography variant="body1">{whiteName}</Typography>
      </div>
      <Typography variant="body1"> vs </Typography>
      <div className="player-trophy-wrapper">
        <Typography variant="body1">{blackName}</Typography>
        {!whiteWin ? <EmojiEvents sx={{ fontSize: 40 }} /> : null}
      </div>
    </div>
  );
}
