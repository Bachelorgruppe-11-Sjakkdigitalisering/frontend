import { createTheme } from "@mui/material/styles";

// extends the mui 'TypeBackground' to include custom 'nav' element
declare module "@mui/material/styles" {
  interface TypeBackground {
    nav: string;
  }
  interface TypeText {
    nav: string;
  }
}

export const appTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FF",
      nav: "#1D2024",
    },
    text: {
      primary: "#1D1B20",
      secondary: "#F8F9FF",
      nav: "#C2C7CF",
    },
    primary: {
      main: "#32618D",
      light: "#9DCAFC",
      dark: "#3B4857",
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.nav,
        }),
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.nav,
          "&.Mui-selected": {
            color: theme.palette.text.nav,
          },
          "&.Mui-selected .MuiSvgIcon-root": {
            // The background color when active
            backgroundColor: "#3B4857",
            borderRadius: 16,
            width: "3rem",
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: "100px",
          padding: "10px 16px",
          boxShadow: "none",
        }),
      },
    },
  },
});
