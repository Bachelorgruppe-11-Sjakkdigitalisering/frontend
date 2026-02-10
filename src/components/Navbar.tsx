import { HouseRounded, InboxRounded, Settings } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Hjem", icon: <HouseRounded /> },
  { label: "Database", icon: <InboxRounded /> },
  { label: "Innstillinger", icon: <Settings /> },
];

export default function Navbar() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  if (isDesktop) {
    return (
      <Drawer variant="permanent">
        <List>
          {NAV_ITEMS.map((item, index) => (
            <ListItem key={item.label}>
              <ListItemButton
                selected={value === index}
                onClick={() => setValue(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }

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
