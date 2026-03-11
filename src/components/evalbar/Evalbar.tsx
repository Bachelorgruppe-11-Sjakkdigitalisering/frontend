import { Slider, Typography, useTheme } from "@mui/material";

/**
 * Defines the properties for the {@link Evalbar} component.
 */
type EvalbarProps = {
  /**
   * The calculated win chances in the game:
   * - If game is at 50 win chance, the game is totally even and headed for a draw.
   * - If a game is at 0 win chance, the black player has mate on the board.
   * - If a game is at 100 win chance, the white player has mate on the board.
   */
  winChance: number;
  /** The eval label to display (e.g., "1.7", "-3.4") */
  evalLabel: number;
};

/**
 * A UI component that displays the evaluation of the current position on the chess board.
 * * It renders a slider that displays the position of the win chance and with the
 * label displayed at the top.
 *
 * @example
 * ```ts
 * <Evalbar
 *  winChance={54}
 *  evalLabel={0.6}
 * />
 * ```
 */
export default function Evalbar({ winChance, evalLabel }: EvalbarProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        height: "inherit",
        width: "2rem",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "2px",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          {evalLabel}
        </Typography>
      </div>
      <Slider
        orientation="vertical"
        value={winChance}
        min={0}
        max={100}
        disabled
        sx={{
          height: "100%",
          width: "100%",
          padding: 0,

          // the rail (top part of background, black's side)
          "& .MuiSlider-rail": {
            opacity: 1,
            backgroundColor: theme.palette.primary.dark,
          },

          // the track (bottom part, white's side)
          "& .MuiSlider-track": {
            opacity: 1,
            backgroundColor: theme.palette.primary.light,
            border: "none",
            borderRadius: "0 0 16px 16px",
          },

          // the thumb
          " & .MuiSlider-thumb": {
            display: "none",
          },
        }}
      />
    </div>
  );
}
