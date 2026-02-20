import { Avatar, Typography, useTheme } from "@mui/material";
import "./PlayerCard.css";
import { useNavigate } from "react-router";

type PlayerCardProps = {
  // TODO: legge til avatar her hvis vi skal beholde det
  name: string;
  playerId: string;
};

export default function PlayerCard({ name, playerId }: PlayerCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player/${playerId}`);
  };

  return (
    <div
      className="player-card"
      style={{
        backgroundColor: theme.palette.background.nav,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Avatar />
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {name}
      </Typography>
    </div>
  );
}
