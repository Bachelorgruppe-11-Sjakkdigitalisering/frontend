import { EmojiEvents } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import "./GameCard.css";

type GameCardProps = {
  whiteName: string;
  blackName: string;
  whiteWin: boolean;
};

export default function GameCard({
  whiteName,
  blackName,
  whiteWin,
}: GameCardProps) {
  const theme = useTheme();

  return (
    <div
      className="game-card"
      style={{
        backgroundColor: theme.palette.background.nav,
        color: theme.palette.text.secondary,
      }}
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
