import { Box, Typography } from "@mui/material";

type PlayerStatsProps = {
  wins: number;
  draws: number;
  losses: number;
  totalGames: number;
};

export default function PlayerStats({
  wins,
  draws,
  losses,
  totalGames,
}: PlayerStatsProps) {
  const total = totalGames || 1; // prevents dividing by 0 if there are no games
  const winPct = (wins / total) * 100;
  const drawPct = (draws / total) * 100;
  const lossPct = (losses / total) * 100;

  // calculate where each segment begins
  const winStart = 0;
  const drawStart = winPct;
  const lossStart = winPct + drawPct;

  return (
    <Box
      sx={{
        width: "100%",
        mt: 1,
        p: 5,
        bgcolor: "background.nav",
        borderRadius: 16,
      }}
    >
      <Typography variant="h4" sx={{ mb: 1 }} color="text.secondary">
        {totalGames} partier spilt
      </Typography>

      <Box sx={{ position: "relative", width: "100%", height: 24, mb: 0.5 }}>
        {wins > 0 && (
          <Typography
            variant="body2"
            color="success.main"
            fontWeight="bold"
            sx={{
              position: "absolute",
              left: `${winStart}%`,
              whiteSpace: "nowrap",
            }}
          >
            {wins} Vunnet
          </Typography>
        )}

        {draws > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
            sx={{
              position: "absolute",
              left: `${drawStart}%`,
              whiteSpace: "nowrap",
            }}
          >
            {drawPct < 5 ? `${draws}R` : `${draws} Remis`}
          </Typography>
        )}

        {losses > 0 && (
          <Typography
            variant="body2"
            color="error.main"
            fontWeight="bold"
            sx={{
              position: "absolute",
              left: `${lossStart}%`,
              whiteSpace: "nowrap",
            }}
          >
            {losses} Tapt
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          height: 15,
          borderRadius: 5,
          overflow: "hidden",
          bgcolor: "text.main",
        }}
      >
        {/* wins */}
        <Box
          sx={{
            width: `${winPct}%`,
            bgcolor: "success.main",
          }}
        />
        {/* draws */}
        <Box
          sx={{
            width: `${drawPct}%`,
            bgcolor: "text.secondary",
          }}
        />
        {/* losses */}
        <Box
          sx={{
            width: `${lossPct}%`,
            bgcolor: "error.main",
          }}
        />
      </Box>
    </Box>
  );
}
