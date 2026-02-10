import { HouseRounded, InboxRounded, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";

export default function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Hjem" icon={<HouseRounded />} />
        <BottomNavigationAction label="Database" icon={<InboxRounded />} />
        <BottomNavigationAction label="Innstillinger" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}
