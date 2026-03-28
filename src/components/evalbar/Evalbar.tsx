import { Box, Typography } from "@mui/material";

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
  return (
    <Box
      sx={{
        height: "inherit",
        width: { xs: "1.5em", md: "2em" },
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        bgcolor: "primary.dark",
      }}
    >
      {/* White's side (bottom fill) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${winChance}%`,
          bgcolor: "primary.light",
          transition: "height 0.3s ease-in-out",
        }}
      />

      {/* Evaluation Label */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "4px",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: { xs: "0.5rem", md: "0.7rem" },
            fontWeight: "bold",
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          {evalLabel}
        </Typography>
      </Box>
    </Box>
  );
}
