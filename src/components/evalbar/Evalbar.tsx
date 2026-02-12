import { Slider, Typography, useTheme } from "@mui/material";

type EvalbarProps = {
  evalValue: number;
};

export default function Evalbar({ evalValue }: EvalbarProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        height: "inherit",
        width: "1.5rem",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
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
          backgroundColor: "transparent",
          textAlign: "center",
          paddingTop: "2px",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          {evalValue}
        </Typography>
      </div>
      <Slider
        orientation="vertical"
        value={evalValue}
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
