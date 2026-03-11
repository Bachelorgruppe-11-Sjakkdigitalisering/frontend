import { EmojiEvents, StarHalf } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import "./GameCard.css";
import { useNavigate } from "react-router";

/**
 * Defines the properties for the {@link GameCard} component.
 */
type GameCardProps = {
  /** The display name of the player with the white pieces */
  whiteName: string;
  /** The display name of the player with the black pieces. */
  blackName: string;
  /**
   * The final outcome of the chess game in standard notation:
   * - "1-0" (White wins)
   * - "0-1" (Black wins)
   * - "1/2-1/2" (Draw)
   */
  result: "1-0" | "1/2-1/2" | "0-1";
  /** The unique UUID or string identifier for the game database record. */
  gameId: string;
};

/**
 * A UI card component that displays a summary of a completed chess game.
 * * It renders player names alongside conditional visual indicators (trophies or stars)
 * based on the games's result. It is fully interactive and will navigate the user
 * to the detailed archive view of the game upon clicking.
 *
 * @example Usage of component:
 * ```ts
 * <GameCard
 *  whiteName="Magnus Carlsen"
 *  blackName="Hikaru Nakamura"
 *  result="1/2-1/2"
 *  gameId="12345"
 * />
 * ```
 */
export default function GameCard({
  whiteName,
  blackName,
  result,
  gameId,
}: GameCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Triggers navigation to the game's specific archive page.
   */
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
