import { Avatar, Typography, useTheme } from "@mui/material";
import "./PlayerCard.css";
import { useNavigate } from "react-router";

/**
 * Defines the properties for the {@link PlayerCard} component.
 */
type PlayerCardProps = {
  /** The display name of the player. */
  name: string;
  /** The unique UUID or string identifier for the player in the database. */
  playerId: string;
};

/**
 * A UI card component that displays the player name and avatar.
 * * It renders the player name together with an avatar of the player if provided in the database.
 * If clicked on, it navigates to the full player profile page.
 *
 * @example Usage of component:
 * ```ts
 * <PlayerCard
 *  name="Magnus Carlsen"
 *  playerId="12345"
 * />
 * ```
 */
export default function PlayerCard({ name, playerId }: PlayerCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Triggers the navigation to the player's specific page.
   */
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
