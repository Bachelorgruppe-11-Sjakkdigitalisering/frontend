import { Box, Stack, Typography } from "@mui/material";

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

      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        {/* wins */}
        <Typography variant="body2" color="success.main" fontWeight="bold">
          {wins} Vunnet
        </Typography>
        {/* draws */}
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          {draws} Remis
        </Typography>
        {/* losses */}
        <Typography variant="body2" color="error.main" fontWeight="bold">
          {losses} Tapt
        </Typography>
      </Stack>

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
            width: `${(wins / totalGames) * 100 || 0}%`,
            bgcolor: "success.main",
          }}
        />
        {/* draws */}
        <Box
          sx={{
            width: `${(draws / totalGames) * 100 || 0}%`,
            bgcolor: "text.secondary",
          }}
        />
        {/* losses */}
        <Box
          sx={{
            width: `${(losses / totalGames) * 100 || 0}%`,
            bgcolor: "error.main",
          }}
        />
      </Box>
    </Box>
  );
}
