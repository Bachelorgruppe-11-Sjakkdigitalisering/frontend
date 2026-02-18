import { Avatar, Typography, useTheme } from "@mui/material";
import "./PlayerCard.css";

type PlayerCardProps = {
  // TODO: legge til avatar her hvis vi skal beholde det
  name: string;
};

export default function PlayerCard({ name }: PlayerCardProps) {
  const theme = useTheme();

  return (
    <div
      className="player-card"
      style={{ backgroundColor: theme.palette.background.nav }}
    >
      <Avatar />
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {name}
      </Typography>
    </div>
  );
}
