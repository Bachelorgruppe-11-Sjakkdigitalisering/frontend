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
import { Link, useLocation, useNavigate } from "react-router";

const NAV_ITEMS = [
  { label: "Hjem", icon: <HouseRounded />, path: "/" },
  { label: "Database", icon: <InboxRounded />, path: "/database" },
  { label: "Innstillinger", icon: <Settings />, path: "/settings" },
];

export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const navigate = useNavigate();

  // determine the active state
  const currentPath = location.pathname;

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: theme.palette.background.nav,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton
                LinkComponent={Link}
                selected={currentPath === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  color: theme.palette.text.nav,
                  borderRadius: 100,
                  "&:hover": {
                    backgroundColor: "#485464",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#3B4857",
                    "&:hover": {
                      backgroundColor: "#485464",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.nav,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
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
        zIndex: 100,
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={currentPath}
        onChange={(_event, newValue) => {
          navigate(newValue);
        }}
        sx={{
          minHeight: 64,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
